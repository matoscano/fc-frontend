import React from "react";
import styled, { css } from "styled-components";
import { withRouter } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../../../components/ui/button";
import Rectangle from "../../../components/ui/rectangle";
import { useMutation } from "@apollo/client";
import { CREATE_MOVIE } from "../../../api/mutations";

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

const MovieForm = ({ history }) => {
  const [createMovie] = useMutation(CREATE_MOVIE);
  const { addToast } = useToasts();

  const handleCreateMovie = async (values) => {
    createMovie({ variables: { title: values.title } });
    addToast("Saved Successfully", { appearance: "success" });
    history.push("/dashboard");
  };

  return (
    <Container>
      {" "}
      <Title>New movie</Title>
      <Rectangle additionalStyle={additionalStyle}>
        {" "}
        <Formik
          initialValues={{
            title: "",
          }}
          onSubmit={(values, actions) => {
            handleCreateMovie(values);
            actions.setSubmitting(false);
          }}
          validate={(values) => {
            const requiredMsg = "This field is required";
            const errors = {};
            if (!values.title) {
              errors.title = requiredMsg;
            }
            return errors;
          }}
        >
          {() => (
            <Form>
              <FieldContainer>
                <Label as="label" htmlFor="title">
                  Title
                </Label>
                <Field name="title" />
                <ErrorMessage name="title">
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

export default withRouter(MovieForm);
