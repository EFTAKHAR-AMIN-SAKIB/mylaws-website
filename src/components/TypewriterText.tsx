'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
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
 * TypewriterText:
 * Interactive word-by-word / token streaming animation for MyLaws AI assistant answers.
 * Animates text progressively ("one by one") with a pulsing cursor, matching LLM generation,
 * while preserving complete markdown, bold styling, and statutory pills.
 */
export function TypewriterText({
  text,
  isStreaming = false,
  waiting = false,
  speedMs = 22,
  className,
  density = 'normal',
  onComplete,
  onSkip,
  skipLabelBn = 'তাত্ক্ষণিক দেখুন',
  skipLabelEn = 'Show full',
  isBn = true,
}: TypewriterTextProps) {
  // Tokenize text by words and whitespace delimiters to stream natural word-by-word tokens
  const tokens = useMemo(() => {
    if (!text) return [];
    return text.split(/(\s+)/);
  }, [text]);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const onSkipRef = useRef(onSkip);
  onSkipRef.current = onSkip;

  // If not streaming or currently waiting, initialize properly
  const [tokenIndex, setTokenIndex] = useState<number>(() =>
    isStreaming && !waiting ? 0 : waiting ? 0 : tokens.length
  );
  const [isTyping, setIsTyping] = useState<boolean>(() => isStreaming && !waiting);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (waiting) {
      setTokenIndex(0);
      setIsTyping(false);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    if (!isStreaming) {
      setTokenIndex(tokens.length);
      setIsTyping(false);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setTokenIndex(0);
    setIsTyping(true);

    const totalTokens = tokens.length;
    let currentIndex = 0;

    // Advance 2 tokens per tick (1 word + 1 whitespace) for a natural, snappy cadence
    // If the text is very long (> 160 tokens), advance by 4 tokens per tick
    const tokenStep = totalTokens > 160 ? 4 : 2;

    timerRef.current = setInterval(() => {
      currentIndex += tokenStep;
      if (currentIndex >= totalTokens) {
        currentIndex = totalTokens;
        setTokenIndex(totalTokens);
        setIsTyping(false);
        if (timerRef.current) clearInterval(timerRef.current);
        onCompleteRef.current?.();
      } else {
        setTokenIndex(currentIndex);
      }
    }, speedMs);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [tokens, isStreaming, speedMs, waiting]);

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setTokenIndex(tokens.length);
    setIsTyping(false);
    onSkipRef.current?.();
    onCompleteRef.current?.();
  };

  if (waiting) {
    return (
      <div className="flex items-center gap-2 text-accent-light text-xs py-1 font-hind select-none">
        <span className="inline-block h-2 w-2 rounded-full bg-accent-light animate-ping" />
        <span className="text-[11px] text-secondary-light font-medium italic">
          {isBn ? 'আইনি ধারা প্রস্তুত হচ্ছে...' : 'Formulating statutory analysis...'}
        </span>
      </div>
    );
  }

  const visibleText = isTyping
    ? tokens.slice(0, tokenIndex).join('')
    : text;

  return (
    <div className="relative group/typewriter">
      <div className="inline">
        <FormattedMessageText
          text={visibleText}
          className={className}
          density={density}
        />
        {isTyping && (
          <span
            className="inline-block w-1.5 h-4 ml-1 bg-accent-light dark:bg-accent-dark animate-pulse align-middle rounded-xs"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Subtle Skip button while actively typing */}
      {isTyping && tokenIndex > 6 && (
        <button
          onClick={handleSkip}
          type="button"
          className="inline-flex items-center gap-1 ml-2.5 px-2 py-0.5 rounded-full text-[10px] font-anek font-semibold bg-accent-light/10 text-accent-light hover:bg-accent-light/20 transition-all border border-accent-light/30 shadow-2xs cursor-pointer select-none align-middle"
          title={isBn ? skipLabelBn : skipLabelEn}
        >
          <FastForward className="h-2.5 w-2.5" />
          <span>{isBn ? skipLabelBn : skipLabelEn}</span>
        </button>
      )}
    </div>
  );
}
