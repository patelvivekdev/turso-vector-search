'use client';

import { motion } from 'motion/react';
import { Attachment, ToolInvocation } from 'ai';
import { ReactNode } from 'react';
import { MemoizedMarkdown } from './markdown';
import { BotIcon } from './Icon';
import { Loader2, UserIcon } from 'lucide-react';

export const Message = ({
  id,
  role,
  content,
  toolInvocations,
}: {
  id: string;
  role: string;
  content: string | ReactNode;
  toolInvocations?: Array<ToolInvocation> | undefined;
  attachments?: Array<Attachment>;
}) => {
  const isToolCalling = toolInvocations && toolInvocations[0].state !== 'result';

  if (isToolCalling) {
    return (
      <motion.div
        className={`flex w-full flex-row gap-4 ${role === 'user' ? 'justify-end' : 'justify-start'}`}
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div
          className={`flex max-w-[90%] items-start space-x-2 ${
            role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
          }`}
        >
          <div className="flex size-[28px] flex-shrink-0 flex-col items-center justify-center text-zinc-900">
            {role !== 'user' ? (
              <span className="rounded-lg border border-black p-1">
                <BotIcon width={24} height={24} className="rounded-lg" />
              </span>
            ) : (
              <span className="rounded-lg border border-black p-1">
                <UserIcon width={24} height={24} className="rounded-lg" />
              </span>
            )}
          </div>

          <div className="flex w-full flex-col gap-1">
            <div className="flex flex-col gap-4">
              <Loader2 className="animate-spin" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (content) {
    return (
      <motion.div
        className={`flex w-full flex-row gap-4 ${role === 'user' ? 'justify-end' : 'justify-start'}`}
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div
          className={`flex max-w-[80%] items-start space-x-2 ${
            role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
          }`}
        >
          <div className="flex size-[28px] flex-shrink-0 flex-col items-center justify-center text-zinc-900">
            {role !== 'user' ? (
              <span className="rounded-lg border border-black p-1">
                <BotIcon width={24} height={24} className="rounded-lg" />
              </span>
            ) : (
              <span className="rounded-lg border border-black p-1">
                <UserIcon width={24} height={24} className="rounded-lg" />
              </span>
            )}
          </div>

          <div className="flex w-full flex-col gap-1">
            <div className="flex flex-col gap-4 text-zinc-800 dark:text-zinc-300">
              <MemoizedMarkdown id={id} content={content as string} />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
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
            <div className="flex flex-col gap-4 text-muted-foreground">Thinking...</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
