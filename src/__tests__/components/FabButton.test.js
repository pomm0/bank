import React from 'react';
import { render } from '@testing-library/react';
import { FabButton } from 'components';

describe('Intial', () => {
  it('It renders children', () => {
    const { queryByTestId } = render(
      <FabButton>
        <div data-testid="my-child"></div>
      </FabButton>
    );

    expect(queryByTestId('my-child')).toBeTruthy();
  });
});
