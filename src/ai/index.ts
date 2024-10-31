import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';
import { ragMiddleware } from './rag-middleware';
import { google } from '@ai-sdk/google';

const geminiModel = google('gemini-1.5-pro-002');

export const customModel = wrapLanguageModel({
  model: geminiModel,
  middleware: ragMiddleware,
});
