# xsurface-fullstack-developer-test

## Basic JS & CSS Test
- Functions are located at `/test/xsf.js`
- Jest tests are located at `/server/src/tests/xsf.test.js`

## Deployed App
Production Link:
https://xsurface-fullstack-developer-test.vercel.app/landing-page

Figma Brainstorm & Planning Board:
https://www.figma.com/board/ybKGgmHQXk05aCsK6dWw6O/xsf-brain?node-id=0-1&p=f&t=R03v19fIMtFjZ6zz-0

## App Structure (essentials)
- `src/pages/landing-page` — landing screen
- `src/pages/products` — list page
- `src/pages/products/create` — create form + uploads
- 🚧 `src/pages/products/[_id]` — edit page
- `src/pages/products/[_id]/show` — detail page
- `src/containers/products/*` — page logic and UI
- `src/components` — reusable UI (cards, carousels, breadcrumbs)
- `src/utils` — theme and helpers
- `src/api/noop.ts` — no-op API for AntD Upload action

## What It Calls (API)
- List: `POST /products?currentPage=&pageLimit=` with optional `filter`
- Show: `GET /products/:code/show`
- Create: `POST /products/create` with `{ images, productName, code, price }`
- Upload image: `POST /s3-client/upload` (multipart: `file`, `bucket`, `key`)
- Delete image: `POST /s3-client/delete` with `{ Bucket, Key }`

## Behavior Highlights
- Uploads: max 6 images, 50MB each; basic rate limit via `localStorage` (`xsf-test`)
- List: debounced search (500ms) + pagination
- Atlas Search (cloud service) and understanding efficient indexing rules

## Styling
- Ant Design theme in `src/utils/theme.ts`
- Tailwind classes in `src/app/globals.css`
- `styled-components` for custom styles

