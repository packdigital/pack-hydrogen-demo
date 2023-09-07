import { forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

export const Markdown = forwardRef(
  ({ children, components = {}, ...props }: any, ref: any) => {
    return (
      <div ref={ref} className="react-markdown">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          components={components}
          {...props}
        >
          {children}
        </ReactMarkdown>
      </div>
    );
  },
);
