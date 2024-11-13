'use client';

import { motion } from 'framer-motion';
import { Attachment, ToolInvocation } from 'ai';
import { ReactNode } from 'react';
import { Markdown } from './markdown';
import { BotIcon } from './Icon';
import { UserIcon } from 'lucide-react';

export const Message = ({
  role,
  content,
  toolInvocations,
}: {
  role: string;
  content: string | ReactNode;
  toolInvocations?: Array<ToolInvocation> | undefined;
  attachments?: Array<Attachment>;
}) => {
  if (!content && toolInvocations) {
    return null;
  }
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
            <span className="rounded-full border border-black p-1">
              <BotIcon width={24} height={24} className="rounded-full" />
            </span>
          ) : (
            <span className="rounded-full border border-black p-1">
              <UserIcon width={24} height={24} className="rounded-full" />
            </span>
          )}
        </div>

        <div className="flex w-full flex-col gap-1">
          {content && (
            <div className="flex flex-col gap-4 text-zinc-800 dark:text-zinc-300">
              <Markdown>{content as string}</Markdown>
            </div>
          )}

          {toolInvocations && (
            <div className="flex flex-col gap-4">
              {toolInvocations.map((toolInvocation) => {
                return <div key={toolInvocation.toolCallId}>🔧Tool: {toolInvocation.toolName}</div>;
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
