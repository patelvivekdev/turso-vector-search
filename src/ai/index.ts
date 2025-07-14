import { google } from '@ai-sdk/google';
import { customProvider } from 'ai';

// Gemini models : https://ai.google.dev/gemini-api/docs/models/gemini
// Google Embedding Models : https://ai.google.dev/gemini-api/docs/models/#text-embedding
export const model = customProvider({
  languageModels: {
    'gemini-2.0-flash': google('gemini-2.0-flash-001'),
    'gemini-2.5-flash': google('gemini-2.5-flash'),
    'gemini-2.5-pro': google('gemini-2.5-pro'),
  },
  textEmbeddingModels: {
    'document-embedding': google.textEmbeddingModel('gemini-embedding-001', {
      taskType: 'RETRIEVAL_DOCUMENT',
      outputDimensionality: 768,
    }),
    'query-embedding': google.textEmbeddingModel('gemini-embedding-001', {
      taskType: 'RETRIEVAL_QUERY',
      outputDimensionality: 768,
    }),
  },
});
