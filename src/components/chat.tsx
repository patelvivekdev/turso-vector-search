'use client';
import { useChat } from 'ai/react';
import { ArrowUpIcon, StopCircleIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { Message, ThinkingMessage } from '@/components/message';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useScrollToBottom } from '@/hooks/useScrollToBottom';
import { useQueryState } from 'nuqs';

export type modelType = 'google' | 'mistral';

export const Chat = ({ userId }: { userId: string }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedModel] = useQueryState('model');

  const { messages, handleSubmit, input, setInput, isLoading, stop } = useChat({
    body: {
      selectedModel: selectedModel,
      userId: userId,
    },
  });

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, []);

  const [localStorageInput, setLocalStorageInput] = useLocalStorage('input', '');

  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      const domValue = textareaRef.current.value;
      // Prefer DOM value over localStorage to handle hydration
      const finalValue = domValue || localStorageInput || '';
      setInput(finalValue);
      adjustHeight();
    }
    // Only run once after hydration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLocalStorageInput(input);
  }, [input, setLocalStorageInput]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-12rem)] flex-col py-4">
      <div ref={messagesContainerRef} className="h-full w-full overflow-y-scroll">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 p-4 pt-4">
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

          {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
            <ThinkingMessage />
          )}
        </div>
        <div ref={messagesEndRef} className="min-h-[24px] min-w-[24px] flex-shrink-0" />
      </div>
      <div className="h-40 p-4 sm:h-16">
        <form
          onSubmit={handleSubmit}
          className="relative mx-auto flex max-w-3xl flex-col gap-4 p-2"
        >
          <Textarea
            ref={textareaRef}
            placeholder="Type your message..."
            className="max-h-[calc(75dvh)] min-h-[24px] resize-none overflow-hidden rounded-xl bg-muted text-base"
            value={input}
            onChange={handleInput}
            disabled={isLoading}
            rows={4}
            autoFocus
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                if (isLoading) {
                  return;
                }
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
