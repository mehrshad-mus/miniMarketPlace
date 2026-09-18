---

name: security
description: Security-focused implementation and review for the miniMarketPlace project. Use when working on authentication, authorization, RBAC, ownership, APIs, cookies, tokens, user input, payments, files, private resources, rate limiting, or security-sensitive business logic.
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Security Skill

## Goal

Treat security as a first-class requirement in every security-sensitive implementation.

Never trust client-controlled data.

---

## Authentication

For protected operations:

1. Authenticate the request.
2. Determine the server-side user identity.
3. Check authorization.
4. Check resource ownership when applicable.
5. Perform the operation.

Authentication and authorization are separate concerns.

Never treat the client as the source of truth for identity.

---

## Authorization

Authorization must be enforced on the server.

Never rely on:

* hidden UI elements
* disabled buttons
* client-side role checks
* client-provided permissions
* client-provided ownership

A user hiding a button does not protect the underlying API.

Always verify permissions server-side.

---

## RBAC

Never trust a role supplied by the client.

Use the authenticated user's trusted server-side role.

Check permissions at the point where the protected operation is performed.

Consider:

* privilege escalation
* role bypass
* horizontal access
* vertical access

---

## Ownership

For user-owned resources, verify ownership server-side.

Be alert for IDOR vulnerabilities.

Never assume that having an ID means the requester has access to the resource.

---

## Input Validation

Treat all external input as untrusted.

Validate on the server using Zod.

Validate:

* request bodies
* URL parameters
* query parameters
* form data
* cookies
* headers
* uploaded files

Client-side validation is for UX.

Server-side validation is required for security.

---

## Sensitive Data

Never expose:

* secrets
* tokens
* passwords
* OTP codes
* database internals
* stack traces
* private implementation details
* sensitive user information

Return safe, meaningful errors to clients.

Keep sensitive debugging information server-side.

---

## API Security

For every protected endpoint consider:

* authentication
* authorization
* ownership
* input validation
* rate limiting
* data exposure
* replay attacks
* injection
* CSRF where applicable

Never trust values such as:

* price
* stock
* discount
* role
* permission
* payment status

Verify important values against trusted server/database state.

---

## Marketplace Security

For marketplace operations, never trust client-provided:

* product price
* offer price
* stock
* discount
* seller identity
* payment status
* order status
* ownership

The server/database must determine authoritative values.

---

## File Uploads

When handling uploads, consider:

* file type validation
* file size limits
* filename handling
* storage access control
* malicious file content
* private vs public resources
* authorization before serving private files

Never assume a file is safe because its extension looks valid.

---

## Authentication Tokens and Cookies

When working with authentication:

* protect tokens
* avoid unnecessary exposure to JavaScript
* use secure cookie settings where appropriate
* consider expiration
* consider replay attacks
* never log secrets or tokens

Inspect the existing authentication architecture before changing it.

Authentication architecture changes require explicit user approval.

---

## Rate Limiting

Consider rate limiting for abuse-sensitive operations such as:

* OTP requests
* login/authentication
* password/reset flows
* expensive APIs
* payment endpoints
* public endpoints vulnerable to abuse

Consider brute-force protection.

---

## Race Conditions

Security-sensitive operations may be affected by concurrent requests.

Consider:

* atomic database operations
* transactions
* constraints
* idempotency
* locking strategies

Do not assume sequential execution.

---

## Security Review Checklist

Before completing a security-sensitive task, check:

* Authentication
* Authorization
* RBAC
* Ownership
* IDOR
* Privilege escalation
* Input validation
* Injection
* XSS
* CSRF where applicable
* Sensitive data exposure
* Cookie/token security
* Rate limiting
* Brute force
* Race conditions
* Replay attacks where relevant
* Payment manipulation
* Price manipulation
* Stock manipulation
* File upload security
* Private resource access

If a security decision is non-obvious, explain **why** it is necessary in the code or final explanation.
