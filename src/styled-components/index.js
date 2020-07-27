import styled, { css } from "styled-components";

const PageTitle = styled.h1`
  font-size: var(--text-xxxl);
  text-align: center;
  padding: 1rem;
  margin: 2rem auto;
`;

const rectangleAdditionalStyle = css`
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

const DetailsList = styled.ul`
  height: 100%;
  margin-left: 4rem;
`;

const DetailsListWithoutDecoration = styled.ul`
  list-style: none;
`;

const ListItemMain = styled.li`
  font-size: var(--text-xl);
  font-weight: var(--text-semibold);
  margin: 1.5rem auto;
`;

const ListItemSecondary = styled.li`
  font-size: var(--text-md);
  font-weight: var(--text-regular);
  opacity: 0.7;
`;

const ListItemWithIcon = styled.li`
  font-size: var(--text-xl);
  font-weight: var(--text-semibold);
  margin: 1.5rem auto;
`;

const CardContentTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const CardContentLink = styled.a`
  text-decoration: none;
  color: var(--color-brand-secondary);
  margin-top: 1rem;
  display: block;
  text-align: end;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 1rem;
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

export {
  PageTitle,
  rectangleAdditionalStyle,
  RectangleTitle,
  TotalAmount,
  DetailsContainer,
  DetailsList,
  DetailsListWithoutDecoration,
  ListItemMain,
  ListItemSecondary,
  ListItemWithIcon,
  CardContentTitle,
  CardContentLink,
  GridContainer,
  FieldContainer,
  Label,
  Error,
};
