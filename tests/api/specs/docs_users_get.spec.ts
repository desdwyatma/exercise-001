import { test, expect } from '@playwright/test';
import { createApiClient } from '../support/apiClient';

test.describe('API: docs_users', () => {
  test('@positive @docs-users @users get users list', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.get('/users');
    expect(res.status(), 'HTTP status').toBe(200);

    const body = (await res.json()) as any;
    expect(Array.isArray(body.users), 'expected users array').toBe(true);
    expect(body.total, 'total present').toBeTruthy();
    expect(body.limit, 'limit present').toBeTruthy();
    expect(body.skip, 'skip field should exist').toBeDefined();
  });

  test('@positive @docs-users @users get single user', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.get('/users/1');
    expect(res.status(), 'HTTP status').toBe(200);

    const body = (await res.json()) as any;
    expect(body.id, 'id present').toBeTruthy();
    expect(body.firstName, 'firstName present').toBeTruthy();
    expect(body.lastName, 'lastName present').toBeTruthy();
  });

  test('@positive @docs-users @users search users', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.get('/users/search?q=John');
    expect(res.status(), 'HTTP status').toBe(200);

    const body = (await res.json()) as any;
    expect(Array.isArray(body.users), 'expected users array').toBe(true);
  });

  test('@positive @docs-users @users limit/skip/select users', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.get('/users?limit=5&skip=10&select=firstName,age');
    expect(res.status(), 'HTTP status').toBe(200);

    const body = (await res.json()) as any;
    expect(Array.isArray(body.users), 'expected users array').toBe(true);
    const first = body.users[0];
    if (first) {
      expect(first.firstName, 'firstName present').toBeTruthy();
      expect(first.age, 'age present').toBeTruthy();
    }
  });
});

