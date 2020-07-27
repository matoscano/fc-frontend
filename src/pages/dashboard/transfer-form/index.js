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

const FieldContainer = styled.div`
  margin: 1.5rem auto;
  label {
    display: block;
  }

  input,
  textarea {
    display: block;
    width: 100%;
    border: none;
    background-color: rgba(var(--color-gray-6-rgba), 0.4);
    border-radius: 0.188rem;
    min-height: 3rem;
    padding: 0.5rem;
  }

  textarea {
    min-height: 6rem;
  }
`;

const Label = styled.label`
  margin-bottom: 0.25rem;
  color: var(--color-gray-2);
`;

const Error = styled.div`
  color: var(--color-support-error);
  margin-top: 0.5rem;
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
    history.goBack();
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
      <Title>New movie</Title>
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
