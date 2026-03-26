import { test, expect } from '@playwright/test';
import { createApiClient } from '../support/apiClient';
import { assertListResourceCollection, assertListResourceSingle } from '../support/assertions';

test.describe('API: docs_products', () => {
  test('@positive @docs-products @products get products list', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.get('/products');

    const body = await res.json();
    expect(res.status(), 'HTTP status').toBe(200);
    assertListResourceCollection(body);
  });

  test('@positive @docs-products @products get products list with pagination (limit/skip)', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.get('/products?limit=5&skip=10');

    const body = await res.json();
    expect(res.status(), 'HTTP status').toBe(200);
    assertListResourceCollection(body);
  });

  test('@positive @docs-products @products search products by query', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.get('/products/search?q=phone');

    const body = await res.json();
    expect(res.status(), 'HTTP status').toBe(200);
    assertListResourceCollection(body);
  });

  test('@positive @docs-products @products get single product', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.get('/products/1');

    const body = await res.json();
    expect(res.status(), 'HTTP status').toBe(200);
    assertListResourceSingle(body);
  });

  test('@negative @docs-products @products get product not found', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.get('/products/0');

    expect([404, 400], 'HTTP status').toContain(res.status());
  });

  test('@negative @docs-products @products invalid HTTP method', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.patch('/products', {});

    expect([400, 401, 404, 405], 'HTTP status').toContain(res.status());
  });

  test('@positive @docs-products @products sort products', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.get('/products?sortBy=title&order=asc');

    const body = await res.json();
    expect(res.status(), 'HTTP status').toBe(200);
    assertListResourceCollection(body);
  });

  test('@positive @docs-products @products get categories', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.get('/products/categories');

    expect(res.status(), 'HTTP status').toBe(200);
    const body = await res.json();
    expect(Array.isArray(body), 'expected array').toBe(true);
    expect(body.length, 'expected non-empty categories').toBeGreaterThan(0);
  });

  test('@positive @docs-products @products get category list', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.get('/products/category-list');

    expect(res.status(), 'HTTP status').toBe(200);
    const body = await res.json();
    expect(Array.isArray(body), 'expected array').toBe(true);
    expect(body.length, 'expected non-empty category list').toBeGreaterThan(0);
  });

  test('@positive @docs-products @products get products by category', async ({ request }) => {
    const api = createApiClient(request);
    const res = await api.get('/products/category/smartphones');

    const body = await res.json();
    expect(res.status(), 'HTTP status').toBe(200);
    assertListResourceCollection(body);
  });
});

