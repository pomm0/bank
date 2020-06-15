import React from 'react';
import { render } from '@testing-library/react';
import { Intro } from 'components';

describe('Intial', () => {
  it('It renders title', () => {
    const { queryByTestId } = render(<Intro title="myTitle" />);

    expect(queryByTestId('intro-title').textContent).toEqual('myTitle');
  });

  it('It renders description', () => {
    const { queryByTestId } = render(<Intro description="myDescription" />);

    expect(queryByTestId('intro-description').textContent).toEqual('myDescription');
  });
});
