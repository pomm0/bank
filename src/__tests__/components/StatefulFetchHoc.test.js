import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { StatefulFetchHoc } from 'components';
import { Server, Response } from 'miragejs';

const urlPrefix = process.env.REACT_APP_API_URL;
const server = new Server({ urlPrefix });
server.logging = false;
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
  it('It starts fetch on render props `fetch` click', async () => {
    let lazyProps = {
      isLoading: null,
      isError: null,
      isResolved: null,
      response: null
    };

    const setProps = (props) => {
      lazyProps = props;
    };

    const serverHandler = jest.fn(() => new Response(200, {}, { user: { name: 'myName' } }));
    server.get(url, serverHandler);

    const { queryByTestId } = await act(() =>
      render(
        <StatefulFetchHoc urlPath="/my-url">
          {({ fetch, response, state }) => (
            <>
              {setProps({
                isLoading: state.isLoading,
                isError: state.isError,
                isResolved: state.isResolved,
                response
              })}
              <button type="button" onClick={fetch} data-testid="trigger">
                Trigger
              </button>
            </>
          )}
        </StatefulFetchHoc>
      )
    );

    fireEvent.click(queryByTestId('trigger'));

    await waitFor(() => expect(serverHandler.mock.calls.length).toBe(1));

    // while fetching
    await waitFor(() => expect(lazyProps.isLoading).toBe(true));

    // fetch done
    await waitFor(() => expect(lazyProps.isResolved).toBe(true));
    await waitFor(() => expect(lazyProps.isError).toBe(false));
    await waitFor(() => expect(lazyProps.response?.user?.name).toBe('myName'));
  });

  it('It sets isError prop to true on error', async () => {
    let lazyProps = {
      isLoading: null,
      isError: null,
      isResolved: null,
      response: null
    };

    const setProps = (props) => {
      lazyProps = props;
    };

    const serverHandler = jest.fn(() => new Response(500));
    server.get(url, serverHandler);

    const { queryByTestId } = await act(() =>
      render(
        <StatefulFetchHoc urlPath="/my-url">
          {({ fetch, response, state }) => (
            <>
              {setProps({
                isLoading: state.isLoading,
                isError: state.isError,
                isResolved: state.isResolved,
                response
              })}
              <button type="button" onClick={fetch} data-testid="trigger">
                Trigger
              </button>
            </>
          )}
        </StatefulFetchHoc>
      )
    );

    fireEvent.click(queryByTestId('trigger'));

    // fetch done
    await waitFor(() => expect(lazyProps.isError).toBe(true));
    await waitFor(() => expect(lazyProps.response).toBe(null));
  });
});
