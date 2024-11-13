'use server';
import { insertEmbeddings, insertResource } from '@/db/queries/insert';
import { getFactsFromLLM } from './facts';
import { generateEmbeddings } from './embedding';

export const createResource = async (userID: string, content: string) => {
  try {
    // Get facts from LLM
    const facts = await getFactsFromLLM(content);

    // store resource
    if (facts.length > 0) {
      const resourceId = await insertResource(userID, content);

      const embeddings = await generateEmbeddings(facts);

      const embeddingsData = embeddings.map((e) => {
        return {
          userId: userID,
          resourceId: resourceId,
          content: e.content,
          embedding: e.embedding,
        };
      });

      // store embeddings
      await insertEmbeddings(userID, embeddingsData);

      return 'Resource successfully created and embedded.';
    } else {
      return 'No facts found in resource.';
    }
  } catch (error) {
    if (error instanceof Error)
      return error.message.length > 0 ? error.message : 'Error, please try again.';
  }
};
