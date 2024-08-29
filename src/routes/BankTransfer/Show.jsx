import React from 'react';
import { Intro, DynamicCard, Card, TransactionAmount } from 'components';
import { formatDate } from 'utils/intl';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';

const TransactionAccountDetails = ({ model, ...attributes }) => {
  if (Object.keys(model).length === 0) {
    return <></>;
  }

  return (
    <div {...attributes}>
      <div>
        <div className="bold">Name:</div>
        {model.name}
      </div>
      <div>
        <div className="bold">Iban:</div>
        {model.iban}
      </div>
      <div>
        <div className="bold">Bic:</div>
        {model.bic}
      </div>
    </div>
  );
};

export const Show = () => {
  const navigate = useNavigate();
  const [urlSearchParams] = useSearchParams();
  const { id } = useParams();

  return (
    <>
      <Intro title="Überweisungsdetails" className="mb-2 mt-4" />

      {urlSearchParams.get('state') === 'newSuccess' && (
        <Card className="bg-green white mb-3">Überweisung erfolgreich erstellt!</Card>
      )}

      <DynamicCard urlPath={`/transactions/${id}`} payloadRootKey="transaction">
        {(transaction) => (
          <>
            {transaction.isReceiving ? (
              <>
                <div className="bold">Begünstigter:</div>
                <>Sie</>

                <div className="bold mt-2">Sender:</div>
                <TransactionAccountDetails model={transaction.sender} />
              </>
            ) : (
              <>
                <div className="bold">Begünstigter:</div>
                <TransactionAccountDetails model={transaction.receiver} />

                <div className="bold mt-2">Sender:</div>
                <>Sie</>
              </>
            )}

            <div className="bold mt-2">Betrag:</div>
            <TransactionAmount isReceiving={transaction.isReceiving} amount={transaction.amount} />

            <div className="bold mt-2">Grund:</div>
            {transaction.reason ? (
              transaction.reason
            ) : (
              <span className="dark-grey">Kein Grund angegeben</span>
            )}

            <div className="bold mt-2">Eingegangen am:</div>
            {formatDate(new Date(transaction.createdAt))}
          </>
        )}
      </DynamicCard>

      <button type="button" className="mt-4" onClick={() => navigate('/bank-transfer')}>
        Zur Überweisungsliste
      </button>
    </>
  );
};
