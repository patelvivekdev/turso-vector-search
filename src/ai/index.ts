import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';
import { ragMiddleware } from './rag-middleware';
import { google } from '@ai-sdk/google';
import { mistral } from '@ai-sdk/mistral';
import { modelType } from '@/components/chat';
import { mixedbread } from 'mixedbread-ai-provider';

// Mistral models : https://docs.mistral.ai/getting-started/models/models_overview/
const mistralModel = mistral('mistral-large-latest');

// Gemini models : https://ai.google.dev/gemini-api/docs/models/gemini#gemini-1.5-pro
const geminiModel = google('gemini-2.0-flash-exp');

// Mixedbread models : https://www.mixedbread.ai/docs/embeddings/models
export const mixedBredModel = mixedbread('mixedbread-ai/mxbai-embed-large-v1', {
  prompt:
    'Generate an embedding for the following user information, capturing the key aspects for easy retrieval:',
});

export const mixedBredSearchModel = mixedbread('mixedbread-ai/mxbai-embed-large-v1', {
  prompt: 'Represent this sentence for searching relevant user information:',
});

export const selectCustomModel = (selectedModel: modelType = 'mistral') => {
  let model = mistralModel;

  if (selectedModel === 'google') {
    model = geminiModel;
  }

  const customModel = wrapLanguageModel({
    model: model,
    middleware: ragMiddleware,
  });

  return customModel;
};
