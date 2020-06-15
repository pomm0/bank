import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { StatefulFetchHoc } from 'components';
import { Server, Response } from 'miragejs';

const urlPrefix = process.env.REACT_APP_API_URL;
const server = new Server({ urlPrefix });
const url = `${urlPrefix}/my-url`;

describe('Intial', () => {
  it('It starts fetch on init', (asyncDone) => {
    const serverHandler = jest.fn(() => {
      asyncDone();
      return new Response(200);
    });
    // Register mirage server mock to be able to catch fetches
    server.get(url, serverHandler);

    render(<StatefulFetchHoc urlPath="/my-url" initialFetch={true} />);

    expect(serverHandler.mock.calls.length).toBe(1);
  });
});

describe('Runtime', () => {
  it('It starts fetch on render props `fetch` click', (asyncDone) => {
    const serverHandler = jest.fn(() => {
      // wait for next render. TODO: find better solution
      setTimeout(() => {
        asyncDone();
      }, 500);
      return new Response(200, null, { user: { name: 'myName' } });
    });
    server.get(url, serverHandler);

    const { queryByTestId } = render(
      <StatefulFetchHoc urlPath="/my-url">
        {({ fetch }) => (
          <button type="button" onClick={fetch} data-testid="trigger">
            Trigger
          </button>
        )}
      </StatefulFetchHoc>
    );

    fireEvent.click(queryByTestId('trigger'));

    expect(serverHandler.mock.calls.length).toBe(1);
  });
});
