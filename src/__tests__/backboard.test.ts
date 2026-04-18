import { describe, it, expect, vi, beforeEach } from 'vitest';
import { addRepairMemory, getRepairHistory } from '../services/backboard';

const { mockAddMemory, mockGetMemories, mockCreateAssistant } = vi.hoisted(() => ({
  mockAddMemory: vi.fn(),
  mockGetMemories: vi.fn(),
  mockCreateAssistant: vi.fn().mockResolvedValue({ assistantId: 'test_assistant_id' })
}));

vi.mock('backboard-sdk', () => ({
  BackboardClient: class {
    createAssistant = mockCreateAssistant;
    addMemory = mockAddMemory;
    getMemories = mockGetMemories;
  }
}));

describe('Backboard Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should store and retrieve user_preferences correctly', async () => {
    const mockMemory = {
      item_category: "Furniture",
      photo_description: "Scratch",
      decision: "repair" as const,
      user_preferences: ["no-solder"],
      outcome: "pending" as const,
      attempt_date: "2023-01-01T00:00:00.000Z",
      notes: "Test note"
    };

    mockGetMemories.mockResolvedValue({
      memories: [
        { content: JSON.stringify(mockMemory) }
      ]
    });

    await addRepairMemory('user123', mockMemory);
    expect(mockAddMemory).toHaveBeenCalled();

    const history = await getRepairHistory('user123');
    expect(history).toHaveLength(1);
    expect(history[0].user_preferences).toEqual(["no-solder"]);
  });
});
