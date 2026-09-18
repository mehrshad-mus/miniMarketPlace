---

name: database
description: Database and Prisma implementation/review for the miniMarketPlace project. Use when working with Prisma schema, PostgreSQL models, relations, queries, indexes, constraints, transactions, migrations, inventory, orders, payments, or concurrency-sensitive database operations.
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Database Skill

## Database

The project uses:

* PostgreSQL
* Prisma

Follow the existing Prisma architecture.

Do not replace the database technology without explicit approval.

---

## Schema Changes

**Never modify the Prisma schema without explicit user approval.**

Before proposing a schema change:

1. Inspect the existing schema.
2. Identify affected models.
3. Inspect relations.
4. Inspect indexes.
5. Inspect unique constraints.
6. Inspect foreign keys.
7. Inspect cascade behavior.
8. Check application code depending on the models.
9. Consider data migration requirements.
10. Consider concurrency implications.

Then explain the proposed change and request approval.

---

## Migrations

Do not create or apply migrations for schema changes without approval.

Before a migration, explain:

* what changes
* why it is needed
* affected models
* possible data impact
* whether existing data requires migration
* possible downtime or compatibility concerns

---

## Relations

Before changing relations, consider:

* required vs optional relationships
* foreign keys
* cascading deletes
* orphan records
* uniqueness
* referential integrity
* existing application behavior

Do not casually change relation behavior.

---

## Constraints

Prefer database-level guarantees for important invariants where appropriate.

Consider:

* unique constraints
* composite unique constraints
* foreign keys
* check constraints where supported
* indexes
* nullable/non-nullable fields

Do not rely only on application-level validation for invariants that the database should enforce.

---

## Transactions

Use transactions when multiple database operations must succeed or fail together.

Consider transactions for:

* order creation
* payment state changes
* inventory changes
* related record creation
* other atomic business operations

Do not use transactions blindly; keep them focused.

---

## Concurrency

Assume important operations may receive concurrent requests.

Examples:

* stock reduction
* inventory reservation
* coupon usage
* cart updates
* order creation
* payment processing

Never assume:

```text
read value
→ check value
→ update value
```

is automatically safe.

Consider:

* atomic updates
* transactions
* database constraints
* locking
* idempotency

---

## Inventory

Never trust client-provided stock.

Verify inventory against trusted database state.

Stock-changing operations must account for concurrent requests.

Avoid overselling caused by check-then-update race conditions.

---

## Payments and Orders

Payment and order state must be controlled by trusted server/database logic.

Never trust the client to determine:

* payment success
* order status
* final price
* stock
* discount
* seller
* ownership

Design state transitions carefully.

---

## Query Performance

Consider:

* appropriate indexes
* pagination
* selective fields
* avoiding N+1 queries
* avoiding unnecessary joins/includes
* query frequency
* payload size

Do not load entire records when only a subset is needed.

---

## Prisma Client

Follow the existing Prisma client configuration and generated client structure.

Do not change Prisma generation/configuration architecture without approval.

When changing database access code, inspect existing patterns first.
