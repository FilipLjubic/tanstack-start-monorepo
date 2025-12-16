if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL =
    'postgresql://postgres:postgres@127.0.0.1:54322/postgres';
}

if (!process.env.BETTER_AUTH_SECRET) {
  process.env.BETTER_AUTH_SECRET = 'test-secret-key-for-testing-only';
}

if (!process.env.BETTER_AUTH_URL) {
  process.env.BETTER_AUTH_URL = 'http://localhost:3000';
}
