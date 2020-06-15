import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Main } from 'components/layout/Main';

// Main relies on react-router, so render with dummy router
const RenderWithRouter = () => {
  return render(
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
};

describe('Intial', () => {
  it('It renders correctly', () => {
    const { queryByTestId } = RenderWithRouter();

    expect(queryByTestId('main-mobile-menu')).toBeTruthy();
    expect(queryByTestId('main-desktop-menu')).toBeTruthy();
    expect(queryByTestId('main-children')).toBeTruthy();
  });
});
