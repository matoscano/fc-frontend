import React, { useMemo } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Button from "../../../components/ui/button";
import Rectangle from "../../../components/ui/rectangle";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_TRANSFER_BY_MOVIE,
  GET_ALL_SHAREHOLDERS_BY_MOVIE,
} from "../../../api/queries";
import Loading from "../../../components/ui/loading";
import {
  PageTitle,
  rectangleAdditionalStyle,
  RectangleTitle,
  TotalAmount,
  DetailsContainer,
  DetailsList,
  ListItemMain,
} from "../../../styled-components";

const Container = styled.section`
  position: relative;
`;

const NewButton = styled(Button)`
  align-self: center;
  margin: 1.5rem auto;
`;

const MovieDetails = ({ history, match, location }) => {
  const {
    loading: transferLoading,
    error: transferError,
    data: transferData,
  } = useQuery(GET_ALL_TRANSFER_BY_MOVIE, {
    fetchPolicy: "network-only",
    variables: { movieId: match.params.movieId },
  });

  const {
    loading: shareholderLoading,
    error: shareholderError,
    data: shareholderData,
  } = useQuery(GET_ALL_SHAREHOLDERS_BY_MOVIE, {
    fetchPolicy: "network-only",
    variables: { movieId: match.params.movieId },
  });

  const { transfers, totalAmount, shareholders } = useMemo(() => {
    if (transferData && shareholderData) {
      const { getAllTransferByMovie } = transferData;
      const { getAllShareholdersByMovie } = shareholderData;
      let totalAmount = 0.0;

      getAllTransferByMovie.map((transfer) => {
        totalAmount = totalAmount + transfer.amount;
        return null;
      });
      totalAmount = parseFloat(totalAmount).toFixed(2);

      return {
        transfers: getAllTransferByMovie,
        totalAmount,
        shareholders: getAllShareholdersByMovie,
      };
    }
    return { transfers: null, totalAmount: null, shareholders: null };
  }, [transferData, shareholderData]);

  if (transferLoading || shareholderLoading) return <Loading />;

  return (
    <Container>
      <PageTitle>{location.state.movie.title}</PageTitle>
      <DetailsContainer>
        <Rectangle additionalStyle={rectangleAdditionalStyle}>
          <RectangleTitle>
            Transfers{" "}
            <span role="img" aria-label="movie">
              &#128184;
            </span>
          </RectangleTitle>
          {transfers && transfers.length > 0 ? (
            <>
              <TotalAmount>
                Transfer amount total: <strong>{totalAmount}€</strong>
              </TotalAmount>
              <DetailsList>
                {transfers.map((transfer) => {
                  return (
                    <ListItemMain key={transfer.id}>
                      {transfer.amount}€ {transfer.description}
                    </ListItemMain>
                  );
                })}
              </DetailsList>
            </>
          ) : (
            <div>
              There are no transfers.{" "}
              <span role="img" aria-label="movie">
                &#129335;
              </span>
            </div>
          )}
          <NewButton onClick={() => history.push("/dashboard/create-transfer")}>
            Create Transfer
          </NewButton>
        </Rectangle>
        <Rectangle additionalStyle={rectangleAdditionalStyle}>
          <RectangleTitle>
            Shareholders{" "}
            <span role="img" aria-label="movie">
              &#128176;
            </span>
          </RectangleTitle>
          {shareholders && shareholders.length > 0 ? (
            <>
              <DetailsList>
                {shareholders.map((shareholder) => {
                  return (
                    <ListItemMain key={shareholder.id}>
                      {shareholder.firstName} {shareholder.lastName}
                    </ListItemMain>
                  );
                })}
              </DetailsList>
            </>
          ) : (
            <div>
              There are no shareholders.{" "}
              <span role="img" aria-label="movie">
                &#129300;
              </span>
            </div>
          )}
          <NewButton
            onClick={() => history.push("/dashboard/create-shareholder")}
          >
            Create Shareholder
          </NewButton>
        </Rectangle>
      </DetailsContainer>
    </Container>
  );
};

export default withRouter(MovieDetails);
