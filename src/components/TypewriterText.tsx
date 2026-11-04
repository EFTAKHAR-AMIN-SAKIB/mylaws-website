'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FormattedMessageText } from './FormattedMessageText';
import { FastForward } from 'lucide-react';

interface TypewriterTextProps {
  text: string;
  isStreaming?: boolean;
  waiting?: boolean;
  speedMs?: number;
  className?: string;
  density?: 'normal' | 'compact';
  onComplete?: () => void;
  onSkip?: () => void;
  skipLabelBn?: string;
  skipLabelEn?: string;
  isBn?: boolean;
}

/**
 * Balances unclosed Markdown bold tokens in partial streaming slices
 * so bold words render progressively without raw asterisks flashing.
 */
function cleanStreamingMarkdown(raw: string): string {
  if (!raw) return '';
  const starMatches = raw.match(/\*\*/g);
  if (starMatches && starMatches.length % 2 !== 0) {
    return raw + '**';
  }
  return raw;
}

/**
 * TypewriterText:
 * Elite-grade, letter-by-letter streaming animation matching ChatGPT, Claude, and Gemini.
 * Progressively streams each character with a glowing inline amber cursor at the tip,
 * while preserving complete typography, markdown bolding, and bullet parsing.
 */
export function TypewriterText({
  text,
  isStreaming = false,
  waiting = false,
  speedMs = 15,
  className,
  density = 'normal',
  onComplete,
  onSkip,
  skipLabelBn = 'তাত্ক্ষণিক দেখুন',
  skipLabelEn = 'Show full',
  isBn = true,
}: TypewriterTextProps) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const onSkipRef = useRef(onSkip);
  onSkipRef.current = onSkip;

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize character index based on streaming/waiting state
  const [charIndex, setCharIndex] = useState<number>(() =>
    isStreaming && !waiting ? 0 : waiting ? 0 : text.length
  );
  const [isTyping, setIsTyping] = useState<boolean>(() => isStreaming && !waiting);

  useEffect(() => {
    // 1. If waiting (e.g. earlier phase is actively typing), hold at 0
    if (waiting) {
      setCharIndex(0);
      setIsTyping(false);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    // 2. If not streaming (historical turn or completed), show full text
    if (!isStreaming) {
      setCharIndex(text.length);
      setIsTyping(false);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    // 3. Actively streaming letter-by-letter
    setCharIndex(0);
    setIsTyping(true);

    const totalChars = text.length;
    let currentIdx = 0;

    // Adaptive letter cadence:
    // - Short text (< 180 chars): 1 letter per tick (~66 letters/sec -> ~2.5s)
    // - Medium text (180 - 450 chars): 2 letters per tick (~133 letters/sec -> ~2.8s)
    // - Long text (> 450 chars): 3 letters per tick (~200 letters/sec -> ~3.5s)
    const charStep = totalChars > 450 ? 3 : totalChars > 180 ? 2 : 1;

    timerRef.current = setInterval(() => {
      currentIdx += charStep;

      // Periodic gentle scroll follow so bottom lines stay comfortably in view
      if (currentIdx % 45 === 0 && typeof window !== 'undefined') {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect && rect.bottom > window.innerHeight - 140) {
          window.scrollBy({ top: 35, behavior: 'smooth' });
        }
      }

      if (currentIdx >= totalChars) {
        currentIdx = totalChars;
        setCharIndex(totalChars);
        setIsTyping(false);
        if (timerRef.current) clearInterval(timerRef.current);
        onCompleteRef.current?.();
      } else {
        setCharIndex(currentIdx);
      }
    }, speedMs);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [text, isStreaming, speedMs, waiting]);

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setCharIndex(text.length);
    setIsTyping(false);
    onSkipRef.current?.();
    onCompleteRef.current?.();
  };

  if (waiting) {
    return null;
  }

  // Slice progressively letter-by-letter and ensure markdown bold pairs are balanced
  const visibleRaw = isTyping ? text.slice(0, charIndex) : text;
  const visibleText = isTyping ? cleanStreamingMarkdown(visibleRaw) : text;

  // Inline cursor at the exact tip of the current character
  const trailingCursorNode = isTyping ? (
    <span
      className="inline-block w-1.5 h-4 ml-1 bg-accent-light dark:bg-accent-dark animate-pulse align-middle rounded-xs shadow-2xs"
      aria-hidden="true"
    />
  ) : null;

  return (
    <div ref={containerRef} className="relative group/typewriter">
      <FormattedMessageText
        text={visibleText}
        className={className}
        density={density}
        trailingCursor={trailingCursorNode}
      />

      {/* Instant Skip Button while actively typing */}
      {isTyping && charIndex > 20 && (
        <div className="pt-2 flex items-center justify-end">
          <button
            onClick={handleSkip}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-anek font-semibold bg-accent-light/10 text-accent-light hover:bg-accent-light/20 transition-all border border-accent-light/30 shadow-2xs cursor-pointer select-none"
            title={isBn ? skipLabelBn : skipLabelEn}
          >
            <FastForward className="h-3 w-3" />
            <span>{isBn ? skipLabelBn : skipLabelEn}</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default TypewriterText;
