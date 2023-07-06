'use client';
import {v4 as uuidv4} from 'uuid';
import sections from '~/sections';

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
      const {data} = section;
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
  const pageDataSections = pageData?.sections?.nodes;

  if (!pageDataSections) {
    return null;
  }

  return <Sections pageData={pageData} pageSections={pageDataSections} />;
}
