/**
 * Seed script — adds realistic prior repair entries to Backboard
 * so the Gemini memory moment fires immediately in demos.
 *
 * Usage:
 *   node scripts/seed-backboard.mjs <user_sub>
 *
 * Get your user_sub from Auth0:
 *   1. Sign in to the app
 *   2. Open browser console
 *   3. Run: (await fetch('/api/auth/me').then(r=>r.json()))?.sub
 *   OR check the Auth0 dashboard → Users → click your user → copy "user_id"
 *
 * Example:
 *   node scripts/seed-backboard.mjs auth0|abc123xyz
 */

import { BackboardClient } from 'backboard-sdk';

const BACKBOARD_API_KEY = process.env.VITE_BACKBOARD_API_KEY;
const userId = process.argv[2];
const existingAssistantId = process.argv[3]; // optional --reuse existing assistant

if (!BACKBOARD_API_KEY) {
  console.error('Missing VITE_BACKBOARD_API_KEY — run: export VITE_BACKBOARD_API_KEY=your_key');
  process.exit(1);
}

if (!userId) {
  console.error('Usage: node scripts/seed-backboard.mjs <user_sub> [existing_assistant_id]');
  process.exit(1);
}

const client = new BackboardClient({ apiKey: BACKBOARD_API_KEY });

async function getOrCreateAssistant() {
  if (existingAssistantId) {
    console.log('Reusing existing assistant:', existingAssistantId);
    return existingAssistantId;
  }
  console.log('Creating new Backboard assistant for user:', userId);
  const assistant = await client.createAssistant({
    name: `Repair Assistant — ${userId}`,
    system_prompt:
      'You are a household circularity memory store. ' +
      'Remember repair attempts, outcomes, and user preferences like no-solder or no power tools.',
  });
  console.log('Assistant created:', assistant.assistantId);
  return assistant.assistantId;
}

const SEED_MEMORIES = [
  {
    item_category: 'Furniture',
    photo_description: 'Wooden chair leg with a clean snap break at the joint',
    decision: 'repair',
    user_preferences: ['no power tools', 'wood glue only'],
    outcome: 'success',
    attempt_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    notes: 'Wood glue and clamp held perfectly. No power tools needed. Would repeat this approach.',
  },
  {
    item_category: 'Clothing & Textiles',
    photo_description: 'Jacket sleeve with a 3cm tear along the seam',
    decision: 'patch',
    user_preferences: ['no sewing machine', 'hand stitch preferred'],
    outcome: 'failed',
    attempt_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    notes: 'Fabric glue patch did not hold after washing. Hand stitching would have been better.',
  },
  {
    item_category: 'Furniture',
    photo_description: 'Coffee table surface with white heat ring marks',
    decision: 'repair',
    user_preferences: ['no power tools', 'no sanding'],
    outcome: 'success',
    attempt_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    notes: 'Mayonnaise method worked on heat marks. No abrasives needed. Quick and effective.',
  },
];

async function seed() {
  const assistantId = await getOrCreateAssistant();


  for (const memory of SEED_MEMORIES) {
    await client.addMemory(assistantId, {
      content: JSON.stringify(memory),
      metadata: {
        source: 'repair_before_replace',
        category: memory.item_category,
        decision: memory.decision,
        outcome: memory.outcome,
      },
    });
    console.log(`✓ Seeded: ${memory.item_category} — ${memory.decision} (${memory.outcome})`);
  }

  console.log('\nSeed complete. 3 repair memories added.');
  console.log('Next upload will trigger the memory moment in Gemini.');
}

seed().catch(console.error);
