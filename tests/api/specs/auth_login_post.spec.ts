import { test, expect } from '@playwright/test';
import { createApiClient } from '../support/apiClient';
import { assertLoginFail, assertLoginSuccess } from '../support/assertions';
import {
  loginEmptyUsernameData,
  loginEmptyPasswordData,
  loginInvalidUsernameData,
  loginMissingUsernameData,
  loginMissingPasswordData,
  loginValidData,
} from '../data/auth_login_data';

test.describe('API: auth_login', () => {
  test('@positive @docs-auth @auth-login with valid request parameter', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.post('/auth/login', loginValidData);
    const body = await res.json();

    expect(res.status(), 'HTTP status').toBe(200);
    assertLoginSuccess(body);
    expect((body as any).id, 'id present').toBeTruthy();
    expect((body as any).username, 'username present').toBeTruthy();
  });

  test('@negative @docs-auth @auth-login with an invalid user username', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.post('/auth/login', loginInvalidUsernameData);

    expect([400, 401], 'HTTP status').toContain(res.status());
    const body = await res.json();
    assertLoginFail(body);
  });

  test('@negative @docs-auth @auth-login with the username field is empty', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.post('/auth/login', loginEmptyUsernameData);

    expect(res.status(), 'HTTP status').toBe(400);
    const body = await res.json();
    assertLoginFail(body);
  });

  test('@negative @docs-auth @auth-login with missing username field', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.post('/auth/login', loginMissingUsernameData);

    expect(res.status(), 'HTTP status').toBe(400);
    const body = await res.json();
    assertLoginFail(body);
  });

  test('@negative @docs-auth @auth-login with the password field is empty', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.post('/auth/login', loginEmptyPasswordData);

    expect(res.status(), 'HTTP status').toBe(400);
    const body = await res.json();
    assertLoginFail(body);
  });

  test('@negative @docs-auth @auth-login with missing password field', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.post('/auth/login', loginMissingPasswordData);

    expect(res.status(), 'HTTP status').toBe(400);
    const body = await res.json();
    assertLoginFail(body);
  });

  test('@negative @docs-auth @auth-login with empty request body', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.post('/auth/login', {});

    expect(res.status(), 'HTTP status').toBe(400);
    const body = await res.json();
    assertLoginFail(body);
  });

  test('@negative @docs-auth @auth-login with invalid HTTP method', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.patch('/auth/login', loginValidData);

    expect([400, 401, 404, 405], 'HTTP status').toContain(res.status());
  });

  test('@positive @docs-auth @auth-me get current auth user', async ({ request }) => {
    const api = createApiClient(request);

    const loginRes = await api.post('/auth/login', loginValidData);
    expect(loginRes.status(), 'HTTP status').toBe(200);
    const loginBody = (await loginRes.json()) as any;

    const meRes = await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${loginBody.accessToken}` },
    });
    expect(meRes.status(), 'HTTP status').toBe(200);

    const meBody = (await meRes.json()) as any;
    expect(meBody.id, 'id present').toBeTruthy();
    expect(meBody.username, 'username present').toBeTruthy();
  });

  test('@positive @docs-auth @auth-refresh refresh auth session', async ({ request }) => {
    const api = createApiClient(request);

    const loginRes = await api.post('/auth/login', loginValidData);
    expect(loginRes.status(), 'HTTP status').toBe(200);
    const loginBody = (await loginRes.json()) as any;

    const refreshRes = await api.post('/auth/refresh', {
      refreshToken: loginBody.refreshToken,
      expiresInMins: 30,
    });
    expect(refreshRes.status(), 'HTTP status').toBe(200);
    const refreshBody = (await refreshRes.json()) as any;

    expect(refreshBody.accessToken, 'accessToken present').toBeTruthy();
    expect(refreshBody.refreshToken, 'refreshToken present').toBeTruthy();
  });
});

