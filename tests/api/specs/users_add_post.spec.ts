import { test, expect } from '@playwright/test';
import { createApiClient } from '../support/apiClient';
import { assertRegisterSuccess } from '../support/assertions';
import {
  addUserMissingAgeData,
  addUserMissingFirstNameData,
  addUserMissingLastNameData,
  addUserValidData,
} from '../data/user_add_data';

test.describe('API: users_add', () => {
  test('@positive @docs-users @users-add add user with valid request parameter', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.post('/users/add', addUserValidData);
    const body = await res.json();

    expect(res.status(), 'HTTP status').toBe(201);
    assertRegisterSuccess(body);
    expect((body as any).id, 'id present').toBeTruthy();
  });

  test('@negative @docs-users @users-add add user with missing firstName field', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.post('/users/add', addUserMissingFirstNameData);

    expect(res.status(), 'HTTP status').toBe(201);
    const body = await res.json();
    expect(body).toBeTruthy();
  });

  test('@negative @docs-users @users-add add user with missing lastName field', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.post('/users/add', addUserMissingLastNameData);

    expect(res.status(), 'HTTP status').toBe(201);
    const body = await res.json();
    expect(body).toBeTruthy();
  });

  test('@negative @docs-users @users-add add user with missing age field', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.post('/users/add', addUserMissingAgeData);

    expect(res.status(), 'HTTP status').toBe(201);
    const body = await res.json();
    expect(body).toBeTruthy();
  });

  test('@negative @docs-users @users-add add user with empty request body', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.post('/users/add', {});

    expect(res.status(), 'HTTP status').toBe(201);
    const body = await res.json();
    expect(body).toBeTruthy();
  });

  test('@negative @docs-users @users-add add user with invalid HTTP method', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.patch('/users/add', addUserValidData);

    expect([400, 401, 404, 405], 'HTTP status').toContain(res.status());
  });
});

