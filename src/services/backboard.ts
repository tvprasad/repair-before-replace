import { BackboardClient } from 'backboard-sdk';
import type { RepairMemory } from '../types/assessment';

const apiKey = import.meta.env.VITE_BACKBOARD_API_KEY;
const client = apiKey ? new BackboardClient({ apiKey }) : null;

// One Backboard assistant per user — assistantId cached in localStorage
const ASSISTANT_ID_KEY = (userId: string) => `rbr_assistant_${userId}`;

async function getOrCreateAssistant(userId: string): Promise<string> {
  const cached = localStorage.getItem(ASSISTANT_ID_KEY(userId));
  if (cached) return cached;

  if (!client) throw new Error('Backboard client not initialized');

  const assistant = await client.createAssistant({
    name: `Repair Assistant — ${userId}`,
    system_prompt:
      'You are a household circularity memory store. ' +
      'Remember repair attempts, outcomes, and user preferences like no-solder or no power tools.',
  });

  localStorage.setItem(ASSISTANT_ID_KEY(userId), assistant.assistantId);
  return assistant.assistantId;
}

export async function addRepairMemory(
  userId: string,
  memory: RepairMemory
): Promise<void> {
  if (!client) return;
  const assistantId = await getOrCreateAssistant(userId);

  await client.addMemory(assistantId, {
    content: JSON.stringify(memory),
    metadata: {
      source: 'repair_before_replace',
      category: memory.item_category,
      decision: memory.decision,
      outcome: memory.outcome,
    },
  });
}

export async function getRepairHistory(userId: string): Promise<RepairMemory[]> {
  if (!client) return [];
  const assistantId = await getOrCreateAssistant(userId);

  const result = await client.getMemories(assistantId, { page: 1, pageSize: 25 });
  return result.memories
    .map((m: any) => {
      try {
        return JSON.parse(m.content) as RepairMemory;
      } catch {
        return null;
      }
    })
    .filter((m: RepairMemory | null): m is RepairMemory => m !== null);
}

export async function searchRepairHistory(
  userId: string,
  category: string,
  limit = 5
): Promise<RepairMemory[]> {
  if (!client) return [];
  const assistantId = await getOrCreateAssistant(userId);

  const results = await client.searchMemories(assistantId, category, limit);
  return results.memories
    .map((m: any) => {
      try {
        return JSON.parse(m.content) as RepairMemory;
      } catch {
        return null;
      }
    })
    .filter((m: RepairMemory | null): m is RepairMemory => m !== null);
}
