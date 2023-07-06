import {forwardRef} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

export const Markdown = forwardRef(
  ({centerAllText, children, components = {}}: any, ref: any) => {
    return (
      <div
        ref={ref}
        className={`[&>:first-child]:mt-0 [&>:last-child]:mb-0 [&_a]:underline [&_h1]:mb-6 [&_h1]:text-center [&_h2]:mt-8 [&_h2]:mb-5 [&_h3]:mb-4 [&_h3]:mt-6 [&_h4]:mb-4 [&_h4]:mt-4 [&_h5]:mb-4 [&_h5]:mt-2 [&_h6]:mb-4 [&_li>p]:mb-0 [&_li]:mb-2 [&_ol>li]:list-decimal [&_ol]:mb-4 [&_ol]:pl-8 [&_p]:mb-4 [&_ul>li]:list-disc [&_ul]:mb-4 [&_ul]:pl-8 ${
          centerAllText
            ? '[&>h2]:text-center [&>h3]:text-center [&>h4]:text-center [&>h5]:text-center [&>h6]:text-center [&>p]:text-center'
            : ''
        }}`}
      >
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
