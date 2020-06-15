import React from 'react';
import { render } from '@testing-library/react';
import { PaymentIcon } from 'components';

describe('Intial', () => {
  it('It renders visa', () => {
    const { queryByTestId } = render(<PaymentIcon type="visa" />);

    expect(queryByTestId('payment-icon')).toBeTruthy();
  });

  it('It renders masterCard', () => {
    const { queryByTestId } = render(<PaymentIcon type="masterCard" />);

    expect(queryByTestId('payment-icon')).toBeTruthy();
  });

  it('It renders americanExpress', () => {
    const { queryByTestId } = render(<PaymentIcon type="americanExpress" />);

    expect(queryByTestId('payment-icon')).toBeTruthy();
  });

  it('It does not render unkown type', () => {
    const { queryByTestId } = render(<PaymentIcon type="i-do-not-exist" />);

    expect(queryByTestId('payment-icon')).toBeFalsy();
  });
});
