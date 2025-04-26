import { eq, sql } from 'drizzle-orm';
import { db } from '..';
import { queryEmbedding } from '@/ai/embedding';
import { embeddings } from '../schema';

export const findRelevantContent = async (userID: string, userQuery: string) => {
  try {
    const userQueryEmbedding = await queryEmbedding(userQuery);

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

    return results.map((r) => r.content);
  } catch (error) {
    console.error('Error finding relevant content:', error);
    throw new Error('Failed to find relevant content.');
  }
};
