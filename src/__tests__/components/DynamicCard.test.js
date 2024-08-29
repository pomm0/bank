import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { DynamicCard } from 'components';
import { Server, Response } from 'miragejs';

const urlPrefix = process.env.REACT_APP_API_URL;
const server = new Server({ urlPrefix });
server.logging = false;
const url = `${urlPrefix}/my-url`;

describe('Intial', () => {
  it('It starts fetch on init', async () => {
    const serverHandler = jest.fn((_, request) => {
      // Check that proper url has been fetched
      expect(request.url).toBe(url);
      return new Response(200);
    });
    // Register mirage server mock to be able to catch fetches
    server.get(url, serverHandler);

    await act(() => render(<DynamicCard urlPath="/my-url" />));

    expect(serverHandler.mock.calls.length).toBe(1);
  });
});

describe('Runtime', () => {
  it('It does not show content while fetch', async () => {
    server.get(url, () => new Response(200));

    const { queryByTestId } = await act(() =>
      render(
        <DynamicCard urlPath="/my-url">
          <div data-testid="my-child"></div>
        </DynamicCard>
      )
    );

    expect(queryByTestId('my-child')).toBeFalsy();
  });

  it('It does show card-loading while fetch', async () => {
    server.get(url, () => {
      return new Response(200);
    });

    const { queryByTestId } = await act(() => render(<DynamicCard urlPath="/my-url" />));

    expect(queryByTestId('card-loading')).toBeTruthy();
  });

  it('It does show error-message when fetch failes', async () => {
    const serverHandler = jest.fn(() => new Response(500));
    server.get(url, serverHandler);

    const { queryByTestId } = await act(() => render(<DynamicCard urlPath="/my-url" />));

    await waitFor(() => expect(serverHandler.mock.calls.length).toBe(1));
    await waitFor(() => expect(queryByTestId('dynamic-card-error')).toBeTruthy());
  });

  // TODO: fix me
  // it('It passes model to children', (asyncDone) => {
  //   const TestChildComponent = (props) => {
  //     expect(model.user).toBeTruthy();
  //     expect(model.user.anme).toBe('myName');
  //   };

  //   server.get(url, () => {
  //     return new Response(200, {}, { user: { name: 'myName' } });
  //   });

  //   render(
  //     <DynamicCard urlPath="/my-url">
  //       {(model) => (
  //         <>
  //           {<TestChildComponent model={model} />}
  //         </>
  //       )}
  //     </DynamicCard>
  //   );
  // });
});
