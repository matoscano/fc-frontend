import React from "react";
import styled, { css } from "styled-components";
import { withRouter } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../../../components/ui/button";
import Rectangle from "../../../components/ui/rectangle";
import { useMutation } from "@apollo/client";
import { CREATE_MOVIE } from "../../../api/mutations";
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
      <PageTitle>New movie</PageTitle>
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
