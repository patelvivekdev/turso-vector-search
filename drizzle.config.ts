import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });

//Configured for SQLite with Turso
export default defineConfig({
  dialect: 'turso',
  schema: './src/db/schema.ts',
  out: './migrations',
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN as string,
  },
  strict: true,
  verbose: true,
});
