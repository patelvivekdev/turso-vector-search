'use client';
import { useChat } from '@ai-sdk/react';
import { ArrowUpIcon, StopCircleIcon } from 'lucide-react';
import { Message, ThinkingMessage } from '@/components/message';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useScrollToBottom } from '@/hooks/useScrollToBottom';
import { ProjectOverview } from './project-overview';

export const Chat = () => {
  const { messages, status } = useChat({
    id: 'chat',
    body: {},
    experimental_throttle: 100,
  });

  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();
  const isLoading = status === 'streaming' || status === 'submitted';

  return (
    <div className="mx-auto flex h-[calc(100dvh-12rem)] flex-col py-4">
      <div ref={messagesContainerRef} className="h-full w-full overflow-y-scroll">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 p-4 pt-4">
          {messages.length === 0 ? (
            <div className="mx-auto w-full max-w-3xl">
              <ProjectOverview />
            </div>
          ) : (
            messages?.map((m) => <Message key={m.id} message={m} />)
          )}
          {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
            <ThinkingMessage />
          )}
        </div>
        <div ref={messagesEndRef} className="min-h-[24px] min-w-[24px] flex-shrink-0" />
      </div>
      <MessageInput />
    </div>
  );
};

const MessageInput = () => {
  const { input, handleSubmit, handleInputChange, status, stop } = useChat({ id: 'chat' });
  const isLoading = status === 'streaming' || status === 'submitted';
  return (
    <div className="h-40 p-4 sm:h-16">
      <form onSubmit={handleSubmit} className="relative mx-auto flex max-w-3xl flex-col gap-4 p-2">
        <Textarea
          placeholder="Type your message..."
          className="bg-muted min-h-[24px] resize-none overflow-x-auto rounded-xl text-base"
          value={input}
          onChange={handleInputChange}
          disabled={status === 'streaming'}
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
            className="absolute right-4 bottom-4"
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
            className="absolute right-4 bottom-4"
            disabled={input.length === 0}
            size="icon"
          >
            <ArrowUpIcon className="h-4 w-4" />
          </Button>
        )}
      </form>
    </div>
  );
};
