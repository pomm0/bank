import React from 'react';
import { TransactionAmount } from 'components';
import { formatDate } from 'utils/intl';

/**
 * This component represents a single transaction history item.
 *
 * @param {Object} props.transaction The transaction model
 */
export const TransactionHistoryItem = ({ transaction }) => {
  if (!transaction || typeof transaction !== 'object' || Object.keys(transaction).length === 0) {
    return <></>;
  }

  return (
    <div
      className="df justify-between bb-1 bcolor-grey pb-1 mb-1"
      data-testid="transaction-history-item"
    >
      <div className="df flex-column">
        <div data-testid="transaction-history-item-name">
          {transaction[transaction.isReceiving ? 'sender' : 'receiver'].name}
        </div>
        <div data-testid="transaction-history-item-created-at">
          {formatDate(new Date(transaction.createdAt))}
        </div>
      </div>
      <TransactionAmount isReceiving={transaction.isReceiving} amount={transaction.amount} />
    </div>
  );
};
