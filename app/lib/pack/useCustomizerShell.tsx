import {useCallback, useEffect, useState} from 'react';
import {useLocation, useNavigate} from '@remix-run/react';
import {connectToParent} from 'penpal';

export const useCustomizerShell = ({
  environment = 'production',
  isPreview,
  sectionComponents,
  data = {},
  storefrontSettingsSchema,
}: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [content, setContent] = useState<any>(data.content);
  const [storefrontSettings, setStorefrontSettings] = useState<any>(null);
  const [parentConnection, setParentConnection] = useState<any>(null);

  const refreshSections = useCallback(() => {
    if (!sectionComponents) return [];

    const sectionSchemas = sectionComponents
      .map((section: any) => {
        if (section.Schema && typeof section.Schema === 'function') {
          return section.Schema({...data});
        }

        return section.Schema;
      })
      .filter(Boolean);

    if (parentConnection) {
      try {
        const sectionSchemasString = JSON.stringify(sectionSchemas);
        parentConnection.setSectionsSchemas(sectionSchemasString);
      } catch (error) {
        console.error(error);
        // parentConnection.displayError('Something went wrong parsing sections');
      }
    }
  }, [data, parentConnection, sectionComponents]);

  const refreshStorefrontSettingsSchema = useCallback(() => {
    if (!storefrontSettingsSchema) return [];

    const storefrontSettingsSchemaString = JSON.stringify(
      storefrontSettingsSchema,
    );

    if (parentConnection && sectionComponents) {
      parentConnection.setStorefrontSettingsSchema(
        storefrontSettingsSchemaString,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, parentConnection, storefrontSettingsSchema]);

  useEffect(() => {
    if (!isPreview) return;

    const connection = connectToParent({
      // Methods child is exposing to parent.
      methods: {
        routeToPage(path: string) {
          navigate(path);
        },
        scrollToSection(sectionId: string) {
          const sectionEl = document.querySelector(
            `[data-comp-id="${sectionId}"]`,
          );

          if (sectionEl) sectionEl.scrollIntoView({behavior: 'smooth'});
        },
        setPageData(content: any) {
          setContent(content);
        },
        setStorefrontSettings(settings: any) {
          setStorefrontSettings(settings);
        },
      },
    });

    connection.promise.then((parent: any) => {
      const {template, templateType, content} = data;

      parent.setCurrentRoute({
        environment,
        currentPath: location.pathname,
        template,
        templateType,
        handle: content.handle,
        title: content.title,
        description: content.description,
      });
      setParentConnection(parent);
    });
  }, []);

  useEffect(() => {
    if (!isPreview) return;
    refreshSections();
    refreshStorefrontSettingsSchema();
  }, [
    data,
    isPreview,
    refreshSections,
    refreshStorefrontSettingsSchema,
    sectionComponents,
  ]);

  // Not in preview: Return Static Data
  if (!isPreview) {
    return {
      content: data.content,
      storefrontSettings: data.settings?.settings,
    };
  }

  return {content, storefrontSettings};
};
