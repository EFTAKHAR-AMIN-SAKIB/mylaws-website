import { describe, it, expect } from 'vitest';
import {
  isGreetingQuery,
  isCapabilityQuery,
  isGeneralOrIrrelevantQuery,
  generateGreetingResponse,
  generateGeneralConversationalResponse,
} from '@/lib/followup';
import { createLegalWorkflow, isAmbiguousOrVagueQuery } from '@/lib/workflow';
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/answer/route';

describe('Conversational & Humanized Intent Recognition', () => {
  describe('Greeting & Small Talk Classification', () => {
    it('correctly classifies "hey, how are you" as greeting and not ambiguous dispute', () => {
      const q = 'hey, how are you';
      expect(isGreetingQuery(q)).toBe(true);
      expect(isAmbiguousOrVagueQuery(q)).toBe(false);
      expect(isGeneralOrIrrelevantQuery(q)).toBe(false);

      const res = generateGreetingResponse('en', q);
      expect(res.directAnswer).toContain("I'm doing well, thank you!");
      expect(res.suggestedTopics).toBeDefined();
      expect(res.suggestedTopics!.length).toBeGreaterThanOrEqual(4);
    });

    it('correctly classifies Bengali "কেমন আছেন" and "kemon achen" as greeting', () => {
      expect(isGreetingQuery('কেমন আছেন')).toBe(true);
      expect(isGreetingQuery('kemon achen')).toBe(true);
      expect(isGreetingQuery('kemon acho bhai')).toBe(true);
      expect(isGreetingQuery('assalamu alaikum')).toBe(true);
      expect(isGreetingQuery('সালাম')).toBe(true);

      const resBn = generateGreetingResponse('bn', 'কেমন আছেন');
      expect(resBn.directAnswer).toContain('আমি ভালো আছি, ধন্যবাদ!');
      expect(resBn.suggestedTopics).toBeDefined();
      expect(resBn.suggestedTopics!.length).toBeGreaterThanOrEqual(4);
    });

    it('does NOT classify substantive legal queries with greetings as pure greetings', () => {
      // E.g. "hi my boss has not paid my salary for 3 months"
      const mixed = 'hi my boss has not paid my salary for 3 months';
      expect(isGreetingQuery(mixed)).toBe(false);
    });
  });

  describe('Out-of-Scope & General Conversational Queries', () => {
    it('identifies recipes, jokes, coding, and general trivia as out-of-scope without legal confusion', () => {
      expect(isGeneralOrIrrelevantQuery('how to bake a chocolate cake in oven with butter')).toBe(true);
      expect(isGeneralOrIrrelevantQuery('tell me a funny joke')).toBe(true);
      expect(isGeneralOrIrrelevantQuery('write python code for binary search')).toBe(true);
      expect(isGeneralOrIrrelevantQuery('what is the capital of France')).toBe(true);
      expect(isGeneralOrIrrelevantQuery('কেক বানানোর সহজ রেসিপি কি')).toBe(true);
      expect(isGeneralOrIrrelevantQuery('একটি হাসির কৌতুক বলো')).toBe(true);
    });

    it('generates friendly responses with smooth bridge to Bangladesh legal guidance', () => {
      const jokeRes = generateGeneralConversationalResponse('tell me a funny joke', 'en');
      expect(jokeRes.directAnswer).toMatch(/joke|lighthearted/i);
      expect(jokeRes.directAnswer).toMatch(/Bangladesh law/i);
      expect(jokeRes.suggestedTopics).toBeDefined();

      const recipeRes = generateGeneralConversationalResponse('how to bake a chocolate cake in oven', 'bn');
      expect(recipeRes.directAnswer).toContain('ভোক্তা অধিকার');
      expect(recipeRes.suggestedTopics).toBeDefined();
    });

    it('never misclassifies substantive legal questions as general or out-of-scope', () => {
      expect(isGeneralOrIrrelevantQuery('আমার বকেয়া বেতন চাই')).toBe(false);
      expect(isGeneralOrIrrelevantQuery('জমির দলিল জালিয়াতি করেছে')).toBe(false);
      expect(isGeneralOrIrrelevantQuery('someone stole my motorcycle from parking')).toBe(false);
      expect(isGeneralOrIrrelevantQuery('police arrested my brother without warrant')).toBe(false);
      expect(isGeneralOrIrrelevantQuery('seller sent expired medicine online')).toBe(false);
    });
  });

  describe('Vague Dispute Clarification vs Small Talk', () => {
    it('only flags genuine vague cries for help as clarifying', () => {
      expect(isAmbiguousOrVagueQuery('আমার সাথে অন্যায় হয়েছে')).toBe(true);
      expect(isAmbiguousOrVagueQuery('বিচার চাই')).toBe(true);
      expect(isAmbiguousOrVagueQuery('i was wronged')).toBe(true);
      expect(isAmbiguousOrVagueQuery('i need legal help')).toBe(true);

      // Greetings and casual talk must NOT trigger clarifying
      expect(isAmbiguousOrVagueQuery('hey, how are you')).toBe(false);
      expect(isAmbiguousOrVagueQuery('hello there')).toBe(false);
      expect(isAmbiguousOrVagueQuery('good morning')).toBe(false);
      expect(isAmbiguousOrVagueQuery('how to make tea')).toBe(false);
    });
  });

  describe('End-to-End Workflow & API Behavior', () => {
    it('workflow completes greeting inquiry immediately without intimidating questions form', () => {
      const wf = createLegalWorkflow({
        requestId: 'test-greeting',
        originalMessage: 'hey, how are you',
        language: 'en',
        facts: [],
      });

      expect(wf.status).toBe('completed');
      expect(wf.isGreeting).toBe(true);
      expect(wf.isFollowUp).toBe(true);
      expect(wf.questions.length).toBe(0);
      expect(wf.clarificationQuestions).toBeUndefined();
      expect(wf.followUpResponse?.directAnswer).toContain("I'm doing well, thank you!");
      expect(wf.followUpResponse?.suggestedTopics).toBeDefined();
    });

    it('API route handles "hey, how are you" smoothly returning conversational greeting with topic pills', async () => {
      const req = new NextRequest('http://localhost:3000/api/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer test_staging_token',
        },
        body: JSON.stringify({
          originalMessage: 'hey, how are you',
          language: 'en',
          facts: [],
        }),
      });

      const res = await POST(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.status).toBe('completed');
      expect(data.isGreeting).toBe(true);
      expect(data.followUpResponse.directAnswer).toContain("I'm doing well, thank you!");
      expect(data.followUpResponse.suggestedTopics.length).toBeGreaterThanOrEqual(4);
      expect(data.questions.length).toBe(0);
    });

    it('API route handles casual recipe inquiry returning out-of-scope response with legal bridge', async () => {
      const req = new NextRequest('http://localhost:3000/api/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer test_staging_token',
        },
        body: JSON.stringify({
          originalMessage: 'how to bake a chocolate cake in oven with butter',
          language: 'en',
          facts: [],
        }),
      });

      const res = await POST(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.status).toBe('completed');
      expect(data.isOutOfScope).toBe(true);
      expect(data.followUpResponse.directAnswer).toMatch(/cooking|recipe|cake|consumer/i);
      expect(data.followUpResponse.suggestedTopics.length).toBeGreaterThanOrEqual(4);
    });
  });
});
