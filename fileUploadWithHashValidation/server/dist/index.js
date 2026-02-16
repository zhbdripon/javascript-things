import { Hono } from 'hono';
import { serve } from '@hono/node-server';
const app = new Hono();
app.get('/', (c) => c.json({ message: 'Hello from Hono' }));
const port = 3000;
serve({ fetch: app.fetch, port });
console.log(`Server running on http://localhost:${port}`);
