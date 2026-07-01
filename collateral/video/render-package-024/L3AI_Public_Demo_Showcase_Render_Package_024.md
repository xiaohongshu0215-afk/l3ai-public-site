# L3AI Public Demo Showcase Render Package 024

Status: render-ready external package  
Task: PUBLIC-DEMO-024  
Target duration: 120 seconds  
Aspect ratio: 16:9  
Resolution: 1920 x 1080  

## Purpose

This package prepares a finished production brief for an external editor or rendering environment. It uses real public UI screenshots and approved public visuals from the L3AI public site.

The rendered MP4/MOV is not claimed as complete because the local execution environment does not provide `ffmpeg` or an equivalent video renderer.

## Required Inputs

| Scene | Source asset | Status |
| --- | --- | --- |
| 01 | `../../showcase/screens/l3ai-showcase-homepage.png` | ready |
| 02 | `../../showcase/screens/l3ai-showcase-get-started.png` | ready |
| 03 | `../../showcase/screens/l3ai-showcase-ai-quant.png` | ready |
| 04 | `../../showcase/screens/l3ai-showcase-wallet.png` | ready |
| 05 | `../../showcase/screens/l3ai-showcase-business-presentation.png` | ready |
| 06 | `../../showcase/screens/l3ai-showcase-resources.png` | ready |
| 07 | `../../showcase/screens/l3ai-showcase-faq.png` | ready |
| 08 | `../../showcase/screens/l3ai-showcase-get-started-mobile.png` | ready |

## Scene Timing

| Time | Scene | Visual direction | Voice-over |
| --- | --- | --- | --- |
| 00:00-00:12 | Discover | Slow push on homepage hero and demo CTA | L3AI opens with a public demo-first experience. |
| 00:12-00:27 | Onboard | Pan across Get Started reviewer paths | Visitors choose the right path before opening files. |
| 00:27-00:45 | AI Quant | Highlight AI Quant public visual and explain-first boundary | AI Quant is framed as research context, not trading certainty. |
| 00:45-01:03 | Wallet | Highlight wallet visual and verification checkpoints | Wallet-aware journeys explain context without exposing private wallet data. |
| 01:03-01:21 | Business | Move through business presentation preview | Reviewers can inspect model, roadmap and claim guardrails. |
| 01:21-01:39 | Resources | Pan over Resources and production package cards | The Launch Experience Center contains the collateral and manifests. |
| 01:39-01:52 | FAQ | Show risk and advice boundary | FAQ keeps the public claims safe and understandable. |
| 01:52-02:00 | Mobile close | Show mobile onboarding and public URL end card | The public package is ready for controlled external review. |

## Render Instructions

1. Import all scene screenshots into a 1920 x 1080 timeline.
2. Use slow pan and zoom motion only; avoid effects that obscure text.
3. Keep captions inside the safe title area.
4. Use the English or Chinese SRT from this folder.
5. Use the voice-over timing file for narration pacing.
6. Export:
   - MP4 H.264, 1920 x 1080, 30 fps
   - MOV ProRes or high-quality intermediate if needed
   - Thumbnail from Scene 01 or Scene 03

## Safety Boundary

- No live trading.
- No wallet signing.
- No real private wallet data.
- No backend endpoints.
- No private repository content.
- No guaranteed financial outcome claims.
