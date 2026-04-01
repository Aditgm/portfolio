/**
 * FAQ Bot API Route
 * 
 * This is a keyword-based FAQ responder, NOT a true AI/RAG assistant.
 * It tokenizes user messages with stop-word removal and matches against
 * profileKnowledge.ts chunks using simple keyword overlap scoring.
 * 
 * Decision: Option A chosen - transparent FAQ Bot without LLM overhead.
 * The existing keyword-matching flow is documented here for clarity.
 */

import { NextResponse } from "next/server";
import { profileKnowledge, type KnowledgeChunk } from "@/data/profileKnowledge";

type SourceRef = {
  id: string;
  title: string;
};

/** Stop words removed during tokenization to improve matching accuracy */
const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from",
  "how", "i", "in", "is", "it", "me", "my", "of", "on", "or",
  "that", "the", "to", "was", "what", "when", "where", "which",
  "who", "with", "you", "your",
]);

/**
 * Simple tokenizer - splits text into lowercase tokens, removes stop words
 * @param value - Input string to tokenize
 * @returns Array of meaningful tokens
 */
function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s+.#/-]/g, " ")
    .split(/\s+/)
    .filter((token) => token && !STOP_WORDS.has(token));
}

/**
 * Scores a knowledge chunk based on keyword overlap with query
 * @param queryTokens - Set of tokenized query terms
 * @param chunk - Knowledge chunk to score
 * @returns Relevance score (higher = more relevant)
 */
function scoreChunk(queryTokens: Set<string>, chunk: KnowledgeChunk): number {
  if (queryTokens.size === 0) {
    return 0;
  }

  const chunkTokens = tokenize(`${chunk.title} ${chunk.content} ${chunk.tags.join(" ")}`);
  const chunkTokenSet = new Set(chunkTokens);

  let overlap = 0;
  queryTokens.forEach((token) => {
    if (chunkTokenSet.has(token)) {
      overlap += 1;
    }
  });

  // Boost score if query matches tags (0.75 points per matching tag)
  const tagBoost = chunk.tags.reduce((sum, tag) => {
    const tagTokens = tokenize(tag);
    return sum + (tagTokens.some((token) => queryTokens.has(token)) ? 0.75 : 0);
  }, 0);

  return overlap + tagBoost;
}

/**
 * Keyword-based retrieval - returns top matching knowledge chunks
 * @param query - User message
 * @param limit - Maximum chunks to return
 * @returns Array of matching knowledge chunks (or fallback chunks if no match)
 */
function retrieveKnowledge(query: string, limit = 4): KnowledgeChunk[] {
  const queryTokens = new Set(tokenize(query));

  const scored = profileKnowledge
    .map((chunk) => ({
      chunk,
      score: scoreChunk(queryTokens, chunk),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.chunk);

  // Return matched chunks or fallback to general info
  return scored.length > 0 ? scored : profileKnowledge.slice(0, 3);
}

/**
 * Checks if text contains any of the keywords
 */
function hasAny(text: string, keywords: string[]): boolean {
  const value = text.toLowerCase();
  return keywords.some((keyword) => value.includes(keyword));
}

/**
 * Hard-coded intent responses for common queries
 * These take precedence over retrieved knowledge chunks
 */
function buildIntentAnswer(message: string): string | null {
  if (hasAny(message, ["email", "contact", "reach", "hire", "connect"])) {
    return "You can reach Aditya at arajsinha4@gmail.com. You can also use the Contact section links for Gmail, Outlook, or direct mail app compose.";
  }

  if (hasAny(message, ["github", "leetcode", "codeforces", "profile link", "social"])) {
    return "Profiles: GitHub https://github.com/Aditgm, LeetCode https://leetcode.com/u/adityagm/, Codeforces https://codeforces.com/profile/aditya2005.";
  }

  if (hasAny(message, ["location", "where", "based"])) {
    return "Aditya is based in Dehradun, Uttarakhand, India.";
  }

  return null;
}

/**
 * Builds final response - intent answers take priority, otherwise summarize chunks
 */
function buildContextAnswer(message: string, chunks: KnowledgeChunk[]): string {
  // Check for hard-coded intent first
  const intent = buildIntentAnswer(message);
  if (intent) {
    return intent;
  }

  // Otherwise, summarize top matching knowledge chunks
  const summary = chunks
    .slice(0, 3)
    .map((chunk) => chunk.content)
    .join(" ");

  return summary;
}

/**
 * POST handler for FAQ Bot
 * Accepts JSON body with { message: string }
 * Returns { answer: string, sources: SourceRef[] }
 */
export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { message?: string };
    const message = payload?.message?.trim();

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    // Limit message length to prevent abuse
    if (message.length > 500) {
      return NextResponse.json({ error: "Message too long. Keep it under 500 characters." }, { status: 400 });
    }

    // Retrieve matching knowledge chunks
    const chunks = retrieveKnowledge(message, 4);
    const answer = buildContextAnswer(message, chunks);
    
    // Build source references for UI display
    const sources: SourceRef[] = chunks.map((chunk) => ({
      id: chunk.id,
      title: chunk.title,
    }));

    return NextResponse.json({ answer, sources });
  } catch {
    return NextResponse.json(
      { error: "Unable to process chat request right now." },
      { status: 500 }
    );
  }
}