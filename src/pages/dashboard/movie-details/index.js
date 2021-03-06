import React, { useMemo } from "react";
import styled from "styled-components";
import moment from "moment";
import { withRouter, Link } from "react-router-dom";
import Button from "../../../components/ui/button";
import Rectangle from "../../../components/ui/rectangle";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_TRANSFER_BY_MOVIE,
  GET_ALL_SHAREHOLDERS_BY_MOVIE,
} from "../../../api/queries";
import Loading from "../../../components/ui/loading";
import Error from "../../../components/ui/error";
import {
  PageTitle,
  rectangleAdditionalStyle,
  RectangleTitle,
  TotalAmount,
  DetailsContainer,
  DetailsList,
  ListItemMain,
  ListItemSecondary,
} from "../../../styled-components";

const Container = styled.section`
  position: relative;
`;

const DetailsListWithLessMargin = styled(DetailsList)`
  margin-left: 1rem;
`;

const ViewDetailsLink = styled.a`
  text-decoration: none;
`;

const EmptyListWrapper = styled.div`
  height: 100%;
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
  if (transferError || shareholderError) return <Error />;

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
                Total transfer: <strong>{totalAmount}€</strong>
              </TotalAmount>
              <DetailsList>
                {transfers.map((transfer) => {
                  return (
                    <ListItemMain key={transfer.id}>
                      Income: {transfer.amount}€
                      <DetailsListWithLessMargin>
                        <ListItemSecondary>
                          {transfer.description} ({" "}
                          {moment(transfer.createAt).format("MMM Do YY")})
                        </ListItemSecondary>
                      </DetailsListWithLessMargin>
                    </ListItemMain>
                  );
                })}
              </DetailsList>
            </>
          ) : (
            <EmptyListWrapper>
              There are no transfers.{" "}
              <span role="img" aria-label="movie">
                &#129335;
              </span>
            </EmptyListWrapper>
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
                      <ViewDetailsLink
                        to={{
                          pathname: `/wallet/${shareholder.id}`,
                        }}
                        as={Link}
                        alt="View details"
                        title="View details"
                      >
                        {shareholder.firstName} {shareholder.lastName}
                      </ViewDetailsLink>
                    </ListItemMain>
                  );
                })}
              </DetailsList>
            </>
          ) : (
            <EmptyListWrapper>
              There are no shareholders.{" "}
              <span role="img" aria-label="movie">
                &#129300;
              </span>
            </EmptyListWrapper>
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
