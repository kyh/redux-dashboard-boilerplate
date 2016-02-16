import superagent from 'superagent';
import cookie from 'react-cookie';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  // Prepend `/api` to relative URL, to proxy to API server.
  return `${ config.apiHost }/angular_api/v1${ adjustedPath }`;
}

class _ApiClient {
  constructor() {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        const token = cookie.load('token');

        if (token) {
          request.set('Authorization', 'Bearer ' + token);
        }

        if (params) {
          request.query(params);
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
