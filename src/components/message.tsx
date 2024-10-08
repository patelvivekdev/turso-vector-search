"use client";

import { motion } from "framer-motion";
import { CoreMessage } from "ai";
import { Markdown } from "./markdown";
import { BotIcon } from "./Icon";
import { UserIcon } from "lucide-react";

export const Message = ({ message }: { message: CoreMessage }) => {
  const text = typeof message.content === "string" ? message.content : "";

  return (
    <motion.div
      className={`flex flex-row gap-4 px-4 w-full ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div
        className={`flex items-start space-x-2 max-w-[80%] ${
          message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
        }`}
      >
        <div className="size-[24px] flex flex-col justify-center items-center flex-shrink-0 text-zinc-900">
          {message.role !== "user" ? (
            <BotIcon width={24} height={24} className="rounded-full" />
          ) : (
            <UserIcon width={24} height={24} className="rounded-full" />
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <div className="text-zinc-800 flex flex-col gap-4">
            <Markdown>{text}</Markdown>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
