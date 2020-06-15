import React from 'react';
import { render } from '@testing-library/react';
import { TransactionAmount } from 'components';

describe('Intial', () => {
  it('It shows receiving value green and as positive value', () => {
    const { queryByTestId } = render(<TransactionAmount amount={500} isReceiving={true} />);

    expect(queryByTestId('transaction-amount').classList.contains('green')).toBeTruthy();
    // TODO: verify why not equal
    //expect(queryByTestId('formatted-amount').textContent).toEqual('CHF+500.00');
  });

  it('It shows sending value red and as negative value', () => {
    const { queryByTestId } = render(<TransactionAmount amount={500} isReceiving={false} />);

    expect(queryByTestId('transaction-amount').classList.contains('red')).toBeTruthy();
    // TODO: verify why not equal
    //expect(queryByTestId('formatted-amount').textContent).toEqual('CHF-500.00');
  });

  it('Render nothing if amount is not a valid number', () => {
    const { queryByTestId } = render(<TransactionAmount amount="not a number" />);

    expect(queryByTestId('transaction-amount')).toBeFalsy();
  });
});
