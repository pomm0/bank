import React, { useState, useEffect } from 'react';
import { backendFetch } from 'utils/backendFetch';

/**
 * This higher order component is meant to fetch some data and passes to children
 * while respecting fetch states
 *
 *  - isLoading: Whether the fetch is running
 *  - isError: Whether the fetch errored
 *  - isResolved: Whether the fetch succeeded
 *
 * The children (must be a function) receives
 *  - the state object
 *  - the fetch response
 *  - a `fetch` funtion to start the fetch manually
 *
 * @param {string} props.urlPath The fetch url path
 * @param {string} props.method The fetch method (default GET)
 * @param {object} props.headers Additional fetch headers, would overwrite default ones
 * @param {object} props.body The fetch body
 * @param {function} props.onSuccess A function which will be called when fetch succeeded
 * @param {Boolean} props.initialFetch Whether it should start fetch instantley
 */
export const StatefulFetchHoc = (props) => {
  const { urlPath, method, headers, body, onSuccess, initialFetch, children } = props;

  const [response, setResponse] = useState({});
  const [state, setState] = useState({
    isLoading: false,
    isError: false,
    isResolved: false
  });

  const fetch = () => {
    setState({ isError: false, isLoading: true, isResolved: false });

    // TODO: Fix potential component state update while component is unmounted
    backendFetch({ urlPath, method, headers, body })
      .then((fetchResponse) => {
        if (!fetchResponse.ok) {
          throw new Error(`[StatefulFetchHoc] fetch error: "${urlPath}"`);
        }

        const contentType = fetchResponse.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return fetchResponse.json();
        }

        return fetchResponse.text();
      })
      .then((response) => {
        setResponse(response);
        setState({ isError: false, isLoading: false, isResolved: true });

        if (typeof onSuccess === 'function') {
          onSuccess(response);
        }
      })
      .catch(() => {
        setState({ isError: true, isLoading: false, isResolved: false });
      });
  };

  useEffect(() => {
    initialFetch && fetch();
  }, []);

  return <>{typeof children === 'function' && children({ state, response, fetch })} </>;
};
