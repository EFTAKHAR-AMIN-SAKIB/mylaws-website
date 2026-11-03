import type { AnswerResult } from '@/types/contracts';

export interface ChatTurn {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  result?: AnswerResult;
  error?: string;
}

export interface StoredConversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  turns: ChatTurn[];
}

const STORAGE_KEY_CONVERSATIONS = 'mylaws_conversations_v1';
const STORAGE_KEY_ACTIVE_ID = 'mylaws_active_conversation_id';
const MAX_STORED_CONVERSATIONS = 30;

function isClient(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function normalizeTitle(t: string): string {
  return t.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function getStoredConversations(): StoredConversation[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONVERSATIONS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (err) {
    console.warn('Failed to parse stored conversations:', err);
  }
  return [];
}

export function getActiveConversationId(): string | null {
  if (!isClient()) return null;
  try {
    return localStorage.getItem(STORAGE_KEY_ACTIVE_ID);
  } catch {
    return null;
  }
}

export function setActiveConversationId(id: string | null): void {
  if (!isClient()) return;
  try {
    if (id) {
      localStorage.setItem(STORAGE_KEY_ACTIVE_ID, id);
    } else {
      localStorage.removeItem(STORAGE_KEY_ACTIVE_ID);
    }
  } catch {}
}

export function findStoredConversation(queryId?: string | null, questionText?: string | null): StoredConversation | null {
  const all = getStoredConversations();
  if (all.length === 0) return null;

  // 1. Direct ID match
  if (queryId) {
    const foundById = all.find((c) => c.id === queryId);
    if (foundById) return foundById;
  }

  // 2. Normalized Title / Question text match
  if (questionText && questionText.trim()) {
    const targetNorm = normalizeTitle(questionText);
    const foundByText = all.find((c) => {
      const titleNorm = normalizeTitle(c.title);
      return titleNorm === targetNorm || (titleNorm.length > 10 && (titleNorm.includes(targetNorm) || targetNorm.includes(titleNorm)));
    });
    if (foundByText) return foundByText;
  }

  return null;
}

export function getActiveConversation(): StoredConversation | null {
  const activeId = getActiveConversationId();
  if (!activeId) return null;
  return findStoredConversation(activeId);
}

export function saveConversation(turns: ChatTurn[], preferredId?: string, preferredTitle?: string): StoredConversation | null {
  if (!isClient() || turns.length === 0) return null;

  try {
    const all = getStoredConversations();
    const firstUserTurn = turns.find((t) => t.role === 'user');
    const title = preferredTitle || firstUserTurn?.content || 'আইনি পরামর্শ / Legal Inquiry';
    const conversationId = preferredId || turns[0]?.id || crypto.randomUUID();
    const now = new Date().toISOString();

    const existingIndex = all.findIndex((c) => c.id === conversationId || normalizeTitle(c.title) === normalizeTitle(title));

    const conversationToSave: StoredConversation = {
      id: existingIndex >= 0 ? all[existingIndex].id : conversationId,
      title: title.slice(0, 150),
      createdAt: existingIndex >= 0 ? all[existingIndex].createdAt : now,
      updatedAt: now,
      turns,
    };

    if (existingIndex >= 0) {
      all[existingIndex] = conversationToSave;
    } else {
      all.unshift(conversationToSave);
    }

    // Keep only most recent conversations to prevent localStorage overflow
    const trimmed = all.slice(0, MAX_STORED_CONVERSATIONS);
    localStorage.setItem(STORAGE_KEY_CONVERSATIONS, JSON.stringify(trimmed));
    setActiveConversationId(conversationToSave.id);

    return conversationToSave;
  } catch (err) {
    console.warn('Failed to save conversation to localStorage:', err);
    return null;
  }
}

export function clearActiveConversationSession(): void {
  setActiveConversationId(null);
}

export function deleteStoredConversation(id: string): void {
  if (!isClient()) return;
  try {
    const all = getStoredConversations().filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY_CONVERSATIONS, JSON.stringify(all));
    if (getActiveConversationId() === id) {
      setActiveConversationId(null);
    }
  } catch {}
}
