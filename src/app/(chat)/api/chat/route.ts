'use server';
import { convertToCoreMessages, streamText } from 'ai';
import { z } from 'zod';
import { selectCustomModel } from '@/ai';
import { createResource } from '@/ai/resources';
import { RAGPrompt } from '@/ai/prompt';
import { findRelevantContent } from '@/db/queries/search';

export async function POST(request: Request) {
  const { userId, selectedModel, messages } = await request.json();
  console.log('userId:', userId);

  const result = await streamText({
    model: selectCustomModel(selectedModel),
    system: RAGPrompt,
    messages: convertToCoreMessages(messages),
    maxSteps: 10,
    tools: {
      addResource: {
        name: 'addResource',
        description: 'Stores information or user memory in your knowledge base.',
        parameters: z.object({
          content: z.string().describe('The content or resource to add to the knowledge base.'),
        }),
        execute: async ({ content }) => {
          console.log('Storing knowledge');
          const result = await createResource(userId, content);
          console.log('Knowledge stored:', result);
          return {
            result,
          };
        },
      },
      retrieveInformation: {
        name: 'retrieveInformation',
        description:
          'Retrieves relevant information or user memory from the knowledge base based on user question.',
        parameters: z.object({
          question: z.string().describe('the users question'),
        }),
        execute: async ({ question }) => {
          console.log('Retrieving knowledge');
          const result = await findRelevantContent(userId, question, 20);

          console.log('Retrieved knowledge:', result.length);
          return { result: result };
        },
      },
    },
  });
  return result.toDataStreamResponse();
}
