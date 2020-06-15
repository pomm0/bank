import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Sidebar } from 'components';

describe('Intial', () => {
  it('It starts closed', () => {
    const { queryByTestId } = render(<Sidebar />);

    expect(queryByTestId('open-trigger')).toBeTruthy();
    expect(queryByTestId('content')).toBeFalsy();
    expect(queryByTestId('backdrop')).toBeFalsy();
    expect(queryByTestId('close-trigger')).toBeFalsy();
  });
});

describe('Runtime', () => {
  it('It shows content on open-trigger click', () => {
    const { queryByTestId } = render(<Sidebar />);

    const openTrigger = queryByTestId('open-trigger');
    fireEvent.click(openTrigger);

    expect(queryByTestId('content')).toBeTruthy();
  });

  it('It closes on backdrop click', () => {
    const { queryByTestId } = render(<Sidebar isOpen={true} />);

    // Ensure content is shown
    expect(queryByTestId('content')).toBeTruthy();

    const openTrigger = queryByTestId('backdrop');
    fireEvent.click(openTrigger);

    expect(queryByTestId('content')).toBeFalsy();
  });

  it('It closes on close-trigger click', () => {
    const { queryByTestId } = render(<Sidebar isOpen={true} />);

    // Ensure content is shown
    expect(queryByTestId('content')).toBeTruthy();

    const openTrigger = queryByTestId('close-trigger');
    fireEvent.click(openTrigger);

    expect(queryByTestId('content')).toBeFalsy();
  });

  it('It closes on passed closeAction trigger', () => {
    const { queryByTestId } = render(
      <Sidebar isOpen={true}>
        {({ closeAction }) => (
          <button type="button" data-testid="children-close" onClick={closeAction}>
            Close sidebar
          </button>
        )}
      </Sidebar>
    );

    // Ensure content is shown
    expect(queryByTestId('content')).toBeTruthy();

    const openTrigger = queryByTestId('children-close');
    fireEvent.click(openTrigger);

    expect(queryByTestId('content')).toBeFalsy();
  });
});
