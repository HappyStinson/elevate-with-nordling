# Elevate with Nordling

A personal blog built with Eleventy 3, deployed by Netlify from `main`.

## Layout of the repo

Eleventy's input directory is `content/`, with includes and data pulled from outside it
(see the `config` export at the bottom of `eleventy.config.js`). That means the familiar
`_includes/` and `_data/` live in the repo root, not under `content/`.

- `content/blog/elevate-with-nordling/` — this blog's posts
- `content/blog/happy-kodar/` — posts imported from an older dev blog, rendered through
  `_includes/layouts/happy.njk`, which adds a provenance note
- Both section folders carry an `.11tydata.js` that flattens permalinks to `/blog/<slug>/`,
  so the section name never appears in a URL
- Standalone pages are just files in `content/`; they inherit `layouts/home.njk` from
  `content/content.11tydata.js`, so they need no `layout` in frontmatter
- `_config/filters.js` holds the filters, registered as a plugin

## Conventions worth knowing before you edit

- **Tabs, not spaces**, per `.editorconfig`. The codebase is consistent about it.
- **CSS is inlined, not copied.** Stylesheets live in `css/` and reach the page through
  `<style>{% include "css/thing.css" %}</style>` in whichever layout or include needs
  them; the bundle plugin collects and dedupes. `css/` is *not* passthrough-copied, so a
  `<link>` to it would 404. Only `public/` is copied.
- **Frontmatter is validated.** `_data/eleventyDataSchema.js` runs a zod schema over every
  page's data. Add a field there if you add one to frontmatter, or the build will ignore
  it silently — and malformed existing fields will fail the build loudly, which is the
  point.
- `eleventy.config.drafts.js` and `eleventy.config.images.js` sit in the root but are
  **imported by nothing**, and they're CommonJS. Importing them would crash the build,
  since `package.json` sets `"type": "module"`. Leave them be.

## Running it

Node 18 or newer (`.nvmrc` asks for 24; `engines` says `>=24`, but Eleventy itself only
needs 18). `pnpm install`, then `npm start` to serve or `npm run build` to build.

## House style for prose

American English. The content is consistent about it — *favorite, realize, organize,
behavior*. The British leftovers were swept in November 2026: *favourite*, *neighbour*,
*greyscale*, *cancelled*. Swedish inside `<span lang="sv">` is not a leftover; leave it.

Curly quotes and apostrophes, but **don't type them and don't edit them in**. markdown-it
has `typographer` enabled in `eleventy.config.js`, so `"like this"` renders as `“like
this”` and `don't` as `don’t`. Type whichever is handy; the build settles it.

Two places the build can't reach, because neither is markdown:

- **`title` and `description` front matter.** Rendered as plain strings into `<title>`,
  meta tags and feeds. A straight quote there stays straight and has to be typed curly.
  Curly is also the *safer* character in YAML: a value that **starts** with a straight
  quote is read as a quoted scalar and the parse fails with the unhelpful "bad indentation
  of a mapping entry". `“` and `”` mean nothing to YAML, so they are always plain text.
- **`aiFeedback` `before`/`after`.** Also plain strings. When they quote a passage that
  contains a quote mark, write it curly so the note matches the post above it.

A literal string — a package name, a flag, a path — belongs in backticks, not quotation
marks. `typographer` would otherwise curl its quotes and make it uncopyable.

The AI collaborator on this site is called **Penny Red** — one nickname, one role per
context (`AI copyeditor` on posts, `AI pair programmer` for code), defined once in
`_data/metadata.js`. Use that name rather than inventing another, and don't give it a
second name for a second kind of work: two names read as two collaborators. Credit the
role honestly — the note says copyeditor because copyediting is what happened.

The name has two roots, both explained under "Who Works on This Site" on the about page:
the editor's red pen, and the 1841 British stamp that was printed red so the cancellation
mark on it would stay visible. Keep the order **Penny Red** — reversed it loses the stamp.

Copy review has its own skill: `.claude/skills/copy-review/SKILL.md`, invoked as
`/copy-review`. It splits findings into mechanical fixes it applies directly and
voice-level suggestions it asks about first, requires a citable source for every item, and
records what was applied in the post's `aiFeedback` frontmatter, which feeds both the
note at the foot of the post and the lesson index at `/copy-feedback/`.

## Branches

`main` is the truth and what Netlify deploys. Work in short-lived branches off `main`,
one pull request per change, squash-merge, then delete the branch.

Don't keep a long-lived integration branch. Squash-merging rewrites each branch's commits
into a single new one, so a branch that lives for months ends up sharing no ancestry with
`main` and reads as permanently diverged even when its content has already shipped. That
is exactly what happened to the old `develop` branch, now retired as the tag
`archive/develop`.
