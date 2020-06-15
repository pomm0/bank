import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { Menu } from 'components';

// Menu relies on react-router, so render with dummy router
const RenderWithRouter = (children) => {
  return render(<BrowserRouter>{children ? <>{children}</> : <Menu />}</BrowserRouter>);
};

describe('Intial', () => {
  it('It renders correctly', () => {
    const { queryByTestId } = RenderWithRouter();

    expect(queryByTestId('menu-logo')).toBeTruthy();
    expect(queryByTestId('menu-link-dashboard')).toBeTruthy();
    expect(queryByTestId('menu-link-bank-transfer')).toBeTruthy();
    expect(queryByTestId('menu-link-card')).toBeTruthy();
  });
});

describe('Runtime', () => {
  it('It triggers `onNavigate` on navigate', () => {
    const onNavigate = jest.fn(() => {});
    const { queryByTestId } = RenderWithRouter(<Menu onNavigate={onNavigate} />);

    fireEvent.click(queryByTestId('menu-logo'));
    fireEvent.click(queryByTestId('menu-link-dashboard'));
    fireEvent.click(queryByTestId('menu-link-bank-transfer'));
    fireEvent.click(queryByTestId('menu-link-card'));

    expect(onNavigate.mock.calls.length).toBe(4);
  });
});
