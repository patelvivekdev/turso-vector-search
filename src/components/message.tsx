"use client";

import { motion } from "framer-motion";
import { Attachment, ToolInvocation } from "ai";
import { ReactNode } from "react";
import { Markdown } from "./markdown";
import { BotIcon } from "./Icon";
import { UserIcon } from "lucide-react";

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
  return (
    <motion.div
      className={`flex flex-row gap-4 w-full ${
        role === "user" ? "justify-end" : "justify-start"
      }`}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div
        className={`flex items-start space-x-2 max-w-[90%] ${
          role === "user" ? "flex-row-reverse space-x-reverse" : ""
        }`}
      >
        <div className="size-[28px] flex flex-col justify-center items-center flex-shrink-0 text-zinc-900">
          {role !== "user" ? (
            <span className="border border-black rounded-full p-1">
              <BotIcon width={24} height={24} className="rounded-full" />
            </span>
          ) : (
            <span className="border border-black rounded-full p-1">
              <UserIcon width={24} height={24} className="rounded-full" />
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          {content && (
            <div className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4">
              <Markdown>{content as string}</Markdown>
            </div>
          )}

          {toolInvocations && (
            <div className="flex flex-col gap-4">
              {toolInvocations.map((toolInvocation) => {
                return (
                  <div key={toolInvocation.toolCallId}>
                    🔧Tool: {toolInvocation.toolName}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
