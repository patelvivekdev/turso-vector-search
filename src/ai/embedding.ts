'use server';
import { embed, embedMany } from 'ai';
import { mixedBredModel, mixedBredSearchModel } from '@/ai';

// Convert user information to embeddings
export const generateEmbeddings = async (
  facts: string[],
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const { embeddings } = await embedMany({
    model: mixedBredModel,
    values: facts,
  });
  return embeddings.map((e, i) => ({ content: facts[i], embedding: e }));
};

// Convert the user query/input to an embedding
export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll('\n', ' ');
  const { embedding } = await embed({
    model: mixedBredSearchModel,
    value: input,
  });
  return embedding;
};
