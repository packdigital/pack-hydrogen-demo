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
    if (!sectionComponents || !parentConnection) return [];

    const sectionSchemas = sectionComponents
      .map((section: any) => {
        return typeof section.Schema === 'function'
          ? section.Schema(data)
          : section.Schema;
      })
      .filter(Boolean);

    try {
      parentConnection.setSectionsSchemas(JSON.stringify(sectionSchemas));
    } catch (error) {
      parentConnection.displayError('Something went wrong parsing sections');
    }
  }, [data, parentConnection, sectionComponents]);

  const refreshStorefrontSettingsSchema = useCallback(() => {
    if (!storefrontSettingsSchema || !parentConnection || !sectionComponents) {
      return [];
    }

    parentConnection.setStorefrontSettingsSchema(
      JSON.stringify(storefrontSettingsSchema),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, parentConnection, storefrontSettingsSchema]);

  useEffect(() => {
    if (!isPreview) return;

    const connection = connectToParent({
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

  if (!isPreview) {
    return {content: data.content, storefrontSettings: data.settings?.settings};
  }

  return {content, storefrontSettings};
};
