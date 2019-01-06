import 'whatwg-fetch';

const getApiBasePath = () =>
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8004/api/'
    : '/api/';

const parseJSON = (response: Response) => response.json();

const checkStatus = (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
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

const request = (url: string, options?: FetchOptions) => {
  const baseApiPath = getApiBasePath();
  const body =
    options && options.body ? JSON.stringify(options.body) : undefined;
  return fetch(`${baseApiPath}${url}`, {
    ...options,
    body,
    headers: new Headers({ 'content-type': 'application/json' }),
  })
    .then(checkStatus)
    .then(parseJSON);
};

export default request;
