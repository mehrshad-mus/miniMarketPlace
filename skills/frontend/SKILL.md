---

name: frontend
description: Frontend implementation for the Persian RTL miniMarketPlace using Next.js, React, shadcn/ui, Tailwind CSS, React Query, and next/image. Use when creating or modifying pages, components, layouts, forms, client interactions, loading states, responsive UI, or animations.
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Frontend Skill

## UI Stack

Use the existing UI stack:

* Next.js
* React
* shadcn/ui
* Tailwind CSS
* next/image

Do not introduce another UI framework without explicit approval.

Avoid unnecessary frontend dependencies.

---

## Server vs Client

Prefer Server Components when possible.

Use Client Components when the UI genuinely requires client-side behavior such as:

* state
* browser APIs
* event-driven interaction
* client-side subscriptions
* React Query
* interactive animations

Do not convert Server Components to Client Components without a reason.

---

## React Query

Use React Query only when client-side data behavior benefits from it.

When used:

* use the latest stable APIs available in the project
* handle loading
* handle errors
* handle paused/offline states where relevant
* use proper query keys
* invalidate/update affected queries
* avoid unnecessary refetching
* configure caching intentionally

---

## RTL

The application is Persian and RTL.

Every UI change must preserve RTL behavior.

Consider:

* alignment
* spacing
* icons
* directional animations
* forms
* navigation
* dropdowns
* dialogs
* tables
* responsive layouts

Prefer logical CSS properties when appropriate instead of hard-coded left/right assumptions.

---

## Persian UI

Use appropriate Persian text.

Consider:

* Persian dates
* Persian numbers where appropriate
* currency formatting
* text direction
* typography
* mixed Persian/English content

---

## Dark Mode

Every UI change must work in dark mode.

Check:

* text contrast
* backgrounds
* borders
* cards
* inputs
* dialogs
* dropdowns
* hover states
* disabled states
* images
* overlays

Do not build a component that only works correctly in light mode.

---

## Responsive Design

Consider:

* mobile
* tablet
* desktop
* different viewport widths
* touch interaction

Do not optimize only for desktop.

---

## Accessibility

Consider:

* semantic HTML
* keyboard navigation
* focus states
* labels
* accessible buttons
* dialog accessibility
* sufficient contrast
* meaningful alt text

Do not sacrifice accessibility for visual effects.

---

## Images

Use `next/image` instead of normal `<img>` unless there is a specific technical reason.

Consider:

* correct dimensions
* responsive sizing
* image optimization
* loading behavior
* appropriate `alt`
* remote image configuration where necessary

---

## Performance

Avoid:

* unnecessary Client Components
* unnecessary JavaScript
* unnecessary rerenders
* oversized images
* unnecessary network requests

Consider:

* Server Components
* image optimization
* lazy loading
* caching
* React Query cache configuration

Do not optimize prematurely, but avoid obvious performance problems.

---

## Animations

Animations should improve the user experience rather than create unnecessary complexity.

Consider:

* performance
* reduced-motion preferences
* mobile performance
* layout shifts
* unnecessary rerenders

Do not introduce a new animation library without approval.

---

## Existing Components

Before creating a new component:

1. Search for an existing reusable component.
2. Check shadcn/ui components.
3. Follow existing project patterns.
4. Avoid duplicating functionality.

Do not introduce a new UI pattern when an existing one is appropriate.
