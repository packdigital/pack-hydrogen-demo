import {forwardRef} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

export const Markdown = forwardRef(
  ({children, components = {}}: any, ref: any) => {
    return (
      <div ref={ref}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          components={components}
        >
          {children}
        </ReactMarkdown>
      </div>
    );
  },
);
