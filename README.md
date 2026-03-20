# Strategy Walkthrough

This repo is a small Vite + React exercise designed for refactoring practice.

The app intentionally contains an anti-pattern: a child component fetches data from multiple public APIs with different response shapes and normalizes them into one UI model by using repeated conditional logic.

The intended prompt for developers is:

> Clean up this code without using `if/else` blocks, ternary operators, or `switch` statements.

## What The App Does

The UI lets a user choose between two related public APIs:

- `The Cat API` for random cat images
- `Dog CEO` for random dog images

The parent component owns the selected API mode and passes it into a child component. The child component:

- builds the request URL based on the selected mode
- fetches data from the selected API
- parses two different response contracts into one shared shape
- renders a simple result card with an image and source link

## Why This Exists

This is not meant to be the clean solution. It is meant to be the starting point for a strategy-pattern-style refactor.

The current implementation in [`src/components/ApiViewer.tsx`](/Users/nirmal/misc/codex/260319-strategy-walkthrough/src/components/ApiViewer.tsx) intentionally repeats branching logic in multiple places:

- endpoint selection
- response parsing
- fallback handling

That makes it a good candidate for replacing conditionals with a mode-to-strategy mapping.

## Current Structure

- [`src/App.tsx`](/Users/nirmal/misc/codex/260319-strategy-walkthrough/src/App.tsx) holds the API picker and passes the selected mode down
- [`src/components/ApiViewer.tsx`](/Users/nirmal/misc/codex/260319-strategy-walkthrough/src/components/ApiViewer.tsx) contains the anti-pattern fetch-and-parse logic
- [`src/styles.css`](/Users/nirmal/misc/codex/260319-strategy-walkthrough/src/styles.css) keeps the presentation intentionally simple

## Refactor Goal

Developers should be able to refactor the fetching logic so that:

- `apiMode` is read once
- request construction is decoupled from rendering
- parsing is delegated per API contract
- the final rendered data still conforms to one shared shape
- the solution avoids `if/else`, ternaries, and `switch`

Type safety is a useful bonus target.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Notes

- The design is intentionally minimal so the exercise stays focused on data-shape normalization and control flow refactoring.
- The public APIs were chosen because they are thematically related and return similar user-facing content with different response contracts.
