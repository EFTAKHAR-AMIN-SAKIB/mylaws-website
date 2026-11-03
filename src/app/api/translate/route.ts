import { NextRequest, NextResponse } from 'next/server';

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec));
}

async function translateChunk(text: string, from: string, to: string): Promise<string> {
  if (!text || !text.trim()) return text;
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.trim())}&langpair=${from}|${to}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return text;
    const data = await res.json();
    const translated = data?.responseData?.translatedText;
    if (translated && typeof translated === 'string' && translated.trim().length > 0) {
      return decodeHtmlEntities(translated.trim());
    }
    return text;
  } catch (err) {
    console.warn('Translate chunk error:', err);
    return text;
  }
}

async function translateFullText(text: string, from: string, to: string): Promise<string> {
  if (!text || !text.trim()) return '';

  const paragraphs = text.split('\n\n').filter((p) => p.trim());
  const translatedParagraphs = await Promise.all(
    paragraphs.map(async (paragraph) => {
      // If paragraph is short, translate in one shot
      if (paragraph.length <= 400) {
        return await translateChunk(paragraph, from, to);
      }

      // Split into sentences if paragraph is long
      const sentences = paragraph.match(/[^.!?।\n]+[.!?।\n]+|\S+/g) || [paragraph];
      const chunks: string[] = [];
      let currentChunk = '';

      for (const s of sentences) {
        if ((currentChunk + ' ' + s).length > 350) {
          if (currentChunk) chunks.push(currentChunk.trim());
          currentChunk = s;
        } else {
          currentChunk = currentChunk ? `${currentChunk} ${s}` : s;
        }
      }
      if (currentChunk) chunks.push(currentChunk.trim());

      const translatedChunks = await Promise.all(
        chunks.map((c) => translateChunk(c, from, to))
      );
      return translatedChunks.join(' ');
    })
  );

  return translatedParagraphs.join('\n\n');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, targetLang } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Valid text parameter is required' }, { status: 400 });
    }

    // Detect source language if not explicitly provided
    const hasBengali = /[\u0980-\u09FF]/.test(text);
    const from = hasBengali ? 'bn' : 'en';
    const to = targetLang ? (targetLang === 'bn' ? 'bn' : 'en') : hasBengali ? 'en' : 'bn';

    if (from === to) {
      return NextResponse.json({ translatedText: text, sourceLang: from, targetLang: to });
    }

    const translatedText = await translateFullText(text, from, to);

    return NextResponse.json({
      translatedText,
      sourceLang: from,
      targetLang: to,
    });
  } catch (error) {
    console.error('Translation route error:', error);
    return NextResponse.json(
      { error: 'Translation processing failed', translatedText: '' },
      { status: 500 }
    );
  }
}
