# AGENTS.md

## Project

This is a Persian, RTL e-commerce marketplace built with:

* Next.js
* TypeScript
* Prisma
* PostgreSQL
* React Query
* shadcn/ui
* Tailwind CSS

Priorities:

1. Security
2. Correctness
3. Maintainability
4. Performance
5. Clear architecture

---

## Core Rules

* Inspect existing code before making changes.
* Follow existing project conventions.
* Prefer simple, maintainable solutions.
* Do not rewrite working code without a clear reason.
* Avoid unnecessary abstractions.
* Avoid unnecessary dependencies.
* Use TypeScript.
* Avoid `any`.
* Keep reusable business logic organized by domain.
* Do not make unrelated changes.

---

## File Change Approval — REQUIRED

**NEVER create, modify, delete, rename, or move a file without explicit user approval.**

Before changing files:

1. Inspect the relevant existing code.
2. Explain the proposed implementation.
3. List **every** file that will be created, modified, deleted, renamed, or moved.
4. Explain the purpose of each file change.
5. Ask for explicit approval.
6. Wait for approval.
7. Modify only the approved files.

If a new file or additional change becomes necessary:

**STOP and ask for approval again.**

Never:

* silently add files
* silently delete files
* silently rename or move files
* perform unrelated cleanup
* refactor unrelated code
* assume approval carries over to another task

---

## Architecture Changes — REQUIRED

Do not change architecture without explicit approval.

This includes:

* application architecture
* authentication architecture
* API architecture
* folder architecture
* service-layer patterns
* database technology
* Prisma architecture
* React Query architecture
* storage architecture
* major architectural dependencies

Before an architectural change:

1. Explain the current architecture.
2. Explain the proposed architecture.
3. Explain why it is needed.
4. List affected files.
5. Ask for approval.
6. Wait for approval.

---

## Dependency Changes — REQUIRED

Never install, remove, upgrade, downgrade, or replace a dependency without explicit approval.

Before changing dependencies:

* Name the package.
* Explain why it is needed.
* Explain its purpose.
* Mention relevant alternatives when useful.
* Ask for approval.
* Wait for approval.

Do not run package installation commands without approval.

---

## Project Architecture

Use Next.js Route Handlers for reusable HTTP APIs.

Design APIs so they can potentially be consumed by:

* Next.js
* React Native
* Flutter
* native mobile clients
* other authorized clients

Keep HTTP concerns separate from reusable business logic.

Use domain-oriented reusable logic under `lib/`, for example:

```text
lib/
├── auth/
├── products/
├── orders/
├── users/
├── payments/
├── cart/
└── ...
```

Do not introduce a new architectural pattern when an existing project pattern already solves the problem.

---

## Data Fetching

Use a server-first approach.

Prefer Server Components and server-side data access when appropriate for:

* performance
* security
* SEO
* initial rendering
* reducing client JavaScript

Use React Query when client-side behavior genuinely benefits from:

* caching
* background refetching
* mutations
* optimistic updates
* polling
* synchronization
* interactive data fetching

When React Query is used, follow the latest stable APIs and project conventions.

---

## Database

Prisma and PostgreSQL are the existing database architecture.

**Never modify the Prisma schema without explicit approval.**

Before proposing schema changes, inspect:

* existing models
* relations
* indexes
* unique constraints
* foreign keys
* cascading behavior
* migration requirements
* affected application code
* concurrency implications

Never create or apply database migrations without approval when the change requires them.

See `skills/database/SKILL.md` for detailed database rules.

---

## Security

Security is a first-class requirement.

Never trust client-controlled data.

Server-side authentication, authorization, validation, ownership checks, and business rules are mandatory.

See `skills/security/SKILL.md` for detailed security rules.

---

## UI

Existing UI stack:

* shadcn/ui
* Tailwind CSS
* Next.js Image

Do not introduce another UI framework without explicit approval.

The application is Persian and RTL.

Every UI change must consider:

* RTL
* Persian text
* responsive behavior
* accessibility
* dark mode
* performance

Use `next/image` instead of normal `<img>` unless there is a specific technical reason.

See `skills/frontend/SKILL.md` for detailed frontend rules.

---

## Code Quality

Before completing an approved task:

* check TypeScript errors
* run relevant linting when applicable
* verify affected functionality
* check for obvious security issues
* check for unintended side effects
* check for unnecessary changes
* follow existing project conventions

Do not disable TypeScript, ESLint, or security checks merely to make the project pass.

---

## Existing Code First

Before implementing:

1. Inspect related code.
2. Understand existing patterns.
3. Reuse existing utilities/services where appropriate.
4. Avoid duplicating functionality.
5. Prefer existing project patterns.

Do not assume an existing implementation is wrong simply because another implementation is possible.

---

## Comments

Do not comment every simple function or constant.

Add comments when necessary to explain:

* complex business logic
* non-obvious security decisions
* concurrency behavior
* unusual workarounds
* important architectural decisions
* complicated algorithms

Comments should explain **why**, not simply **what**.

---

## Scope

Keep changes focused on the requested task.

Do not perform unrelated:

* refactoring
* formatting
* dependency upgrades
* architecture changes
* cleanup
* naming changes

unless explicitly requested and approved.

---

## After Changes

After completing an approved change, explain:

1. What changed.
2. Why it changed.
3. Which files changed.
4. Important implementation details.
5. Security considerations.
6. Tests/checks performed.
7. Remaining concerns or follow-up work.

The goal is not only to change the project, but also to help the user understand the implementation.

---

## Communication

The user may communicate in Persian.

Technical identifiers, APIs, errors, and code may remain in English when clearer.

For significant tasks, do not immediately implement.

Inspect first, explain the plan, list affected files, obtain approval, then implement.

If uncertain whether a change requires:

* a file change
* dependency change
* database change
* architecture change

**STOP AND ASK THE USER FIRST.**
