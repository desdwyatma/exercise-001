import { expect } from '@playwright/test';

export function assertString(value: unknown) {
  expect(typeof value, 'expected string').toBe('string');
}

export function assertNumber(value: unknown) {
  expect(typeof value, 'expected number').toBe('number');
}

export function assertLoginSuccess(body: unknown) {
  expect(body).toBeTruthy();
  const b = body as { accessToken?: unknown; refreshToken?: unknown };
  assertString(b.accessToken);
  assertString(b.refreshToken);
}

export function assertLoginFail(body: unknown) {
  expect(body).toBeTruthy();
  const b = body as { message?: unknown; error?: unknown };
  const msg = b.message ?? b.error;
  assertString(msg);
}

export function assertRegisterSuccess(body: unknown) {
  expect(body).toBeTruthy();
  const b = body as { id?: unknown; firstName?: unknown; lastName?: unknown; age?: unknown };
  assertNumber(b.id);
  assertString(b.firstName);
  assertString(b.lastName);
  assertNumber(b.age);
}

export function assertRegisterFail(body: unknown) {
  expect(body).toBeTruthy();
  const b = body as { message?: unknown; error?: unknown };
  const msg = b.message ?? b.error;
  assertString(msg);
}

export function assertListResourceCollection(body: unknown) {
  expect(body).toBeTruthy();
  const b = body as {
    total?: unknown;
    skip?: unknown;
    limit?: unknown;
    products?: unknown;
  };

  assertNumber(b.total);
  assertNumber(b.skip);
  assertNumber(b.limit);

  expect(Array.isArray(b.products), 'expected products array').toBe(true);

  const first = (b.products as any[])[0];
  if (first) {
    assertNumber(first.id);
    expect(typeof first.title).toBe('string');
    expect(typeof first.category).toBe('string');
    assertNumber(first.price);
  }
}

export function assertListResourceSingle(body: unknown) {
  expect(body).toBeTruthy();
  const b = body as {
    id?: unknown;
    title?: unknown;
    category?: unknown;
    price?: unknown;
  };

  assertNumber(b.id);
  assertString(b.title);
  assertString(b.category);
  assertNumber(b.price);
}

