# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal site (pixeldigit.com): public blog, guestbook, contact form and Spotify widget, plus two private areas — `manageit` (admin CMS for posts and media) and `diary` (personal notes/expense tracker). Next.js (Pages Router), plain JavaScript, Chakra UI, Prisma on PostgreSQL, NextAuth. Deployed on Vercel.

## Commands

Node version is pinned in `.nvmrc` (v18). Yarn is the package manager (`yarn.lock`).

```bash
yarn dev            # dev server on http://localhost:3000
yarn build          # runs `prisma generate` then `next build`
yarn lint           # next lint
npx prisma migrate dev --name <name>   # after editing prisma/schema.prisma
npx prisma generate                    # regenerate client without migrating
npx prisma studio                      # browse the DB
```

There is no test suite. Copy `.env.sample` to `.env` for local setup; it lists every required variable (DB, Google/GitHub OAuth, NextAuth secret, AWS S3, reCAPTCHA, SendGrid, Spotify).

Prettier: no semicolons, 2-space indent, 100-char lines, trailing commas.

## Architecture

- **Routing**: everything lives in `pages/` (Pages Router). `app/layout.js` is a bare root layout; no routes use the App Router.
- **DB access**: always import the singleton from `util/db.js` (`import { prisma } from ".../util/db"`). Pages query Prisma directly in `getStaticProps`/`getServerSideProps`; client components call `pages/api/*`.
- **Auth**: `pages/api/auth/[...nextauth].js` exports `authOptions` (Google + GitHub, Prisma adapter, database sessions). The session callback adds `session.userId` and `session.isAdmin` (from `User.isAdmin`). Server code reads the session with `getServerSession(req, res, authOptions)`.
  - Admin pages (`pages/manageit/*`) check `session.isAdmin` in `getServerSideProps` and redirect if it isn't set.
  - Admin API routes (`pages/api/manageit/*`, `api/diary`) only check that a session exists, not `isAdmin`.
- **Post content**: posts are written with a Slate editor (`components/manageit/RichText*`, `EditorTheme`) and stored as Slate JSON in `Post.details`. `components/RenderContents.js` turns that JSON into Chakra elements on the public blog. **Any new block type added to the editor also needs a case in `RenderContents`**, or it won't show up on the public site.
- **Blog rendering**: `pages/blog/index.js` and `pages/blog/[slug].js` use ISR (`revalidate: 10`, `fallback: true`). Category pages use SSR with `Cache-Control` headers.
- **View/like counters**: `api/post-update-fields` increments `Post.views`/`likes`. It uses the `Tracker` table (by IP, one-hour window) to skip repeat views.
- **Media**: `api/manageit/manage-s3` uses a `?action=` query param (`upload` | `getFiles` | `deleteFile`). Upload returns an S3 presigned POST and records a `Media` row. Delete removes the S3 object and then the row. `next.config.js` allows images from `s3.amazonaws.com`.
- **Guestbook**: `api/guestbook` saves a `GuestBook` entry and sends a SendGrid email. reCAPTCHA verification is written but commented out, so `captchaScore` is always `"0"`.
- **Styling**: `theme/index.js` + `ChakraProvider` in `pages/_app.js`, with fonts from `@fontsource`.

## Known caveats

- Chakra UI is v2 (`extendTheme`, `useColorModeValue`, `Modal`, `useToast`, etc.). Don't use v3 APIs.
- `yarn build` needs a reachable `DATABASE_URL`, because `getStaticPaths`/`getStaticProps` query Prisma at build time.
- `next build` runs lint, so any lint error fails the build. `yarn lint` is currently at 0 errors.
- Never call `useColorModeValue` inside `.map()`, a loop, or after an early return. Call it once at the top of the component, or use `useColorMode()` and pick the value from `colorMode`, as `components/diary/*` does.
- `keyframes` comes from `@emotion/react`, not `@chakra-ui/react`.
