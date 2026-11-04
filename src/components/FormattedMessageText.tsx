import React from 'react';

interface FormattedMessageTextProps {
  text: string;
  className?: string;
  density?: 'normal' | 'compact';
  trailingCursor?: React.ReactNode;
}

interface InlineSegment {
  type: 'text' | 'bold';
  content: string;
}

function parseInlineSegments(text: string): InlineSegment[] {
  if (!text) return [];

  // Match **bold** tokens
  const regex = /\*\*(.*?)\*\*/g;
  const segments: InlineSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const rawText = text.slice(lastIndex, match.index).replace(/\*/g, '');
      if (rawText) {
        segments.push({ type: 'text', content: rawText });
      }
    }
    const boldContent = match[1].replace(/\*/g, '').trim();
    if (boldContent) {
      segments.push({ type: 'bold', content: boldContent });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    const rawText = text.slice(lastIndex).replace(/\*/g, '');
    if (rawText) {
      segments.push({ type: 'text', content: rawText });
    }
  }

  return segments;
}

function renderInline(text: string): React.ReactNode {
  const segments = parseInlineSegments(text);
  if (segments.length === 0) return null;

  return segments.map((seg, idx) => {
    if (seg.type === 'bold') {
      return (
        <strong
          key={idx}
          className="font-bold text-accent-light dark:text-accent-dark font-anek"
        >
          {seg.content}
        </strong>
      );
    }
    return <span key={idx}>{seg.content}</span>;
  });
}

type ParsedBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'bullet'; title: string | null; body: string }
  | { type: 'numbered'; number: string; title: string | null; body: string };

function parseBlocks(rawText: string): ParsedBlock[] {
  if (!rawText) return [];

  const lines = rawText.split(/\r?\n/);
  const blocks: ParsedBlock[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // 1. Bullet items: •, *, -, etc.
    const bulletMatch = trimmed.match(/^([•*\-–—]|\*)\s+(.*)$/);
    if (bulletMatch) {
      const rawContent = bulletMatch[2].trim();
      // Check if starts with **Title:** or **Title** or Title:
      const boldTitleMatch = rawContent.match(/^\*\*(.*?)\*\*[:\-—]?\s*(.*)$/);
      if (boldTitleMatch) {
        let title = boldTitleMatch[1].trim();
        if (!title.endsWith(':')) title += ':';
        blocks.push({
          type: 'bullet',
          title,
          body: boldTitleMatch[2].trim(),
        });
        continue;
      }
      const colonMatch = rawContent.match(/^([^:]{2,40}):\s*(.*)$/);
      if (colonMatch) {
        blocks.push({
          type: 'bullet',
          title: colonMatch[1].trim() + ':',
          body: colonMatch[2].trim(),
        });
        continue;
      }
      blocks.push({
        type: 'bullet',
        title: null,
        body: rawContent,
      });
      continue;
    }

    // 2. Numbered items: 1. or ১.
    const numberedMatch = trimmed.match(/^([0-9১-৯]+)[\.\)]\s+(.*)$/);
    if (numberedMatch) {
      const num = numberedMatch[1];
      const rawContent = numberedMatch[2].trim();
      const boldTitleMatch = rawContent.match(/^\*\*(.*?)\*\*[:\-—]?\s*(.*)$/);
      if (boldTitleMatch) {
        let title = boldTitleMatch[1].trim();
        if (!title.endsWith(':')) title += ':';
        blocks.push({
          type: 'numbered',
          number: num,
          title,
          body: boldTitleMatch[2].trim(),
        });
        continue;
      }
      const colonMatch = rawContent.match(/^([^:]{2,40}):\s*(.*)$/);
      if (colonMatch) {
        blocks.push({
          type: 'numbered',
          number: num,
          title: colonMatch[1].trim() + ':',
          body: colonMatch[2].trim(),
        });
        continue;
      }
      blocks.push({
        type: 'numbered',
        number: num,
        title: null,
        body: rawContent,
      });
      continue;
    }

    // 3. Regular Paragraph
    blocks.push({
      type: 'paragraph',
      content: trimmed,
    });
  }

  return blocks;
}

export function FormattedMessageText({
  text,
  className = '',
  density = 'normal',
  trailingCursor,
}: FormattedMessageTextProps) {
  if (!text) return null;

  const blocks = parseBlocks(text);

  return (
    <div className={`space-y-3 font-hind leading-relaxed ${className}`}>
      {blocks.map((block, bIdx) => {
        const isLast = bIdx === blocks.length - 1;

        if (block.type === 'bullet') {
          return (
            <div
              key={bIdx}
              className={`flex items-start gap-2.5 ${
                density === 'compact' ? 'my-1' : 'my-1.5'
              } pl-1 sm:pl-2`}
            >
              <span className="h-2 w-2 rounded-full bg-accent-light ring-2 ring-accent-light/20 shrink-0 mt-2 shadow-2xs" />
              <div className="flex-1 text-sm sm:text-base text-primary-light font-hind leading-relaxed">
                {block.title && (
                  <strong className="font-bold text-accent-light dark:text-accent-dark font-anek mr-1.5 inline">
                    {block.title}{' '}
                  </strong>
                )}
                <span className="inline">
                  {renderInline(block.body)}
                  {isLast && trailingCursor}
                </span>
              </div>
            </div>
          );
        }

        if (block.type === 'numbered') {
          return (
            <div
              key={bIdx}
              className={`flex items-start gap-3 ${
                density === 'compact' ? 'my-1.5 p-2.5' : 'my-2 p-3'
              } rounded-xl bg-bg-light/60 border border-border-light/70 text-sm sm:text-base text-primary-light font-hind leading-relaxed`}
            >
              <div className="h-5 w-5 rounded-full bg-accent-light/15 text-accent-light flex items-center justify-center shrink-0 mt-0.5 font-bold font-anek text-xs">
                {block.number}
              </div>
              <div className="flex-1">
                {block.title && (
                  <strong className="font-bold text-accent-light dark:text-accent-dark font-anek mr-1.5 inline">
                    {block.title}{' '}
                  </strong>
                )}
                <span className="inline">
                  {renderInline(block.body)}
                  {isLast && trailingCursor}
                </span>
              </div>
            </div>
          );
        }

        // Paragraph
        return (
          <p
            key={bIdx}
            className="text-sm sm:text-base text-primary-light font-hind leading-relaxed"
          >
            {renderInline(block.content)}
            {isLast && trailingCursor}
          </p>
        );
      })}
    </div>
  );
}

export default FormattedMessageText;
