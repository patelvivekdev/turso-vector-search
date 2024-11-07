'use client';
import { useChat } from 'ai/react';
import { ArrowUpIcon, StopCircleIcon } from 'lucide-react';
import { useRef } from 'react';

import { Message } from '@/components/message';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useScrollToBottom } from '@/hooks/useScrollToBottom';
import { useQueryState } from 'nuqs';

export type modelType = 'google' | 'mistral';

export const Chat = ({ userId }: { userId: string }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedModel] = useQueryState('model');

  const { messages, handleSubmit, input, setInput, isLoading, stop } = useChat({
    maxSteps: 5,
    body: {
      selectedModel: selectedModel,
      userId: userId,
    },
  });

  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-12rem)] flex-col">
      <div ref={messagesContainerRef} className="h-full w-full overflow-y-scroll">
        <div className="mx-auto flex w-11/12 flex-col items-center gap-4 pt-4 sm:w-5/6">
          {messages.length === 0 && (
            <Message
              content="Hi, I'm your personal assistant. How can I help you today?"
              role="assistant"
            />
          )}

          {messages.length > 0 &&
            messages.map((message, index) => (
              <Message
                key={index}
                role={message.role}
                content={message.content}
                attachments={message.experimental_attachments}
                toolInvocations={message.toolInvocations}
              />
            ))}
        </div>
        <div ref={messagesEndRef} className="min-h-[24px] min-w-[24px] flex-shrink-0" />
      </div>
      <div className="h-40 p-4 sm:h-16">
        <form
          onSubmit={handleSubmit}
          className="relative mx-auto flex w-11/12 flex-col gap-4 p-2 sm:w-5/6"
        >
          <Textarea
            ref={textareaRef}
            placeholder="Type your message..."
            className="flex-1 resize-none rounded-lg border bg-background p-2 text-sm shadow-sm"
            value={input}
            onChange={handleInput}
            disabled={isLoading}
            rows={4}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSubmit();
              }
            }}
          />
          {isLoading ? (
            <Button
              type="button"
              className="absolute bottom-4 right-4"
              onClick={(event) => {
                event.preventDefault();
                stop();
              }}
              size="icon"
            >
              <StopCircleIcon className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="absolute bottom-4 right-4"
              disabled={input.length === 0}
              size="icon"
            >
              <ArrowUpIcon className="h-4 w-4" />
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};
