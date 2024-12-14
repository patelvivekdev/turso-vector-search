import { convertToCoreMessages, CoreTool, smoothStream, streamText } from 'ai';
import { z } from 'zod';
import { selectCustomModel } from '@/ai';
import { createResource } from '@/ai/resources';
import { RAGPrompt } from '@/ai/prompt';
import { findRelevantContent } from '@/db/queries/search';
import { auth } from '@/app/(auth)/auth';
import { redirect } from 'next/navigation';
export const maxDuration = 60;

export async function POST(request: Request) {
  // perform auth check so api end point is protected
  const session = await auth();
  if (!session?.user || !session.user.userId) {
    return redirect('/');
  }

  const userId = session.user.userId;

  const { selectedModel, messages } = await request.json();

  const result = streamText({
    model: selectCustomModel(selectedModel),
    system: RAGPrompt,
    messages: convertToCoreMessages(messages),
    maxSteps: 15,
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
      } as CoreTool,
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
      } as CoreTool,
    },
    experimental_transform: smoothStream({
      delayInMs: 20,
    }),
  });

  return result.toDataStreamResponse();
}
