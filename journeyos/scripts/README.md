# Scripts — Automation & DevOps

This directory holds all automation scripts that support the development, build, deployment, and maintenance lifecycle of JourneyOS. Scripts are organized by purpose and designed to run from the project root.

## Conventions

- Scripts are executable shell scripts (`.sh`) or Node.js scripts (`.js` / `.ts`).
- Each script includes a comment header describing its purpose and usage.
- Scripts are idempotent where possible — safe to run multiple times without side effects.
- Environment variables are read from `.env.local`, never hardcoded.

## Planned Categories

| Script | Purpose |
|---|---|
| `seed-db` | Populate database with development seed data |
| `migrate` | Run database migrations |
| `generate-types` | Generate TypeScript types from Supabase schema |
| `lint-all` | Run ESLint + Prettier + type-check in sequence |
| `deploy-check` | Pre-deployment health and validation checks |
| `backup-db` | Export database snapshot for local development |
