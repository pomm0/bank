import React from 'react';
import { formatCurrency } from 'utils/intl';

/**
 * Component which formats given amount as "transaction amount".
 * Which means it will be shown green + positive if is receiving
 * and red + negative if is sending.
 *
 * @param {Number} props.amount The amount
 * @param {Boolean} props.isReceiving Whether it is receiving or sending
 */
export const TransactionAmount = ({ amount, isReceiving }) => {
  if (typeof amount !== 'number') {
    return <></>;
  }

  return (
    <div className={isReceiving ? 'green' : 'red'} data-testid="transaction-amount">
      {formatCurrency(isReceiving ? amount : amount * -1, {
        signDisplay: 'exceptZero'
      })}
    </div>
  );
};
