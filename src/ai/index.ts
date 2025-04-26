import { google } from '@ai-sdk/google';
import { customProvider } from 'ai';

// Gemini models : https://ai.google.dev/gemini-api/docs/models/gemini
// Google Embedding Models : https://ai.google.dev/gemini-api/docs/models/#text-embedding
export const model = customProvider({
  languageModels: {
    'gemini-2.0-flash': google('gemini-2.0-flash-001'),
    'gemini-2.5-flash': google('gemini-2.5-flash-preview-04-17'),
    'gemini-2.5-pro': google('gemini-2.5-pro-exp-03-25'),
  },
  textEmbeddingModels: {
    'document-embedding': google.textEmbeddingModel('text-embedding-004', {
      taskType: 'RETRIEVAL_DOCUMENT',
    }),
    'query-embedding': google.textEmbeddingModel('text-embedding-004', {
      taskType: 'RETRIEVAL_QUERY',
    }),
  },
});
