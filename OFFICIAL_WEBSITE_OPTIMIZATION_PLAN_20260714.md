# L3AI Official Website Optimization Plan

Date: 2026-07-14

## Current Issue

The public GitHub Pages site exposed internal source-copy pages as if they were the official website. A visitor could open:

`/web/zh-CN/documents/website-copy-l3ai-customer-website-copy-081.zh-CN.html`

and see document-source language such as `L3AI 公开官网文案` and `L3AI Customer Website Copy`. This made the site feel like a document repository instead of a normal enterprise website.

## Immediate Fixes Completed

1. Rebuilt the English homepage as a polished enterprise-facing landing page:
   - `index.html`
   - Focus: AI-native digital world, platform value, AI capability, ecosystem, trust boundary.

2. Added a formal Chinese homepage:
   - `zh-CN.html`
   - Focus: AI 原生智能数字世界, AI 辅助组织信息, 用户路径, 安全边界.

3. Changed the old source-copy pages into noindex archive redirect pages:
   - `web/en/documents/website-copy-l3ai-customer-website-copy-081.en.html`
   - `web/zh-CN/documents/website-copy-l3ai-customer-website-copy-081.zh-CN.html`

4. Cleaned customer-facing links:
   - `faq.html`
   - `get-started.html`
   - `resources.html`
   - `sitemap.html`
   - Secondary document pages under `marketing/`, `media/`, and `pitch/`.

5. Search and discovery controls:
   - Updated `robots.txt` to keep internal source directories out of search indexing.
   - Rebuilt `sitemap.xml` with only formal public pages.

## New Website Information Architecture

The public website should be organized around customer understanding, not file inventory.

1. Home
   - First impression, positioning, and primary value.

2. Product System
   - Product overview, AI workflow, ecosystem, business model, roadmap.

3. Trust
   - Boundaries, security language, risk-aware communication.

4. Resources
   - Curated downloads and materials, not raw source documents.

5. Contact / Partner Review
   - Business and cooperation entry.

## Content Rules Going Forward

Public pages should not expose internal production wording such as:

- `website copy`
- `public launch materials`
- `source section`
- `manifest review path`
- `internal source draft`

Public pages should use customer-facing wording:

- `official website`
- `product system`
- `AI-native digital world`
- `AI-assisted context`
- `risk-aware participation`
- `public resources`

## Visual Direction

The website should continue moving toward:

- dark premium enterprise technology style
- clear hero proposition
- product and ecosystem modules
- fewer long document paragraphs
- stronger visual hierarchy
- more screenshots or polished concept visuals
- concise CTA structure

Avoid:

- document cover cards
- raw outline copy
- file-list-first pages
- oversized resource inventory on the homepage
- legal or internal wording in hero areas

## Next Optimization Sprint

Recommended next steps:

1. Replace the current hero image with a dedicated L3AI enterprise-grade website hero.
2. Add a product visual section that shows the real product modules at a high level.
3. Redesign Resources as a curated media center with 6 to 8 priority cards.
4. Add a Partner / Media / User path selector.
5. Create a dedicated Chinese public navigation system instead of mixing source exports.
6. Add a build-time link checker to prevent public links to `/web/`, `/marketing/`, `/media/`, `/pitch/`, and `/video/` source HTML pages.

## Deployment Note

Before pushing to GitHub Pages, verify:

- `/` opens the new English homepage.
- `/zh-CN.html` opens the new Chinese homepage.
- The old `website-copy` HTML URLs redirect and are marked `noindex`.
- `sitemap.xml` contains only public pages.
- `robots.txt` disallows internal source directories.

