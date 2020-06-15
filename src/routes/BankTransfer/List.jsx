import React from 'react';
import { Intro, StatefulFetchHoc, Card, TransactionAmount, FabButton } from 'components';
import { formatDate } from 'utils/intl';
import { ReactComponent as AddSvg } from 'assets/add.svg';

const ListElement = ({ transaction, onClick }) => {
  const accountDetails = transaction.isReceiving ? transaction.sender : transaction.receiver;

  return (
    <Card className="mb-3 c-pointer" title={accountDetails.name} onClick={onClick}>
      <div className="df flex-row justify-between">
        <div>{formatDate(new Date(transaction.createdAt))}</div>
        <TransactionAmount isReceiving={transaction.isReceiving} amount={transaction.amount} />
      </div>
    </Card>
  );
};

export const List = ({ history }) => {
  return (
    <div className="pr-2">
      <Intro title="Überweisungen" className="mb-2 mt-4" />

      <StatefulFetchHoc urlPath={'/transactions'} initialFetch={true}>
        {({ state, response }) => (
          <>
            {state.isLoading && <Card>Lädt... Bitte warten!</Card>}
            {state.isError && (
              <Card>
                Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es etwas später
                erneut!
              </Card>
            )}
            {state.isResolved &&
              response.transactions.map((transaction) => (
                <ListElement
                  key={transaction.id}
                  transaction={transaction}
                  onClick={() => {
                    history.push(`/bank-transfer/${transaction.id}`);
                  }}
                ></ListElement>
              ))}
          </>
        )}
      </StatefulFetchHoc>

      <FabButton onClick={() => history.push('/bank-transfer/new')}>
        <AddSvg fill="#fff" />
      </FabButton>
    </div>
  );
};
