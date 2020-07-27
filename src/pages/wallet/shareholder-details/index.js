import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { withRouter } from "react-router-dom";
import Rectangle from "../../../components/ui/rectangle";
import Loading from "../../../components/ui/loading";
import { useQuery } from "@apollo/client";
import { GET_SHAREHOLDER_BY_ID } from "../../../api/queries";

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

const DetailsList = styled.ul`
  height: 100%;
`;

const ShareholderDetails = ({ history, match }) => {
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

  return (
    <Container>
      <Title>
        {shareholder.firstName} {shareholder.lastName}
      </Title>
      <DetailsContainer>
        <Rectangle additionalStyle={additionalStyle}>
          <RectangleTitle>
            Balance{" "}
            <span role="img" aria-label="movie">
              &#128184;
            </span>
          </RectangleTitle>
          {balance && balance.length > 0 ? (
            <>
              <TotalAmount>Balance amount total: {totalBalance}</TotalAmount>
              <DetailsList>
                {balance.map((balanceTransaction) => {
                  return (
                    <li key={balanceTransaction.id}>
                      {balanceTransaction.amount}
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
        </Rectangle>
        <Rectangle additionalStyle={additionalStyle}>
          <RectangleTitle>
            Shareholder info{" "}
            <span role="img" aria-label="movie">
              &#128176;
            </span>
          </RectangleTitle>
          {shareholder ? (
            <>
              <DetailsList>
                <li>
                  {shareholder.firstName} {shareholder.lastName}
                </li>
                <li>{shareholder.address}</li>
                <li>{shareholder.iban}</li>
                <li>{shareholder.Movie.title}</li>
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
        </Rectangle>
      </DetailsContainer>
    </Container>
  );
};

export default withRouter(ShareholderDetails);
