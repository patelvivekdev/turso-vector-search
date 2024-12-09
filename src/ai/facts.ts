'use server';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { FactsPrompt } from './prompt';

// This function sends a prompt to the LLM to extract facts from the input
// You can also used messages instead of prompt to send a conversation history and get a more accurate response.
// Update the above prompt to fit your needs
export const getFactsFromLLM = async (input: string): Promise<Array<string>> => {
  const { object } = await generateObject({
    model: google('gemini-1.5-flash-002'),
    system: FactsPrompt,
    prompt: input,
    schema: z.object({
      facts: z.array(z.string()), // Expecting an array of simple text facts
    }),
  });

  // Return the list of extracted facts
  return object?.facts || [];
};
