---

name: backend-api
description: Backend API design and implementation for the miniMarketPlace project. Use when creating or modifying Route Handlers, HTTP APIs, server-side business logic, validation, error handling, data fetching, mutations, or reusable domain services.
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Backend API Skill

## API Architecture

Use Next.js Route Handlers for reusable HTTP APIs.

APIs should be designed so they can potentially serve:

* web clients
* React Native
* Flutter
* native mobile applications
* other authorized clients

Keep HTTP-specific concerns inside the API layer.

Keep reusable business logic outside Route Handlers when appropriate.

---

## Route Handler Responsibilities

A Route Handler should generally handle:

1. Request parsing.
2. Authentication.
3. Authorization.
4. Input validation.
5. Calling reusable business logic.
6. Mapping results to HTTP responses.
7. Error mapping.

Do not put large amounts of reusable business logic directly inside Route Handlers.

---

## Domain Logic

Keep reusable logic organized under `lib/<domain>/`.

Examples:

```text
lib/
├── auth/
├── products/
├── users/
├── cart/
├── orders/
├── payments/
└── ...
```

Keep related:

* services
* validation schemas
* types
* constants
* business rules

organized by domain.

Avoid unnecessary abstraction.

---

## Validation

Use Zod for external input.

Always validate server-side.

Never trust:

* request body
* query parameters
* URL parameters
* form data
* headers
* cookies
* client-provided role
* client-provided price
* client-provided permissions
* client-provided ownership

---

## Error Handling

Use consistent error categories such as:

* validation
* authentication
* authorization
* not found
* conflict
* rate limit
* database
* internal

Do not expose internal implementation details.

Do not expose:

* stack traces
* database errors
* secrets
* tokens
* sensitive implementation details

Map internal errors to safe API responses.

---

## Business Rules

Important business rules must be enforced server-side.

Examples:

* product ownership
* seller permissions
* stock validation
* cart validation
* discount validation
* order transitions
* payment state
* refund rules
* role permissions

Never rely only on UI logic.

---

## HTTP API Design

Keep request and response types explicit.

Use appropriate HTTP status codes.

Do not return more data than the client needs.

Avoid leaking internal database structures unnecessarily.

---

## Data Fetching

Prefer server-side data access when possible.

Use Server Components when they provide an appropriate server-first solution.

Use React Query when the client genuinely needs:

* caching
* background refetching
* mutations
* optimistic updates
* polling
* synchronization
* interactive fetching

Do not use React Query simply because it exists.

---

## React Query

When React Query is appropriate:

* use the latest stable APIs available in the project
* use meaningful query keys
* handle loading states
* handle error states
* handle paused/offline states where relevant
* invalidate/update affected queries after mutations
* avoid unnecessary refetches
* configure caching according to actual data requirements

---

## Performance

For backend/data operations consider:

* pagination
* selective queries
* indexes
* N+1 queries
* unnecessary database requests
* caching
* payload size
* concurrency

Do not fetch data the client does not need.

---

## Before Implementation

Inspect:

* existing API patterns
* authentication flow
* authorization logic
* validation patterns
* domain services
* Prisma queries
* error handling
* existing response formats

Reuse established patterns when appropriate.
