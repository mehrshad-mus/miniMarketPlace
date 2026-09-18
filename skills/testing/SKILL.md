---

name: testing
description: Testing strategy for the miniMarketPlace project. Use when implementing or reviewing authentication, authorization, payments, inventory, orders, business rules, security-sensitive logic, concurrency-sensitive logic, or other critical functionality.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Testing Skill

## Goal

Tests should verify real behavior and important edge cases.

Do not add meaningless tests only to increase coverage.

---

## Required Test Areas

Prioritize tests for:

* authentication
* authorization
* RBAC
* role permissions
* payment flows
* stock/inventory
* order creation
* important business rules
* security-sensitive logic
* concurrency-sensitive logic

---

## Security Tests

Where applicable, test that unauthorized users cannot:

* access protected resources
* modify another user's resources
* escalate privileges
* bypass ownership checks
* manipulate protected values

Consider malicious and unexpected inputs.

---

## Validation Tests

Test important validation boundaries.

Consider:

* missing fields
* invalid types
* invalid formats
* invalid IDs
* unexpected values
* boundary values
* unauthorized input

---

## Business Logic Tests

Important server-side rules should be tested independently where practical.

Examples:

* stock cannot become invalid
* invalid discounts are rejected
* unauthorized sellers cannot modify another seller's data
* invalid order transitions are rejected
* payment state cannot be forged

---

## Concurrency Tests

For concurrency-sensitive operations, consider tests for simultaneous requests.

Important areas:

* inventory
* stock reduction
* coupon usage
* order creation
* payment processing

Verify that race conditions cannot violate important business rules.

---

## Test Quality

Tests should:

* verify actual behavior
* cover important edge cases
* be deterministic
* avoid unnecessary duplication
* fail for meaningful regressions

Do not weaken production validation merely to make tests pass.

---

## Before Completing a Task

Run relevant tests when available.

Also check:

* TypeScript
* linting where applicable
* affected functionality
* security-sensitive behavior

If tests cannot be run, explain why.
