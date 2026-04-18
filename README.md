# Repair Before Replace

> AI-powered circularity assistant. Upload a photo of a damaged household item and get an instant repair, patch, or replace recommendation - with memory that learns from your repair history.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-repair--before--replace.web.app-22c55e?style=for-the-badge&logo=firebase&logoColor=white)](https://repair-before-replace.web.app)
[![DEV Challenge](https://img.shields.io/badge/DEV-Weekend%20Challenge%202026-3b49df?style=for-the-badge&logo=devdotto&logoColor=white)](https://dev.to/challenges/weekend-2026-04-16)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-005A9C?style=for-the-badge&logo=w3c&logoColor=white)](https://www.w3.org/WAI/WCAG2AA-Conformance)

[![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Firebase_Hosting-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com)

---

## What It Does

Most items get thrown away because people don't know if they're safe to repair. **Repair Before Replace** changes the default.

1. **Pick a category** - Furniture, Clothing & Textiles, or Cosmetic Appliance Damage
2. **Upload a photo** of the damage
3. **Get an instant verdict** - Repair, Patch, or Replace Responsibly - with step-by-step instructions, materials needed, and an environmental impact assessment

The differentiator is **memory**. The app remembers what you've tried before and explicitly changes its recommendations:

> *"Your previous glue-only patch failed after washing, so this recommendation uses hand stitching instead."*

## Architecture

```
User uploads photo
       ↓
Auth0 → user identity (persistent memory per user)
       ↓
Backboard → fetch prior repair history for this category
       ↓
Gemini 2.5 Flash → analyze image + history → schema-constrained JSON
       ↓
UI: DecisionCard → WhyThisRecommendation → ImpactBand → RepairSteps → MemoryPanel
       ↓
Backboard → save assessment to memory
```

## Tech Stack

| Layer | Technology |
|---|---|
| AI Assessment | Google Gemini 2.5 Flash (multimodal + `responseSchema`) |
| Memory | Backboard SDK (persistent cross-session repair history) |
| Identity | Auth0 for Agents |
| Frontend | React 19 + TypeScript strict + Vite 7 + Tailwind CSS v4 |
| Hosting | Firebase Hosting |
| Built with | Google Antigravity (agentic IDE) |

## Prize Categories

- **Best use of Backboard** - memory layer injected into every AI call; UI surfaces which past attempt influenced the recommendation
- **Best use of Auth0 for Agents** - identity that makes memory personal and persistent
- **Best use of Google Gemini** - multimodal image analysis with schema-constrained JSON, scope enforcement, history-aware recommendations

## Getting Started

```bash
# Install dependencies
npm install

# Copy env template and fill in your keys
cp .env.example .env.local

# Start dev server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

### Environment Variables

```env
VITE_GEMINI_API_KEY=your_gemini_key
VITE_BACKBOARD_API_KEY=your_backboard_sdk_key
VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
VITE_AUTH0_AUDIENCE=your_auth0_audience_optional
```

## Verification Checklist

- [ ] `npm run dev` - app loads at `localhost:5173`
- [ ] Auth0 login flow completes and returns to app
- [ ] Category chip selection updates state with visual feedback
- [ ] Photo upload triggers Gemini 2.5 Flash call
- [ ] `DecisionCard` renders with correct color - green (repair), amber (patch), red (replace)
- [ ] `ImpactBand` shows environmental impact label
- [ ] `/history` page renders prior assessments for authenticated user
- [ ] Second assessment for same category references prior history in `why_this_recommendation`
- [ ] `npm run test` - all Vitest tests pass
- [ ] `npm run build` - zero TypeScript errors

## Contributors

| Name | Role |
|---|---|
| [@tvprasad](https://github.com/tvprasad) | Architecture, AI integration, UI |
| [@likhita-t](https://github.com/likhita-t) | Contributor |
| [@vijaya-t](https://github.com/vijaya-t) | Contributor |

## License

MIT
