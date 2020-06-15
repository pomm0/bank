import React from 'react';
import { render } from '@testing-library/react';
import { DynamicCard } from 'components';
import { Server, Response } from 'miragejs';

const urlPrefix = process.env.REACT_APP_API_URL;
const server = new Server({ urlPrefix });
const url = `${urlPrefix}/my-url`;

describe('Intial', () => {
  it('It starts fetch on init', (asyncDone) => {
    const serverHandler = jest.fn((_, request) => {
      // Check that proper url has been fetched
      expect(request.url).toBe(url);
      asyncDone();
      return new Response(200);
    });
    // Register mirage server mock to be able to catch fetches
    server.get(url, serverHandler);

    render(<DynamicCard urlPath="/my-url" />);

    expect(serverHandler.mock.calls.length).toBe(1);
  });
});

describe('Runtime', () => {
  it('It does not show content while fetch', (asyncDone) => {
    server.get(url, () => {
      asyncDone();
      return new Response(200);
    });

    const { queryByTestId } = render(
      <DynamicCard urlPath="/my-url">
        <div data-testid="my-child"></div>
      </DynamicCard>
    );

    expect(queryByTestId('my-child')).toBeFalsy();
  });

  it('It does show card-loading while fetch', (asyncDone) => {
    server.get(url, () => {
      asyncDone();
      return new Response(200);
    });

    const { queryByTestId } = render(<DynamicCard urlPath="/my-url" />);

    expect(queryByTestId('card-loading')).toBeTruthy();
  });

  it('It does show error-message when fetch failes', (asyncDone) => {
    server.get(url, () => {
      // wait for next render. TODO: find better solution
      setTimeout(() => {
        expect(queryByTestId('dynamic-card-error')).toBeTruthy();
        asyncDone();
      }, 500);

      return new Response(500);
    });

    const { queryByTestId } = render(<DynamicCard urlPath="/my-url" />);
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
