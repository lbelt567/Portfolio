# Security review — October 22, 2026

## Scope and evidence

Reviewed application source, all six commits reachable from local Git refs
(69 historical text blobs), public deployment metadata, GitHub secret-scanning
alert statuses, live HTTP headers, and npm lockfile advisories. No paid AI calls
or exploit attempts were sent to production. This review cannot establish that
no vulnerabilities exist.

- No tracked environment, private-key, or Vercel credential files were found.
  No local environment files were present.
- Pattern scans found no provider tokens, private keys, JWTs, credential
  assignments, or credential-bearing database URLs in historical text blobs.
  GitHub's secret-scanning alerts endpoint returned an empty list. Patterns can
  miss unrecognized credentials. Unreachable objects, unfetched branches, other
  repositories, and private hosting settings were outside scope.
- Chat uses Anthropic from a server route; source does not expose its key to the
  browser. Hosting environment values were not retrieved. Resume contact links
  and email are intentional public content.
- HTTPS and Vercel hosting were confirmed for the custom domain and project alias.
  The two home pages shared an ETag. Vercel supplies HSTS. Security headers present
  on the chat route were missing from live page responses. Chat HEAD returned 405.

## Dependency remediation prepared locally

Initial npm audit: **33 affected packages: 2 critical, 18 high, 6 moderate, 7 low**.
These counts include transitive packages, not independently exploitable defects.

- Updated Next.js 16.2.1 to 16.4.2 and compatible affected dependencies, including
  the AI SDK. The old framework matches critical advisories for
  [AVIF image optimization](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4)
  and [next/og ImageResponse](https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j).
  Exploitability depends on inputs and hosting conditions. The app enables AVIF
  output; its favicon uses fixed ImageResponse content without user input.
  This is not evidence of compromise.
- Removed the vulnerable shadcn generator CLI dependency chain. Its only app import
  was CSS, preserved locally with the MIT notice; components were not downgraded.
- Added a scoped override for patched `postcss-selector-parser` 7.1.7 or later
  under Tailwind Typography, instead of the audit's proposed old Typography downgrade.
- Added weekly Dependabot configuration; this takes effect after pushing to the
  default branch. GitHub account/repository settings were not changed.

Final local npm audit: **0 known vulnerabilities** on the review date.

Validation: TypeScript checking and all 14 security regression cases passed.
The final production build passed using `npm run build -- --webpack`.
Default Turbopack verification was blocked by the environment's worker-port
restriction. The build retains a pre-existing warning about missing `metadataBase`
for social image URLs; address it during the content/SEO refresh.

## Application hardening prepared locally

- Added nosniff, frame denial, referrer and permissions policies on all paths.
  A limited CSP blocks objects, foreign base URLs, and framing; it does not claim
  comprehensive script injection prevention. Disabled X-Powered-By.
- Chat rejects foreign/missing browser origins and non-JSON requests. Actual
  request bytes are capped at 32 KiB, including missing/dishonest Content-Length.
  It accepts 1–20 messages, text-only parts of up to 4,000 characters, and no
  client-supplied system roles, files or tool parts. Rejecting files also prevents
  the adapter from fetching arbitrary client-supplied attachment URLs.
- Model output is capped at 512 tokens, retries disabled, and generation cancelled
  after 25 seconds or request abort. Missing configuration returns a generic 503.
  Chat responses are not cached; the UI has a contact fallback.
- Removed the deprecated Edge runtime override, following the upgraded Next.js
  bundled guide; chat now uses the supported default Node.js runtime.
- Fourteen regression cases exercise the actual handler with the Anthropic key
  removed, without paid provider calls.

## Outstanding production work

1. **Anonymous AI usage remains a cost-abuse risk.** Scripts can forge Origin.
   Per-request limits do not cap total spend. Configure a distributed rate limiter
   or Vercel firewall rule for POST /api/chat, plus provider spending controls.
   No durable limiter is present; hosting/provider controls were not inspected.
   A process-local map would not protect across serverless instances.
2. Review server-only Vercel environment names, scopes and access without sharing
   values. Rotate the Anthropic key if a separate account review shows exposure.
3. Deploy the reviewed patch and verify production versions, page headers, normal
   browser chat streaming and rejection behavior. The live site remains on the old
   code until deployment. No deployment was performed by this review.
4. Full browser interaction/accessibility checks and visual redesign remain separate
   work. Current professional claims have been inventoried and preserved.

## Astro migration follow-up — October 22, 2026

The subsequent redesign replaces Next.js/React/Tailwind with Astro 7, plain CSS,
and small TypeScript enhancements. The previous Next.js-specific patch details
above describe the audit history; they are not the current application stack.

- All portfolio content routes are prerendered. The hardened handler now lives
  in `src/lib/chat.ts`; `src/pages/api/chat.ts` is its on-demand Astro wrapper.
- The same 14 security regression cases pass against the migrated handler.
- Security middleware applies the original response policies locally, and `scripts/finalize-vercel.mjs` copies the complete policy from root
  `vercel.json` into generated Vercel Build Output for every path. The adapter's
  staticHeaders implementation was inspected and only exports framework CSP, so
  the explicit finalizer preserves all five security policies for static outputs.
- Markdown is sanitized before HTML rendering. Fonts are hosted locally. No
  hosting credentials were retrieved and no new credentials were added.
- A scoped override upgrades Vercel routing's path-to-regexp dependency to patched
  6.3.x. Final Astro dependency audit reports **0 known vulnerabilities**.
- Astro checking reports no errors, warnings or hints; the Vercel production build
  succeeds. Generated chat function metadata declares Node.js 24, streaming support,
  and a 30-second maximum duration.
- Chrome checks pass for project selection, all 11 linked/internal output routes,
  mobile navigation, every content page's mobile layout, reduced motion, no-script
  navigation, custom 404, and chat failure handling without paid model requests.
- Desktop, tablet and phone screenshots were reviewed; visual inspection reports
  no failures at 1440, 768 and 390 pixels. This is not a comprehensive accessibility
  certification or an independently verified successful provider chat response.

No deployment was performed. Production environment scopes, Vercel dashboard
framework overrides, provider spending controls and distributed rate limiting
remain to be verified/configured before the production rollout.
