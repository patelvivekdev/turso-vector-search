"use server";
import { embed, embedMany } from "ai";
import { google } from "@ai-sdk/google";
import { desc, gt, sql } from "drizzle-orm";
import { embeddings } from "@/db/schema";
import { db } from "@/db";

export const generateEmbeddings = async (
  facts: string[]
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const { embeddings } = await embedMany({
    model: google.textEmbeddingModel("text-embedding-004"),
    values: facts,
  });
  return embeddings.map((e, i) => ({ content: facts[i], embedding: e }));
};

export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll("\n", " ");
  const { embedding } = await embed({
    model: google.textEmbeddingModel("text-embedding-004"),
    value: input,
  });
  return embedding;
};

export const findRelevantContent = async (userQuery: string) => {
  try {
    const userQueryEmbedding = await generateEmbedding(userQuery);

    const similarity = sql`vector_distance_cos(${
      embeddings.embedding
    }, ${JSON.stringify(userQueryEmbedding)})`;

    const results = await db
      .select({
        name: embeddings.content,
        similarity: similarity,
      })
      .from(embeddings)
      .where(gt(similarity, 0.5))
      .orderBy((t) => desc(t.similarity))
      .limit(10);

    return {
      results,
    };
  } catch (error) {
    console.error("Error finding relevant content:", error);
    throw new Error("Failed to find relevant content.");
  }
};