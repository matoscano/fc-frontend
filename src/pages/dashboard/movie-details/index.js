import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { withRouter } from "react-router-dom";
import Button from "../../../components/ui/button";
import Rectangle from "../../../components/ui/rectangle";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_TRANSFER_BY_MOVIE,
  GET_ALL_SHAREHOLDERS_BY_MOVIE,
} from "../../../api/queries";
import Loading from "../../../components/ui/loading";

const Container = styled.section`
  position: relative;
`;

const Title = styled.h1`
  font-size: var(--text-xxxl);
  text-align: center;
  padding: 1rem;
  margin: 2rem auto;
`;

const additionalStyle = css`
  max-width: 40rem;
  margin: 1.5rem auto;
  display: flex;
  flex-direction: column;
`;

const RectangleTitle = styled.h2`
  font-size: var(--text-xxl);
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
`;

const TotalAmount = styled.div`
  font-size: var(--text-xxl);
  text-align: center;
  margin-bottom: 1rem;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const NewButton = styled(Button)`
  align-self: center;
  margin: 1.5rem auto;
`;

const DetailsList = styled.ul`
  height: 100%;
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
      <Title>{location.state.movie.title}</Title>
      <DetailsContainer>
        <Rectangle additionalStyle={additionalStyle}>
          <RectangleTitle>
            Transfers{" "}
            <span role="img" aria-label="movie">
              &#128184;
            </span>
          </RectangleTitle>
          {transfers && transfers.length > 0 ? (
            <>
              <TotalAmount>Transfer amount total: {totalAmount}€</TotalAmount>
              <DetailsList>
                {transfers.map((transfer) => {
                  return (
                    <li key={transfer.id}>
                      {transfer.amount}€ {transfer.description}
                    </li>
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
        <Rectangle additionalStyle={additionalStyle}>
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
                    <li key={shareholder.id}>
                      {shareholder.firstName} {shareholder.lastName}
                    </li>
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
