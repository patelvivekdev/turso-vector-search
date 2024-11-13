## Turso Vector Search

This is a simple RAG example of how to use the Turso Vector Search API with Drizzle ORM and Mistral AI | Google AI.

![Turso](./public/turso-vector-search.webp)

## Installation

```bash

bun i
```

### Copy the .env.example to .env and set the values

```bash

cp .env.example .env
```

### Run the migrations

```bash

bun run db:generate
bun run db:migrate
```

### Create Index on Turso

```sql
CREATE INDEX vector_idx ON embeddings (libsql_vector_idx(embedding));
```

### Run the server

```bash

bun run dev
```

## Links

- [Turso](https://turso.tech/)
- [Vercel AI SDK](https://sdk.vercel.ai/)
- [Drizzle](https://orm.drizzle.team/)
- [Mistral](https://docs.mistral.ai/)
- [Google AI](https://ai.google.com/)
- [patelvivekdev](https://patelvivek.dev/)
