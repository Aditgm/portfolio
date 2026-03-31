import { NextResponse } from "next/server";
import { profileKnowledge, type KnowledgeChunk } from "@/data/profileKnowledge";

type SourceRef = {
  id: string;
  title: string;
};

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "or",
  "that",
  "the",
  "to",
  "was",
  "what",
  "when",
  "where",
  "which",
  "who",
  "with",
  "you",
  "your",
]);

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s+.#/-]/g, " ")
    .split(/\s+/)
    .filter((token) => token && !STOP_WORDS.has(token));
}

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

  const tagBoost = chunk.tags.reduce((sum, tag) => {
    const tagTokens = tokenize(tag);
    return sum + (tagTokens.some((token) => queryTokens.has(token)) ? 0.75 : 0);
  }, 0);

  return overlap + tagBoost;
}

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

  if (scored.length > 0) {
    return scored;
  }

  return profileKnowledge.slice(0, 3);
}

function hasAny(text: string, keywords: string[]): boolean {
  const value = text.toLowerCase();
  return keywords.some((keyword) => value.includes(keyword));
}

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

function buildContextAnswer(message: string, chunks: KnowledgeChunk[]): string {
  const intent = buildIntentAnswer(message);
  if (intent) {
    return intent;
  }

  const summary = chunks
    .slice(0, 3)
    .map((chunk) => chunk.content)
    .join(" ");

  return summary;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { message?: string };
    const message = payload?.message?.trim();

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const chunks = retrieveKnowledge(message, 4);
    const answer = buildContextAnswer(message, chunks);
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
