import 'whatwg-fetch';

const getApiBasePath = () =>
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api/'
    : '/api/';

const parseJSON = response => response.json();

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  return (
    response
      .text()
      // To handle empty responses: should not throw an error at this stage.
      .then(body => (body ? JSON.parse(body) : {}))
      .then(parsedBody => {
        error.response = parsedBody;
        error.status = response.status;
        throw error;
      })
  );
};

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
const request = (url, options) => {
  const baseApiPath = getApiBasePath();

  return fetch(`${baseApiPath}${url}`, {
    ...options,
    headers: new Headers({ 'content-type': 'application/json' }),
  })
    .then(checkStatus)
    .then(parseJSON);
};

export default request;
