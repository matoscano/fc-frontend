import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { withRouter } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../../../components/ui/button";
import Rectangle from "../../../components/ui/rectangle";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_MOVIES } from "../../../api/queries";
import { CREATE_TRANSFER } from "../../../api/mutations";
import SelectField from "../../../components/ui/select";
import {
  PageTitle,
  FieldContainer,
  Label,
  Error,
} from "../../../styled-components";

const Container = styled.section`
  position: relative;
`;

const additionalStyle = css`
  max-width: 60rem;
  margin: 0 auto;
`;

const SendButton = styled(Button)`
  margin: 1rem auto;
`;

const TransferForm = ({ history }) => {
  const { data: movieData } = useQuery(GET_ALL_MOVIES, {
    fetchPolicy: "network-only",
  });
  const [createTransfer] = useMutation(CREATE_TRANSFER);
  const { addToast } = useToasts();

  const handleCreateTransfer = async (values) => {
    createTransfer({
      variables: {
        amount: values.amount,
        description: values.description,
        movieId: values.movieId,
      },
    });
    addToast("Saved Successfully", { appearance: "success" });
    setTimeout(() => history.goBack(), 1000);
  };

  const { moviesOptions } = useMemo(() => {
    if (movieData) {
      const { getAllMovies } = movieData;
      let options = [];
      if (getAllMovies && getAllMovies.length > 0) {
        options = getAllMovies.map((movie) => {
          const label = `${movie.title}`;
          return {
            label,
            value: `${movie.id}`,
          };
        });
      }

      return {
        moviesOptions: options,
      };
    }
    return { moviesOptions: [] };
  }, [movieData]);

  return (
    <Container>
      <PageTitle>New transfer</PageTitle>
      <Rectangle additionalStyle={additionalStyle}>
        <Formik
          initialValues={{
            amount: 0,
            description: "",
            movieId: "",
          }}
          onSubmit={(values, actions) => {
            handleCreateTransfer(values);
            actions.setSubmitting(false);
          }}
          validate={(values) => {
            const requiredMsg = "This field is required";
            const graterThanZero = "The amount should be greater than 0";
            const shouldBeANumber = "The amount should be a number";
            const errors = {};
            if (!values.amount) {
              errors.amount = requiredMsg;
            }

            if (typeof values.amount !== "number") {
              errors.amount = shouldBeANumber;
            }

            if (values.amount < 1) {
              errors.amount = graterThanZero;
            }

            if (!values.movieId) {
              errors.movieId = requiredMsg;
            }

            return errors;
          }}
        >
          {() => (
            <Form>
              <FieldContainer>
                <Label as="label" htmlFor="amount">
                  Amount
                </Label>
                <Field name="amount" type="number" />
                <ErrorMessage name="amount">
                  {(msg) => <Error>{msg}</Error>}
                </ErrorMessage>
              </FieldContainer>

              <FieldContainer>
                <Label as="label" htmlFor="description">
                  Description
                </Label>
                <Field name="description" component="textarea" rows="3" />
                <ErrorMessage name="description">
                  {(msg) => <Error>{msg}</Error>}
                </ErrorMessage>
              </FieldContainer>

              <FieldContainer>
                <Label as="label" htmlFor="movieId">
                  Movie
                </Label>
                <Field
                  component={SelectField}
                  name="movieId"
                  options={moviesOptions}
                />
                <ErrorMessage name="movieId">
                  {(msg) => <Error>{msg}</Error>}
                </ErrorMessage>
              </FieldContainer>

              <SendButton type="submit">Create</SendButton>
            </Form>
          )}
        </Formik>
      </Rectangle>
    </Container>
  );
};

export default withRouter(TransferForm);
