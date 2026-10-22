# Luis Beltran Jr. — Portfolio

An Astro portfolio with locally hosted Bodoni Moda and Jost type, plain CSS, and
small TypeScript enhancements. All content pages are generated at build time;
only the AI chat endpoint runs on the server. No React or Next.js runtime is needed.

## Run locally

Use Node.js 24 LTS and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4321. No credentials are needed to view the portfolio.
Astro 7 may start its development server as a background process; use
`npx astro dev stop` to stop it.

```sh
npm run typecheck
npm run test:security
npm run audit
npm run build
```

The build checks all Astro and TypeScript files and creates Vercel Build Output
in `.vercel/output/`. Use `npm run preview` for local build previews when supported
by the adapter; `npm run dev` supports the full site and server endpoint locally.

## Hosting and deployment

- Repository: https://github.com/lbelt567/Portfolio (`main`).
- Existing live domain: https://www.luisbeltranjr.com.
- Existing Vercel alias: https://portfolio-lilac-one-85.vercel.app.
- `astro.config.mjs` uses the official Vercel adapter with a 30-second function
  limit. A build finalizer copies all security policies into Vercel Build Output. `vercel.json` declares the Astro framework
  and security headers for all paths.
- Pushing to the connected `main` branch triggers the Vercel production deployment.
- Vercel must use Node.js 24. If the project's dashboard overrides the framework,
  select Astro and the build command `npm run build`; remove old Next.js overrides.
- Hosting credentials, DNS settings, and firewall rules were not changed.

## Content editing

| Content | Edit |
| --- | --- |
| Contact details | `src/lib/profile.ts` |
| Home layout and introductions | `src/pages/index.astro` |
| Experience, education, skills, ventures | `src/lib/experience.ts` |
| Project case studies and metrics | `src/lib/projects.ts` |
| Unified home project list and preview fields | `src/lib/portfolio.ts` (derived from projects and ventures) |
| Short project descriptions and lab experiments | `src/lib/site.ts` |
| Blog posts in Markdown | `src/lib/blog.ts` |
| Assistant's professional context | `src/lib/resume-context.ts` (derived from the shared profile, experience, project and skills data) |
| Navigation and footer | `src/components/Header.astro`, `src/components/Footer.astro` |
| Colors, spacing, typography, responsive layouts | `src/styles/global.css` |
| Metadata and shared page structure | `src/layouts/Layout.astro` |

Existing routes remain: `/experience`, `/stack`, `/lab`, `/blog`, all five
`/projects/[slug]` case studies, and the existing blog URL. About precedes the unified `#projects` section, which includes both case studies
and the website/business projects in one eight-item selector with a shared image preview.
Contact is the `#contact` section on the home page.
The previous `#work` anchor remains available for existing links. `robots.txt`, `sitemap.xml`, and a custom 404 are included.

Original pictures remain in `public/`; compressed WebP versions in `public/images/`
are used by the redesign. Font license notices are in `public/licenses/`.
The research portrait leads the home page. The Polymarket preview is a labeled
architecture diagram drawn from the supplied resume, not an application screenshot.
Preserve the original project screenshots and research portrait when updating assets.

Verify availability, current employment, GPA, revenue and project status with Luis
before changing factual claims. Venture revenue is labeled as reported revenue.
The Snatched House uses the owner-provided CloudFront URL while its custom domain is inactive. The assistant context reads the same profile, education, experience, projects, and
skills data as the pages, so these facts stay synchronized automatically.

## AI assistant and security

The dialog works without a frontend framework and supports keyboard dismissal and
focus restoration. Add `ANTHROPIC_API_KEY` to ignored `.env.local` for local chat;
configure the server-only variable in Vercel for each required environment.
Never prefix it with `PUBLIC_`, expose it in browser code, or commit real secrets.
With no key, the endpoint returns 503 and the interface provides a contact fallback.

The hardened handler is `src/lib/chat.ts`; `src/pages/api/chat.ts` adapts it to
Astro. It limits request bytes, conversation size, allowed parts, output tokens,
retries and execution time. Regression tests make no paid AI requests. Markdown
blog output is sanitized before rendering. Security headers are applied locally
by middleware and copied from `vercel.json` into Vercel’s generated static configuration
by `scripts/finalize-vercel.mjs`.

The dependency override keeps Vercel routing's `path-to-regexp` on the patched
6.3.x line without downgrading the Astro adapter. Weekly Dependabot configuration
is included. Audit status is documented in [the security review](docs/SECURITY_REVIEW.md).
Anonymous chat still needs distributed rate limiting and provider spending controls
before a production rollout; the prior review's limitation remains.

[Design direction](docs/design/DIRECTION.md) and [visual critique](docs/design/CRITIQUE.md)
record the redesign rationale and checks.


## Replacing images

You can attach updated images in the conversation (paperclip or drag and drop).
Label which photo or project each file replaces; the agent can optimize and wire them.

For direct local editing, copy JPG, PNG or WebP files into `public/images/`.
Use the browser path `/images/filename.jpg`, not `/public/images/filename.jpg`.
- Project image: set `heroImage` in `src/lib/projects.ts` to that exact path.
- Business website image: set `heroImage` on its venture in `src/lib/experience.ts`.
- Profile photo: replace `public/images/profile-research.webp` with an actual WebP,
  or update its references in `src/pages/index.astro`, `src/layouts/Layout.astro`
  and the Tauroi entry in `src/lib/projects.ts` to your new file path.
- Blog image: original post data is in `src/lib/blog.ts`; the current article artwork
  is rendered from `/images/anthropicacademy.webp` in the home and blog templates.

Keep filenames lowercase and descriptive. Converting to WebP and resizing large
images before publishing keeps downloads small. Merely renaming a JPG to `.webp`
does not convert it. Images remain local until the portfolio is deployed.

Leather Corral's current link is https://wholesale.leathercorral.com/. The case study
keeps the historical WordPress work and makes clear that the live site is on Framer
while the e-commerce upgrade is in progress.
