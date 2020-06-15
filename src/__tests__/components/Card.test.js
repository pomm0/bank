import React from 'react';
import { render } from '@testing-library/react';
import { Card } from 'components';

describe('Intial', () => {
  it('It renders children', () => {
    const { queryByTestId } = render(
      <Card>
        <div data-testid="my-child"></div>
      </Card>
    );

    expect(queryByTestId('my-child')).toBeTruthy();
  });

  it('It renders header with title', () => {
    const { queryByTestId } = render(<Card title={'MyTitle'} />);

    expect(queryByTestId('card-header').textContent).toEqual(expect.stringContaining('MyTitle'));
  });

  it('It allows extra classNames', () => {
    const { queryByTestId } = render(<Card className="my-extra-class" />);

    expect(queryByTestId('card').classList.contains('my-extra-class')).toBeTruthy();
  });

  it('It renders isLoading state properly ', () => {
    const { queryByTestId } = render(
      <Card isLoading={true}>
        <div data-testId="my-child"></div>
      </Card>
    );

    expect(queryByTestId('card-loading')).toBeTruthy();
    // Do not render children when state is loading
    expect(queryByTestId('my-child')).toBeFalsy();
  });
});
