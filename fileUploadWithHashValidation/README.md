# mytube

TypeScript + React (Vite) client and Hono server.

## Scripts

From the repo root:

- Client dev: `npm run dev:client`
- Server dev: `npm run dev:server`
- Build all: `npm run build`
- Start server (after build): `npm run start:server`

## Endpoints

- Client: http://localhost:5173
- Server: http://localhost:3000

## Server Response

`GET /` returns:

```json
{ "message": "Hello from Hono" }
```
