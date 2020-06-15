export const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

/**
 * Fetch-util with default headers to fetch something from backend api.
 *
 * @param {string} options.urlPath The fetch url path (It begins defaultly with the api-domain)
 * @param {string} options.method The fetch method (default GET)
 * @param {object} options.headers Additional fetch headers, would overwrite default ones
 * @param {object} options.body The fetch body
 */
export const backendFetch = ({ urlPath, method, headers, body }) => {
  if (urlPath && urlPath[0] !== '/') {
    urlPath = '/' + urlPath.slice(1);
  }

  return fetch(`${REACT_APP_API_URL}${urlPath}`, {
    method: method || 'GET',
    headers,
    body
  });
};
