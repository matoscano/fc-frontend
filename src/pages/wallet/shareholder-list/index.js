import React from "react";
import styled, { css } from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_ALL_SHAREHOLDERS } from "../../../api/queries";
import Rectangle from "../../../components/ui/rectangle";
import Card from "../../../components/ui/card";
import Loading from "../../../components/ui/loading";
import { Link as routerLink } from "react-router-dom";
import {
  PageTitle,
  CardContentTitle,
  CardContentLink,
  GridContainer,
} from "../../../styled-components";

const Container = styled.section`
  position: relative;
`;

const additionalStyle = css`
  max-width: 60rem;
  margin: 0 auto;
`;

const ShareholderList = ({ match }) => {
  const { loading, error, data } = useQuery(GET_ALL_SHAREHOLDERS, {
    fetchPolicy: "network-only",
  });

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  return (
    <Container>
      <PageTitle>
        Shareholders{" "}
        <span role="img" aria-label="movie">
          &#128176;
        </span>
      </PageTitle>
      <Rectangle additionalStyle={additionalStyle}>
        <GridContainer>
          {data.getAllShareholders.map((shareholder) => (
            <Card key={shareholder.id}>
              <>
                <CardContentTitle>
                  {shareholder.firstName} {shareholder.lastName}
                </CardContentTitle>
                <CardContentLink
                  as={routerLink}
                  to={{
                    pathname: `${match.url}/${shareholder.id}`,
                  }}
                >
                  View details
                </CardContentLink>
              </>
            </Card>
          ))}
        </GridContainer>
      </Rectangle>
    </Container>
  );
};

export default ShareholderList;
