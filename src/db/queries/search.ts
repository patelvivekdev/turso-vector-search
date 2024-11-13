import { eq, sql } from 'drizzle-orm';
import { db } from '..';
import { generateEmbedding } from '@/ai/embedding';
import { embeddings } from '../schema';

import { MixedbreadAIClient } from '@mixedbread-ai/sdk';

const mxbai = new MixedbreadAIClient({
  apiKey: process.env.MIXEDBREAD_API_KEY!,
});

export const findRelevantContent = async (userID: string, userQuery: string, topK: number) => {
  try {
    const userQueryEmbedding = await generateEmbedding(userQuery);

    // const similarity = sql`vector_distance_cos(${
    //   embeddings.embedding
    // }, ${JSON.stringify(userQueryEmbedding)})`;

    // const results = await db
    //   .select({
    //     name: embeddings.content,
    //     similarity: similarity,
    //   })
    //   .from(embeddings)
    //   .where(and(eq(embeddings.userId, userID), gt(similarity, 0.5)))
    //   .orderBy((t) => desc(t.similarity))
    //   .limit(15);
    // return results;

    const results = await db
      .select({
        content: embeddings.content,
      })
      .from(
        sql`vector_top_k('vector_idx', vector32(${JSON.stringify(userQueryEmbedding)}), 50) as v`,
      )
      .leftJoin(embeddings, sql`${embeddings}.rowid = v.id`)
      .where(eq(embeddings.userId, userID));

    if (results.length === 0) {
      return 'Error: No results found';
    }
    // Re rank the results using Mixedbread AI
    const res = await mxbai.reranking({
      model: 'mixedbread-ai/mxbai-rerank-large-v1',
      query: userQuery,
      input: results.map((r) => r.content!),
      topK: topK || 20,
      returnInput: true,
    });

    return res.data.map((r) => r.input);
  } catch (error) {
    console.error('Error finding relevant content:', error);
    throw new Error('Failed to find relevant content.');
  }
};
