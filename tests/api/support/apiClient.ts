import type { APIRequestContext, APIResponse } from '@playwright/test';

type RequestOptions = {
  headers?: Record<string, string>;
};

export function createApiClient(request: APIRequestContext) {
  const baseURLRaw = process.env.API_BASE_URL ?? process.env.BASE_URL ?? '';
  const baseURL = baseURLRaw.replace(/\/+$/, '');
  if (!baseURL) {
    throw new Error('Missing API_BASE_URL (or BASE_URL).');
  }

  return {
    async get(path: string, options: RequestOptions = {}): Promise<APIResponse> {
      const normalizedPath = path.startsWith('/') ? path : `/${path}`;
      return request.get(`${baseURL}${normalizedPath}`, { headers: options.headers });
    },
    async post(
      path: string,
      body: unknown,
      options: RequestOptions = {},
    ): Promise<APIResponse> {
      const normalizedPath = path.startsWith('/') ? path : `/${path}`;
      return request.post(`${baseURL}${normalizedPath}`, {
        data: body,
        headers: options.headers,
      });
    },
    async patch(
      path: string,
      body: unknown,
      options: RequestOptions = {},
    ): Promise<APIResponse> {
      const normalizedPath = path.startsWith('/') ? path : `/${path}`;
      return request.patch(`${baseURL}${normalizedPath}`, {
        data: body,
        headers: options.headers,
      });
    },
  };
}

