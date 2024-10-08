"use server";
import { streamText } from "ai";
import { CoreMessage } from "ai";
import { createStreamableValue } from "ai/rsc";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { findRelevantContent } from "@/lib/ai/embedding";
import { createResource } from "@/lib/ai/resources";

export async function sendMessage(messages: CoreMessage[]) {
  const stream = createStreamableValue();

  // create embedding and save to db
  await createResource(messages[messages.length - 1].content as string);

  try {
    (async () => {
      const { textStream } = await streamText({
        model: google("gemini-1.5-pro"),
        system: `You are a helpful assistant. 
            Try to find user information from knowledge base to answer questions.
            
            If you find the user's name include in your first response.

            example
            user: hey!
            🤖: Hello! Vivek

            If you don't find the user's name then just normal conversation.
            user: hey!
            🤖: Hello! How can I assist you today?,

            `,
        messages: messages,
        maxSteps: 5,
        tools: {
          getInformation: {
            description: `get information or memories from your knowledge base to answer questions.`,
            parameters: z.object({
              question: z.string().describe("the users question"),
            }),
            execute: async ({ question }) => {
              return await findRelevantContent(question);
            },
          },
        },
      });

      for await (const text of textStream) {
        stream.update(text);
      }
      stream.done();
    })();

    return {
      oldMessages: messages,
      newMessage: stream.value,
    };
  } catch (error) {
    console.error("Error in sendMessage:", error);
    stream.done();
    return {
      oldMessages: messages,
      newMessage: stream.value,
    };
  }
}
