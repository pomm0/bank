import React from 'react';
import { render } from '@testing-library/react';
import { TransactionHistoryItem } from 'components';
import { transaction as TransactionFactory } from 'mirage/factories';

describe('Intial', () => {
  it('It does not render anything if empty transaction is provided', () => {
    const transaction = {};
    const { queryByTestId } = render(<TransactionHistoryItem transaction={transaction} />);

    expect(queryByTestId('transaction-history-item')).toBeFalsy();
  });

  it('It does not render anything if no transaction provided', () => {
    const transaction = null;
    const { queryByTestId } = render(<TransactionHistoryItem transaction={transaction} />);

    expect(queryByTestId('transaction-history-item')).toBeFalsy();
  });

  it('It does render properly', () => {
    // Create a transaction element using mirage factory (as it would been send by api)
    const transaction = new TransactionFactory().build();

    const { queryByTestId } = render(<TransactionHistoryItem transaction={transaction} />);

    expect(queryByTestId('transaction-history-item')).toBeTruthy();
    expect(queryByTestId('transaction-history-item-name')).toBeTruthy();
    expect(queryByTestId('transaction-history-item-created-at')).toBeTruthy();
    // Will be renderd by TransactionAmount component
    expect(queryByTestId('transaction-amount')).toBeTruthy();
  });

  it('It does render "isReceiving: true" transaction properly', () => {
    // Create a transaction element using mirage factory (as it would been send by api)
    const transaction = new TransactionFactory().build();
    transaction.isReceiving = true;

    const { queryByTestId } = render(<TransactionHistoryItem transaction={transaction} />);

    // If transaction is a receiving transaction, it should output senders name
    expect(queryByTestId('transaction-history-item-name').textContent).toEqual(
      transaction.sender.name
    );
  });

  it('It does render "isReceiving: false" transaction properly', () => {
    // Create a transaction element using mirage factory (as it would been send by api)
    const transaction = new TransactionFactory().build();
    transaction.isReceiving = false;

    const { queryByTestId } = render(<TransactionHistoryItem transaction={transaction} />);

    // If transaction is a sending transaction, it should output receivers name
    expect(queryByTestId('transaction-history-item-name').textContent).toEqual(
      transaction.receiver.name
    );
  });
});
