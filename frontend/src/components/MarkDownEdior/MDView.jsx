import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'react-markdown-editor-lite/lib/index.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
const MDView = ({ source }) => {
  return (
    <ReactMarkdown
      className="markdown"
      children={source}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children)}
              language={match[1]}
              style={dracula}
              PreTag="div"
              {...props}
            />
          ) : !inline ? (
            <SyntaxHighlighter children={String(children).replace(/\n$/, '')} style={dracula} PreTag="div" {...props} />
          ) : (
            <code {...props} className="markdown_inline">
              {children}
            </code>
          );
        },
      }}
    />
  );
};

export default MDView;
