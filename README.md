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

## Search, event, and photo metadata

- `lib/workshopDates.js` is the source for the supported yearly date ranges, calendar downloads. Calendar events are all-day; individual session times remain in the schedule in America/New_York. The final workshop day is included.
- Year-page titles, descriptions, sharing cards, and `CollectionPage`/`ItemList` structured data promote student work. The workshop is private and students-only; there is no public event/registration promotion or homepage workshop-details section. The optional `/{year}/calendar` download is marked private.
- `/sitemap.xml` lists CMS year pages, story archives, and stories, and refreshes hourly. `/robots.txt` points to it. Search-result pages have `noindex` and canonical links to their unfiltered archive. Submit the sitemap in the site's Google Search Console property after deployment.
- Story publication/update timestamps come from WordPress `dateGmt` and `modifiedGmt`. Student relationships supply story authors; those authors are never automatically assigned copyright ownership or photo credit.
- Keep descriptive photo alt text and editorial captions in their separate WordPress fields. Missing alt text is not replaced with a guessed scene description. Gallery and still-photo captions are displayed as plain text, with semantic figure captions.
- For verified image-specific rights information, add entries in `lib/photo-rights.json`, keyed by the exact image `sourceUrl` returned by WordPress (including any resized filename). Supported fields: `creditText`, `copyrightNotice`, `license` (absolute HTTPS license URL), and `acquireLicensePage` (absolute HTTPS licensing contact URL). These appear in captions and Article/ImageObject structured data. Leave fields absent until approved; do not infer the rights holder from the university footer or story byline.
- The optional calendar location is corroborated by Syracuse University's Newhouse place listing: https://events.syracuse.edu/newhouse-1. No individual attendance or accessibility contact is invented.

After deployment, inspect a year page and story in Search Console, verify shared-link previews, and validate Article JSON-LD with Google's Rich Results Test. Search engines determine indexing and search presentation.
