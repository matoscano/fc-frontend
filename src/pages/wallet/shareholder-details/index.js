import React, { useMemo } from "react";
import styled from "styled-components";
import moment from "moment";
import { withRouter } from "react-router-dom";
import Rectangle from "../../../components/ui/rectangle";
import Loading from "../../../components/ui/loading";
import Card from "../../../components/ui/card";
import Error from "../../../components/ui/error";
import { useQuery } from "@apollo/client";
import { GET_SHAREHOLDER_BY_ID } from "../../../api/queries";
import {
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
} from "../../../styled-components";

const Container = styled.section`
  position: relative;
`;

const DetailsListWithLessMargin = styled(DetailsList)`
  margin-left: 1rem;
`;

const MovieCoverWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ShareholderDetails = ({ match }) => {
  const { loading, error, data } = useQuery(GET_SHAREHOLDER_BY_ID, {
    fetchPolicy: "network-only",
    variables: { shareholderId: match.params.shareholderId },
  });

  const { balance, totalBalance, shareholder } = useMemo(() => {
    if (data) {
      const { getShareholderById } = data;
      let totalBalance = 0.0;

      getShareholderById.BalanceTransaction.map((balanceTransaction) => {
        totalBalance = totalBalance + balanceTransaction.amount;
        return null;
      });
      totalBalance = parseFloat(totalBalance).toFixed(2);

      return {
        balance: getShareholderById.BalanceTransaction,
        totalBalance,
        shareholder: getShareholderById,
      };
    }

    const emptyShareholder = {
      id: "",
      firstName: "",
      lastName: "",
      address: "",
      iban: "",
      Movie: {
        id: "",
        title: "",
      },
    };

    return { balance: [], totalBalance: 0, shareholder: emptyShareholder };
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <Container>
      <PageTitle>
        {shareholder.firstName} {shareholder.lastName}
      </PageTitle>
      <DetailsContainer>
        <Rectangle additionalStyle={rectangleAdditionalStyle}>
          <RectangleTitle>
            Balance{" "}
            <span role="img" aria-label="movie">
              &#128184;
            </span>
          </RectangleTitle>
          {balance && balance.length > 0 ? (
            <>
              <TotalAmount>
                Balance amount total: <strong>{totalBalance}€</strong>
              </TotalAmount>
              <DetailsList>
                {balance.map((balanceTransaction) => {
                  return (
                    <ListItemMain key={balanceTransaction.id}>
                      Income: {balanceTransaction.amount}€
                      <DetailsListWithLessMargin>
                        <ListItemSecondary>
                          Transfer: {balanceTransaction.Transfer.id} -{" "}
                          {balanceTransaction.Transfer.amount}€ ({" "}
                          {moment(balanceTransaction.Transfer.createAt).format(
                            "MMM Do YY"
                          )}
                          )
                        </ListItemSecondary>
                      </DetailsListWithLessMargin>
                    </ListItemMain>
                  );
                })}
              </DetailsList>
            </>
          ) : (
            <div>
              There are no balance records.{" "}
              <span role="img" aria-label="movie">
                &#129335;
              </span>
            </div>
          )}
        </Rectangle>
        <Rectangle additionalStyle={rectangleAdditionalStyle}>
          <RectangleTitle>
            Shareholder{" "}
            <span role="img" aria-label="movie">
              &#128176;
            </span>
          </RectangleTitle>
          {shareholder ? (
            <>
              <DetailsListWithoutDecoration>
                <ListItemWithIcon>
                  <span role="img" aria-label="movie">
                    &#128100;
                  </span>{" "}
                  {shareholder.firstName} {shareholder.lastName}
                </ListItemWithIcon>
                <ListItemWithIcon>
                  <span role="img" aria-label="movie">
                    &#128205;
                  </span>{" "}
                  {shareholder.address}
                </ListItemWithIcon>
                <ListItemWithIcon>
                  {" "}
                  <span role="img" aria-label="movie">
                    &#127974;
                  </span>{" "}
                  {shareholder.iban}
                </ListItemWithIcon>
                <ListItemWithIcon>
                  <span role="img" aria-label="movie">
                    &#127902;
                  </span>{" "}
                  {shareholder.Movie.title}
                </ListItemWithIcon>
              </DetailsListWithoutDecoration>
              <MovieCoverWrapper>
                <Card key={shareholder.id} imgUrl={shareholder.Movie.cover}>
                  <>
                    <CardContentTitle>
                      {shareholder.Movie.title}
                    </CardContentTitle>
                  </>
                </Card>
              </MovieCoverWrapper>
            </>
          ) : (
            <div>
              There is no shareholder.{" "}
              <span role="img" aria-label="movie">
                &#129300;
              </span>
            </div>
          )}
        </Rectangle>
      </DetailsContainer>
    </Container>
  );
};

export default withRouter(ShareholderDetails);
