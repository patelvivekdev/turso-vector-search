'use client';

import { motion } from 'motion/react';
import { MemoizedMarkdown } from './markdown';
import { BotIcon } from './Icon';
import { CheckCircle, Loader2, UserIcon } from 'lucide-react';
import { Message as AIMessage } from '@ai-sdk/react';

export const Message = ({ message }: { message: AIMessage }) => {
  return (
    <motion.div
      className={`flex w-full flex-row gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div
        className={`flex max-w-[80%] items-start space-x-2 ${
          message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
        }`}
      >
        <div className="flex size-[28px] flex-shrink-0 flex-col items-center justify-center text-zinc-900">
          {message.role !== 'user' ? (
            <span className="rounded-lg border border-black p-1">
              <BotIcon width={24} height={24} className="rounded-lg" />
            </span>
          ) : (
            <span className="rounded-lg border border-black p-1">
              <UserIcon width={24} height={24} className="rounded-lg" />
            </span>
          )}
        </div>

        <div className="flex w-full flex-col gap-2">
          {message.parts?.map((part, i) => {
            switch (part.type) {
              case 'text':
                return (
                  <div key={i} className="flex w-full flex-col gap-1">
                    <div className="flex flex-col gap-4 text-zinc-800 dark:text-zinc-300">
                      <MemoizedMarkdown id={message.id} content={part.text} />
                    </div>
                  </div>
                );
              case 'tool-invocation':
                const toolInvocation = part.toolInvocation;

                if (
                  toolInvocation.toolName === 'retrieveInformation' &&
                  toolInvocation.state === 'call'
                ) {
                  return (
                    <div key={i} className="flex w-full flex-row items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <p>Retrieving information...</p>
                    </div>
                  );
                }

                if (
                  toolInvocation.toolName === 'retrieveInformation' &&
                  toolInvocation.state === 'result'
                ) {
                  return (
                    <div
                      key={i}
                      className="border-border flex w-full flex-row items-center gap-2 rounded-md border bg-blue-200 p-2 text-blue-900"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <p>Found information</p>
                    </div>
                  );
                }

                if (toolInvocation.toolName === 'addResource' && toolInvocation.state === 'call') {
                  return (
                    <div key={i} className="flex w-full flex-row items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <p>Adding resource...</p>
                    </div>
                  );
                }

                if (
                  toolInvocation.toolName === 'addResource' &&
                  toolInvocation.state === 'result'
                ) {
                  return (
                    <div
                      key={i}
                      className="border-border flex w-full flex-row items-center gap-2 rounded-md border bg-green-200 p-2 text-green-900"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <p>Resource added</p>
                    </div>
                  );
                }
            }
          })}
        </div>
      </div>
    </motion.div>
  );
};

export const ThinkingMessage = () => {
  return (
    <motion.div
      className={`flex w-full flex-row justify-start gap-4`}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
    >
      <div className={`flex max-w-[90%] items-start space-x-2`}>
        <div className="flex size-[28px] flex-shrink-0 flex-col items-center justify-center text-zinc-900">
          <span className="rounded-lg border border-black p-1">
            <BotIcon width={24} height={24} className="rounded-lg" />
          </span>
        </div>

        <div className="flex w-full flex-col gap-1">
          <div className="flex flex-col gap-4 text-zinc-800 dark:text-zinc-300">
            <div className="text-muted-foreground flex flex-col gap-4">Thinking...</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
