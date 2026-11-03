import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import {
  saveConversation,
  getStoredConversations,
  findStoredConversation,
  getActiveConversation,
  setActiveConversationId,
  clearActiveConversationSession,
  deleteStoredConversation,
  type ChatTurn,
} from '../src/lib/conversations';

describe('Conversations Persistence & Session Recovery', () => {
  let store: Record<string, string> = {};

  beforeAll(() => {
    // Provide standard localStorage mock for Node test environment
    const mockStorage = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };

    Object.defineProperty(globalThis, 'window', {
      value: { localStorage: mockStorage },
      writable: true,
    });
    Object.defineProperty(globalThis, 'localStorage', {
      value: mockStorage,
      writable: true,
    });
  });

  beforeEach(() => {
    store = {};
  });

  const sampleTurns: ChatTurn[] = [
    {
      id: 'turn-user-1',
      role: 'user',
      content: 'ek meyeke dekhlam biyer pore baper bari cole eseche',
      timestamp: new Date().toISOString(),
    },
    {
      id: 'turn-assistant-1',
      role: 'assistant',
      content: 'পারিবারিক সুরক্ষা এবং দেনমোহর ও ভরণপোষণ সংক্রান্ত বিশ্লেষণ।',
      timestamp: new Date().toISOString(),
      result: {
        status: 'ready',
        language: 'bn',
        problemSummary: {
          title: 'পারিবারিক বিরোধ',
          identifiedIssue: 'দেনমোহর ও খোরপোশ',
          understanding: 'স্বামীর বাড়ি ত্যাগ',
          keyFacts: [],
        },
        checklist: [],
        sources: [],
      } as any,
    },
  ];

  it('saves conversation to localStorage and retrieves by ID and Title', () => {
    const saved = saveConversation(sampleTurns, 'test-query-id-1', 'ek meyeke dekhlam biyer pore baper bari cole eseche');
    expect(saved).not.toBeNull();
    expect(saved?.id).toBe('test-query-id-1');

    // Find by ID
    const foundById = findStoredConversation('test-query-id-1');
    expect(foundById).not.toBeNull();
    expect(foundById?.turns.length).toBe(2);
    expect(foundById?.turns[0].content).toBe('ek meyeke dekhlam biyer pore baper bari cole eseche');

    // Find by question text (fuzzy case insensitive)
    const foundByText = findStoredConversation(null, 'ek meyeke dekhlam biyer pore');
    expect(foundByText).not.toBeNull();
    expect(foundByText?.id).toBe('test-query-id-1');
  });

  it('correctly tracks and clears active conversation session', () => {
    saveConversation(sampleTurns, 'session-abc');
    const active = getActiveConversation();
    expect(active?.id).toBe('session-abc');

    clearActiveConversationSession();
    const activeAfterClear = getActiveConversation();
    expect(activeAfterClear).toBeNull();
  });

  it('updates existing conversation without duplicating', () => {
    saveConversation(sampleTurns, 'session-update');
    expect(getStoredConversations().length).toBe(1);

    const followUpTurn: ChatTurn = {
      id: 'turn-user-2',
      role: 'user',
      content: 'koto taka khoroc hobe?',
      timestamp: new Date().toISOString(),
    };

    saveConversation([...sampleTurns, followUpTurn], 'session-update');
    const all = getStoredConversations();
    expect(all.length).toBe(1);
    expect(all[0].turns.length).toBe(3);
  });

  it('deletes stored conversation cleanly', () => {
    saveConversation(sampleTurns, 'del-123');
    expect(getStoredConversations().length).toBe(1);

    deleteStoredConversation('del-123');
    expect(getStoredConversations().length).toBe(0);
    expect(getActiveConversation()).toBeNull();
  });
});
