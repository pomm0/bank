import React, { useState, useEffect } from 'react';
import { Card } from 'components';
import { promiseWithMinRuntime } from 'utils/promise';
import { backendFetch } from 'utils/backendFetch';

/**
 * This component is a dynamic card.
 * Dynamic card means, it fetches data from a given url and passes its children.
 * It is stateful and has the following states:
 *
 *  - isLoading: Whether the fetch is running
 *  - isError: Whether the fetch errored
 *
 * Both states will visibily be seen.
 * While loading, it will triggers <Card />'s loading state.
 * While error, it will output a error message (TODO: make message as optional prop).
 *
 * @param {String} props.urlPath
 */
export const DynamicCard = (props) => {
  const { urlPath, payloadRootKey, ...restProps } = props;

  const [model, setModel] = useState({});
  const [state, setState] = useState({
    isLoading: true,
    isError: false
  });

  useEffect(() => {
    setState({ isError: false, isLoading: true });

    // TODO: Fix potential component state update while component is unmounted
    promiseWithMinRuntime(backendFetch({ urlPath }))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`[Dashbaord::dynamicCard] fetch error: "${urlPath}"`);
        }

        return response.json();
      })
      .then((json) => {
        if (!json[payloadRootKey]) {
          throw new Error(`[Dashbaord::dynamicCard] fetch response error: "${urlPath}"`);
        }
        setModel(json[payloadRootKey]);
        setState({ isError: false, isLoading: false });
      })
      .catch(() => {
        setState({ isError: true, isLoading: false });
      });
  }, [urlPath, payloadRootKey]);

  return (
    <Card {...restProps} isLoading={state.isLoading}>
      {state.isError ? (
        <div data-testid="dynamic-card-error">
          Fehler bitte versuchen Sie es etwas später erneut!
        </div>
      ) : (
        <>{!state.isLoading && props.children && props.children(model)}</>
      )}
    </Card>
  );
};
