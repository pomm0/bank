import React from 'react';
import { Intro, DynamicCard, TransactionHistoryItem } from 'components';
import styled from 'styled-components';
import { formatCurrency } from 'utils/intl';

const GridLayout = styled.div`
  display: grid;
  grid-column: 1;
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
`;

const HistoryCard = styled.div`
  max-height: 240px;
`;

export const Dashboard = () => {
  return (
    <>
      <Intro
        title="Übersicht"
        description="Hier erhalten Sie eine Übersicht über Ihr Konto"
        className="mb-2 mt-4"
      />

      <GridLayout className="mt-4">
        <DynamicCard urlPath="/account" title="Kontoinformationen" payloadRootKey="account">
          {(account) => (
            <>
              <div className="bold">Kontonummer:</div>
              <div>{account.id}</div>
              <div className="bold mt-2">BC-Nummer:</div>
              <div>{account.bc}</div>
              <div className="bold mt-2">IBAN:</div>
              <div>{account.iban}</div>
              <div className="bold mt-2">BIC-Code</div>
              <div>{account.bic}</div>
            </>
          )}
        </DynamicCard>

        <DynamicCard urlPath="/balance" title="Guthaben" payloadRootKey="balance">
          {(balance) => <>{formatCurrency(balance.amount)}</>}
        </DynamicCard>

        <DynamicCard
          urlPath="/last-transactions"
          title="Letzte Bewegungen"
          payloadRootKey="transactions"
        >
          {(transactions) => (
            <HistoryCard className="o-auto pr-1">
              {(Array.isArray(transactions) ? transactions : []).map((transaction) => (
                <TransactionHistoryItem key={transaction.id} transaction={transaction} />
              ))}
            </HistoryCard>
          )}
        </DynamicCard>
      </GridLayout>
    </>
  );
};
