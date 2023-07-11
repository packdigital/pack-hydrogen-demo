import {Markdown as MarkdownSnippet} from '~/components/Markdown';
import {Schema} from './Markdown.schema';

export function Markdown({cms}) {
  const {centerAllText, content, section} = cms;

  return (
    <div className="px-contained py-contained">
      <div className={`mx-auto ${section?.maxWidth}`}>
        <MarkdownSnippet centerAllText={centerAllText}>
          {content}
        </MarkdownSnippet>
      </div>
    </div>
  );
}

Markdown.displayName = 'Markdown';
Markdown.Schema = Schema;
