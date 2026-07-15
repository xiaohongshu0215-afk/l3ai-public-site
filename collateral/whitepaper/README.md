# L3AI Public Whitepaper v2.0

Production public whitepaper editions are shipped as independent language versions. Do not use a mixed English / Chinese public page as the customer-facing entry.

The v2.0 edition replaces the earlier placeholder-style whitepaper with a full product narrative, high-contrast L3AI dark visual system, and unique chapter content for AI trading intelligence, AI asset experience, compute participation, Universe, trust architecture, roadmap, risk boundaries, and FAQ.

## Current Public Editions

- `L3AI_Public_Whitepaper_v1.en.html`
- `L3AI_Public_Whitepaper_v1.en.pdf`
- `L3AI_Public_Whitepaper_v1.zh-CN.html`
- `L3AI_Public_Whitepaper_v1.zh-CN.pdf`

The filenames remain `v1` for stable public URLs. The document title and internal footer identify the current whitepaper as v2.0.

## Public Rule

Mixed-language whitepaper files are no longer part of the public website package. Public website, sitemap and launch-library links should point only to the independent English or Chinese editions above.

## Regeneration

Run:

```bash
node scripts/build-public-whitepaper-v2.mjs
```

The script regenerates both HTML and PDF editions using the same content model, so future edits should be made in the script instead of manually editing the generated PDF.
