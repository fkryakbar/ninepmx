# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project Overview

**ninepmx** is a personal developer portfolio site for "fkryakbar" built with Next.js 16 (App Router), React 19, Prisma 7, and Tailwind CSS 4. It features a cyberpunk/hacker-terminal aesthetic with a public-facing portfolio and an admin panel for managing projects.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint (flat config, eslint.config.mjs)
npx prisma generate  # Regenerate Prisma client (also runs on postinstall)
npx prisma migrate dev --name <name>  # Create and apply a migration
```

No test framework is configured.

## Architecture

### Layered Data Flow

The codebase follows a strict layered pattern for data operations:

```
Server Actions (actions/)  →  Repositories (repositories/)  →  Prisma Client (lib/prisma.ts)
Route Handlers (app/api/)  →  Repositories (repositories/)  →  Prisma Client (lib/prisma.ts)
```

- **`types/`** — Zod schemas for validation (`CreateProjectSchema`, `UpdateProjectSchema`, `LoginSchema`) and TypeScript interfaces. All form validation happens here.
- **`repositories/`** — Pure data-access layer wrapping Prisma queries. No auth checks, no validation.
- **`actions/`** — Server Actions that handle auth verification, Zod validation, slug generation, then delegate to repositories. They call `revalidatePath()` after mutations.
- **`app/api/`** — Route Handlers for REST-style access (used by public project listing pages). Auth-protected upload endpoints.

### Auth System

- Single admin user, credentials stored in env vars (`ADMIN_USERNAME`, `ADMIN_PASSWORD`).
- JWT-based sessions using `jose` (HS256), stored in `admin_session` httpOnly cookie, 7-day expiry.
- `proxy.ts` is the Next.js 16 middleware file (renamed from `middleware.ts`). It protects `/admin/*` routes, redirecting unauthenticated users to `/admin/login`.
- `lib/auth.ts` provides `verifySession()` (cached via React `cache()`), `createSession()`, `deleteSession()`, `encrypt()`, `decrypt()`.
- Server Actions and API routes call `verifySession()` for auth checks.

### Route Structure

- **Public**: `/` (home), `/about`, `/projects`, `/projects/[slug]`
- **Admin**: `/admin/login`, `/admin` (dashboard), `/admin/projects`, `/admin/projects/create`, `/admin/projects/[id]/edit`
- **API**: `/api/projects`, `/api/projects/latest`, `/api/projects/[slug]`, `/api/upload/image`, `/api/upload/file`

Admin routes use a `(dashboard)` route group with a shared layout that includes sidebar + top bar and calls `verifySession()`.

### File Uploads

Files upload to S3-compatible storage (e.g. Cloudflare R2) via `lib/upload.ts` and `lib/s3.ts`. Images max 5MB, general files max 20MB. Stored under `projects/images/` and `projects/files/` prefixes.

### Database

PostgreSQL via Prisma 7 with the `@prisma/adapter-pg` driver adapter (raw `pg` Pool). Single model: `Project` (mapped to `projects` table) with `ProjectType` enum (`open_source` | `close_source`). Slugs are auto-generated from project names and must be unique.

### Key Libraries

- **TipTap** — Rich text editor for project content (admin side)
- **sonner** — Toast notifications
- **next-themes** — Dark/light theme toggle
- **zod v4** — Schema validation

### Path Aliases

`@/*` maps to project root (tsconfig paths).

### Environment Variables

Copy `.env.example` to `.env`. Required: `DATABASE_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SESSION_SECRET`, plus AWS/S3-compatible storage credentials.
