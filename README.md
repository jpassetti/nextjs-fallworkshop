# Next.js Fall Workshop Site

This site runs on the App Router with:

- Next.js 16
- React 19
- TypeScript tooling (`tsc --noEmit`)
- ESLint 9 + `eslint-config-next` (flat config)

## Requirements

- Node.js 20.9+ (see `engines` in [package.json](/Users/jpassetti/Sites/nextjs-fallworkshop/package.json))

## Scripts

- `npm run dev` – start the local dev server
- `npm run build` – create a production build
- `npm run start` – start the production server
- `npm run lint` – run ESLint
- `npm run typecheck` – run TypeScript checks
- `npm run health` – run lint + typecheck + production build + production high-severity audit
- `npm run health:full` – run full health plus dev-dependency audit + outdated package report

## Components structure

Components are now organized by responsibility in [components/](/Users/jpassetti/Sites/nextjs-fallworkshop/components):

- [components/primitives/](/Users/jpassetti/Sites/nextjs-fallworkshop/components/primitives) — reusable UI building blocks
- [components/layout/](/Users/jpassetti/Sites/nextjs-fallworkshop/components/layout) — app shell and navigation
- [components/sections/](/Users/jpassetti/Sites/nextjs-fallworkshop/components/sections) — page sections and composite blocks
- [components/stories/](/Users/jpassetti/Sites/nextjs-fallworkshop/components/stories) — story-specific components
- [components/people/](/Users/jpassetti/Sites/nextjs-fallworkshop/components/people) — people/faculty/coaches UI
- [components/media/](/Users/jpassetti/Sites/nextjs-fallworkshop/components/media) — image/video/gallery components

Import components using the `@/` alias configured in [tsconfig.json](/Users/jpassetti/Sites/nextjs-fallworkshop/tsconfig.json) (for example: `@/components/primitives/Heading`).