import 'whatwg-fetch';

const getApiBasePath = () =>
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8004/api/'
    : '/api/';

const parseJSON = (response: any) => response.json();

const checkStatus = (response: any) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  return response
    .text()
    .then((body: string) => (body ? JSON.parse(body) : {}))
    .then((parsedBody: Object) => {
      throw {
        statusText: response.statusText,
        status: response.status,
        message: parsedBody,
      };
    });
};

const request = (url: string, options?: Object) => {
  const baseApiPath = getApiBasePath();

  return fetch(`${baseApiPath}${url}`, {
    ...options,
    headers: new Headers({ 'content-type': 'application/json' }),
  })
    .then(checkStatus)
    .then(parseJSON);
};

export default request;
