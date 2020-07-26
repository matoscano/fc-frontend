import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { withRouter } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../../../components/ui/button";
import Rectangle from "../../../components/ui/rectangle";
import { useQuery } from "@apollo/client";
import { GET_ALL_TRANSFER_BY_MOVIE } from "../../../api/queries";

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
  max-width: 60rem;
  margin: 0 auto;
`;

const TotalAmount = styled.div`
  font-size: var(--text-xxl);
  text-align: center;
`;

const MovieDetails = ({ history, match, location }) => {
  const { loading, error, data } = useQuery(GET_ALL_TRANSFER_BY_MOVIE, {
    fetchPolicy: "network-only",
    variables: { movieId: match.params.movieId },
  });

  console.log("match", match);
  console.log("location", location);

  const { transfers, totalAmount } = useMemo(() => {
    if (data) {
      const { getAllTransferByMovie } = data;
      let totalAmount = 0.0;

      getAllTransferByMovie.map((transfer) => {
        totalAmount = totalAmount + transfer.amount;
      });
      totalAmount = parseFloat(totalAmount).toFixed(2);

      console.log("getAllTransferByMovie", getAllTransferByMovie);

      return {
        transfers: getAllTransferByMovie,
        totalAmount,
      };
    }
    return { transfers: null, totalAmount: null };
  }, [data]);

  return (
    <Container>
      <Title>{location.state.movie.title}</Title>
      <Rectangle additionalStyle={additionalStyle}>
        <TotalAmount>Transfer amount total: {totalAmount}</TotalAmount>
        {transfers ? (
          <ul>
            {transfers.map((transfer) => {
              return (
                <li key={transfer.id}>
                  {transfer.amount} - {transfer.description}
                </li>
              );
            })}
          </ul>
        ) : null}
      </Rectangle>
    </Container>
  );
};

export default withRouter(MovieDetails);
