import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { withRouter } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../../../components/ui/button";
import Rectangle from "../../../components/ui/rectangle";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_MOVIES } from "../../../api/queries";
import { CREATE_SHAREHOLDER } from "../../../api/mutations";
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

const ShareholderForm = ({ history }) => {
  const { data: movieData } = useQuery(GET_ALL_MOVIES, {
    fetchPolicy: "network-only",
  });
  const [createShareholder] = useMutation(CREATE_SHAREHOLDER);
  const { addToast } = useToasts();

  const handleCreateShareholder = async (values) => {
    createShareholder({
      variables: {
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        iban: values.iban,
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
            firstName: "",
            lastName: "",
            address: "",
            iban: "",
            movieId: "",
          }}
          onSubmit={(values, actions) => {
            handleCreateShareholder(values);
            actions.setSubmitting(false);
          }}
          validate={(values) => {
            const IBANRegex = /^(?:(?:IT|SM)\d{2}[A-Z]\d{22}|CY\d{2}[A-Z]\d{23}|NL\d{2}[A-Z]{4}\d{10}|LV\d{2}[A-Z]{4}\d{13}|(?:BG|BH|GB|IE)\d{2}[A-Z]{4}\d{14}|GI\d{2}[A-Z]{4}\d{15}|RO\d{2}[A-Z]{4}\d{16}|KW\d{2}[A-Z]{4}\d{22}|MT\d{2}[A-Z]{4}\d{23}|NO\d{13}|(?:DK|FI|GL|FO)\d{16}|MK\d{17}|(?:AT|EE|KZ|LU|XK)\d{18}|(?:BA|HR|LI|CH|CR)\d{19}|(?:GE|DE|LT|ME|RS)\d{20}|IL\d{21}|(?:AD|CZ|ES|MD|SA)\d{22}|PT\d{23}|(?:BE|IS)\d{24}|(?:FR|MR|MC)\d{25}|(?:AL|DO|LB|PL)\d{26}|(?:AZ|HU)\d{27}|(?:GR|MU)\d{28})$/i;
            const requiredMsg = "This field is required";
            const errors = {};
            if (!values.firstName) {
              errors.firstName = requiredMsg;
            }

            if (!IBANRegex.test(values.iban)) {
              errors.iban = "Invalid iban";
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
                <Label as="label" htmlFor="firstName">
                  First name
                </Label>
                <Field name="firstName" />
                <ErrorMessage name="firstName">
                  {(msg) => <Error>{msg}</Error>}
                </ErrorMessage>
              </FieldContainer>

              <FieldContainer>
                <Label as="label" htmlFor="lastName">
                  Last name
                </Label>
                <Field name="lastName" />
                <ErrorMessage name="lastName">
                  {(msg) => <Error>{msg}</Error>}
                </ErrorMessage>
              </FieldContainer>

              <FieldContainer>
                <Label as="label" htmlFor="address">
                  Address
                </Label>
                <Field name="address" />
                <ErrorMessage name="address">
                  {(msg) => <Error>{msg}</Error>}
                </ErrorMessage>
              </FieldContainer>

              <FieldContainer>
                <Label as="label" htmlFor="iban">
                  IBAN
                </Label>
                <Field name="iban" />
                <ErrorMessage name="iban">
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

export default withRouter(ShareholderForm);
