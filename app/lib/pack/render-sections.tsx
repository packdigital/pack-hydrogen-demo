import {v4 as uuidv4} from 'uuid';
import sectionComponents from '~/sections';
import storefrontSettingsSchema from '~/settings';
import {useCustomizerShell} from './useCustomizerShell';
import {usePreviewContext} from '~/lib/pack/preview/PreviewContent';

function Sections({content, sections}: any) {
  const componentMap =
    sectionComponents?.reduce((compMap: any, Component: any) => {
      let schemaKey;

      if (Component?.Schema && typeof Component?.Schema === 'function') {
        schemaKey = Component.Schema(content)?.key;
      } else {
        schemaKey = Component.Schema?.key;
      }

      if (!schemaKey) return compMap;

      compMap[schemaKey] = Component;

      return compMap;
    }, {}) || {};

  const renderedSections = sections
    .map((section: any) => {
      // TODO: Return a consistent data structure from the API and the customizer
      // Normalize section data
      const data = section.data || section;
      const schemaKey = data._template;
      const Component = componentMap[schemaKey];

      if (!Component) return null;

      return (
        <section
          key={uuidv4()}
          data-comp={schemaKey}
          data-comp-id={section?.id}
          hidden={data?.sectionVisibility === 'hidden'}
        >
          <Component comp-name={schemaKey} cms={data} />
        </section>
      );
    })
    .filter(Boolean);

  return <>{renderedSections}</>;
}

export function RenderSections({content}: any) {
  const preview = usePreviewContext();

  const {content: liveContent, storefrontSettings} = useCustomizerShell({
    environment: 'production',
    isPreview: preview,
    sectionComponents,
    data: {
      content,
      template: content.template?.type,
      templateType: content.template?.type,
      handle: content.handle,
      title: content.title,
      description: content.description,
    },
    storefrontSettingsSchema,
  });

  const sections = liveContent?.sections?.nodes || liveContent?.sections;

  if (!sections) return null;

  return <Sections content={liveContent} sections={sections} />;
}
