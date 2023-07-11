import {v4 as uuidv4} from 'uuid';
import sections from '~/sections';
import {useCustomizerShell} from './useCustomizerShell';

function Sections({pageData, pageSections}: any) {
  const componentMap =
    sections?.reduce((compMap: any, Component: any) => {
      let schemaKey;

      if (Component?.Schema && typeof Component?.Schema === 'function') {
        schemaKey = Component.Schema(pageData)?.key;
      } else {
        schemaKey = Component.Schema?.key;
      }

      if (!schemaKey) {
        return compMap;
      }

      compMap[schemaKey] = Component;

      return compMap;
    }, {}) || {};

  const renderedSections = pageSections
    .map((section: any) => {
      // TODO: Return a consistent data structure from the API and the customizer
      // Normalize section data
      const data = section.data || section;
      const CompSchemaKey = data._template;
      const Comp = componentMap[CompSchemaKey];

      if (!Comp) return null;

      return (
        <section
          key={uuidv4()}
          data-comp={CompSchemaKey}
          data-comp-id={section?.id}
          hidden={data?.sectionVisibility === 'hidden'}
        >
          <Comp comp-name={CompSchemaKey} cms={data} />
        </section>
      );
    })
    .filter(Boolean);

  return <>{renderedSections}</>;
}

export function RenderSections({pageData}: any) {
  const {pageData: livePageData, storefrontSettings} = useCustomizerShell({
    environment: 'production',
    isPreview: true,
    sectionComponents: sections,
    staticProps: {
      page: pageData,
      template: pageData.template?.type,
      templateType: pageData.template?.type,
      handle: pageData.handle,
      title: pageData.title,
      description: pageData.description,
    },
    storefrontSettingsSchema: {},
  });

  const pageDataSections =
    livePageData?.sections?.nodes || livePageData?.sections;

  if (!pageDataSections) return null;

  return <Sections pageData={livePageData} pageSections={pageDataSections} />;
}
