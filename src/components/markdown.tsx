/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { marked } from 'marked';
import { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  return tokens.map((token) => token.raw);
}

const components = {
  code: ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <pre
        {...props}
        className={`${className} mt-2 w-[80dvw] overflow-x-scroll rounded bg-zinc-100 p-2 text-sm md:max-w-[500px]`}
      >
        <code className={match[1]}>{children}</code>
      </pre>
    ) : (
      <code className={`${className} rounded bg-zinc-100 px-1 py-0.5 text-sm`} {...props}>
        {children}
      </code>
    );
  },
  ol: ({ node, children, ...props }: any) => {
    return (
      <ol className="ml-4 list-inside list-decimal" {...props}>
        {children}
      </ol>
    );
  },
  li: ({ node, children, ...props }: any) => {
    return (
      <li className="py-1" {...props}>
        {children}
      </li>
    );
  },
  ul: ({ node, children, ...props }: any) => {
    return (
      <ul className="ml-4 list-inside list-decimal" {...props}>
        {children}
      </ul>
    );
  },
  strong: ({ node, children, ...props }: any) => {
    return (
      <span className="font-semibold" {...props}>
        {children}
      </span>
    );
  },
};

const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => {
    return (
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.content !== nextProps.content) return false;
    return true;
  },
);

MemoizedMarkdownBlock.displayName = 'MemoizedMarkdownBlock';

export const MemoizedMarkdown = memo(({ content, id }: { content: string; id: string }) => {
  const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

  return blocks.map((block, index) => (
    <MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />
  ));
});

MemoizedMarkdown.displayName = 'MemoizedMarkdown';
