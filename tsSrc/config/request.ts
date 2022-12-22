import { snHttpFactory } from 'sn-http-request';

const snHttp = snHttpFactory({
  xsrfToken: window.g_ck,
  batching: true,
});

declare global {
  interface Window {
    g_ck: string;
    transaction_source: string;
  }
}

type httpMethods = 'get' | 'post' | 'put' | 'delete' | 'patch';

export interface IRequest {
  url: string;
  method: httpMethods;
  params?: Record<string, unknown>;
  headers?: Record<string, unknown>;
  data?: Record<string, unknown>;
  options?: Record<string, unknown>;
}

const _request = async ({
  url,
  method,
  params = {},
  headers = {},
  data,
  options = {},
}: IRequest) => {
  return snHttp.request(url, method, {
    params,
    headers: {
      'content-type': 'application/json',
      'X-Transaction-Source': window.transaction_source,
      'X-UserToken': window.g_ck,
      ...headers,
    },
    data,
    ...options,
  });
};

const table = ({ url, method, params = {}, headers, data, options = {} }: IRequest) => {
  return _request({
    url: `api/now/table/${url}`,
    method,
    params,
    headers,
    data,
    options: options,
  });
};

const now = ({ url, method, params = {}, headers, data, options = {} }: IRequest) => {
  return _request({
    url: `api/now/${url}`,
    method,
    params,
    headers,
    data,
    options: options,
  });
};

const cancelToken = () => snHttp.client.getSource();

export { cancelToken, table, now };
