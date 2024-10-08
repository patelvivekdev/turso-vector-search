"use client";

import { useState } from "react";
import { CoreMessage } from "ai";
import { Message } from "@/components/message";
import { sendMessage } from "@/actions/chat";
import { readStreamableValue } from "ai/rsc";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon } from "./Icon";
import { useScrollAnchor } from "@/hooks/use-scroll-anchor";

const Chat = () => {
  const [messages, setMessages] = useState<Array<CoreMessage>>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { messagesRef, scrollRef, visibilityRef } = useScrollAnchor();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (input.trim() === "" || isLoading) {
      return;
    }

    setIsLoading(true);

    const userMessage: CoreMessage = { role: "user", content: input };
    setInput("");
    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      { role: "assistant", content: "Loading...", id: "loading" },
    ]);

    try {
      const { oldMessages, newMessage } = await sendMessage([
        ...messages,
        userMessage,
      ]);

      let textContent = "";
      for await (const delta of readStreamableValue(newMessage)) {
        textContent += delta;
        setMessages([
          ...oldMessages,
          { role: "assistant", content: textContent },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "I'm sorry, but I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 rounded-lg border bg-background p-4 shadow">
      <div className="flex h-full flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b pb-4">
          <h2 className="text-lg font-medium text-foreground">
            🤖 Chatbot With Turso Vector Search
          </h2>
          <h2 className="text-md font-semibold text-center border border-red-400 bg-red-200 rounded-md p-4">
            ⚠️ This is a demo application using Turso. Database might have some
            information missing or incorrect.
          </h2>
        </div>
        <ScrollArea className="h-[45vh] sm:h-[65vh]" ref={scrollRef}>
          <div ref={messagesRef} className="flex flex-col gap-3 pb-4">
            {messages.length === 0 && (
              <Message
                message={{
                  role: "assistant",
                  content: "Hello, how can I assist you today?",
                }}
              />
            )}

            {messages.length > 0 &&
              messages.map((message, index) => (
                <Message key={index} message={message} />
              ))}
            <div ref={visibilityRef} />
          </div>
        </ScrollArea>
        <div className="mt-4 flex items-center gap-2 ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-end sm:flex-row w-full gap-4 p-4"
          >
            <Textarea
              placeholder="Type your message..."
              className="flex-1 resize-none rounded-lg border bg-background p-2 text-sm shadow-sm"
              value={input}
              disabled={isLoading}
              rows={5}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isLoading}
            >
              <SendIcon className="h-4 w-4" />
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
