# Repair Before Replace

A household circularity assistant that helps users decide whether to repair, patch, or replace an item safely — and remembers what worked before!

## VERIFICATION CHECKLIST

Follow these manual steps to verify the end-to-end functionality of the platform.

- [ ] Run `npm run dev` — app loads beautifully at `localhost:5173`.
- [ ] Complete the Auth0 login flow (verifying standard auth redirect & return to).
- [ ] Confirm that Category chip selections properly update the internal state and trigger UI feedback.
- [ ] Uploading a photo triggers the Gemini 2.5 Flash call with the image payload.
- [ ] Confirm Gemini returns a valid `AssessmentResult` JSON document under the hood (you can observe the Network console/logs).
- [ ] Verify `DecisionCard` renders prominently highlighting repair (green), patch (amber), or replace (red).
- [ ] Verify `ImpactBand` renders the correct carbon/waste label cleanly.
- [ ] Access the `/history` page and ensure prior repairs render successfully (requires an Auth0 logged-in user).
- [ ] Complete a second assessment for a logged-in user and confirm the recommendation utilizes context from prior iterations (injected via Backboard).
- [ ] Run `npm run test` — verify the automated Vitest suite passes without errors.
- [ ] Run `npm run build` — confirm zero TypeScript errors during Vite builds.

## Setup Instructions

Make sure to populate your `.env` file before executing:

```env
VITE_GEMINI_API_KEY=your_gemini_key
VITE_BACKBOARD_API_KEY=your_backboard_sdk_key
VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
VITE_AUTH0_AUDIENCE=your_auth0_audience_optional
```
