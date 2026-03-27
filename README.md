Playwright framework

## Folder structure
- `tests/api` for API automation (Playwright `request` fixture)
- `tests/ui` for UI automation (Playwright `page` fixture)

## Setup
1. Install Node.js (this repo needs `node` and `npm` in PATH).
2. From this repo root:
   - `npm i -D @playwright/test typescript ts-node @types/node`
   - `npx playwright install`

3. (Optional) Create `.env` from `.env.example`:
   - PowerShell: `Copy-Item .env.example .env`
   - Git Bash: `cp .env.example .env`

## Run tests
- API tests (Playwright `request`):
  - `npm run test-api`
  - Filter cases by tag:
    - `npm run test-api -- "--grep" "@docs-products"`
    - `npm run test-api -- "--grep" "@docs-auth"`
    - `npm run test-api -- "--grep" "@docs-users"`
    - `npm run test-api -- "--grep" "@products"`
    - `npm run test-api -- "--grep" "@auth-login"`
    - `npm run test-api -- "--grep" "@auth-me"`
    - `npm run test-api -- "--grep" "@auth-refresh"`
    - `npm run test-api -- "--grep" "@users"`
    - `npm run test-api -- "--grep" "@users-add"`

- UI tests (Playwright `page`):
  - `npm run test-ui`
  - Filter cases by tag:
    - `npm run test-ui -- "--grep" "@docs-home"`
    - `npm run test-ui -- "--grep" "@home"`

## API target
The API suite targets [DummyJSON](https://dummyjson.com) by default. You can override the target API by setting the `API_BASE_URL` environment variable.
