'use server';
import { embed, embedMany } from 'ai';
import { model } from '@/ai';

// Convert user information to embeddings
export const generateDocumentEmbeddings = async (
  facts: string[],
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const { embeddings } = await embedMany({
    model: model.textEmbeddingModel('document-embedding'),
    values: facts,
  });
  return embeddings.map((e, i) => ({ content: facts[i], embedding: e }));
};

// Convert the user query/input to an embedding
export const queryEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll('\n', ' ');
  const { embedding } = await embed({
    model: model.textEmbeddingModel('query-embedding'),
    value: input,
  });
  return embedding;
};
