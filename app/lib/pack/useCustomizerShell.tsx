import {useCallback, useEffect, useState} from 'react';
import {useLocation, useNavigate} from '@remix-run/react';
import {connectToParent} from 'penpal';

export const useCustomizerShell = ({
  environment = 'production',
  isPreview,
  sectionComponents,
  staticProps,
  storefrontSettingsSchema,
}: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [pageData, setPageData] = useState<any>(null);
  const [storefrontSettings, setStorefrontSettings] = useState<any>(null);
  const [parentConnection, setParentConnection] = useState<any>(null);

  const refreshSections = useCallback(() => {
    if (!sectionComponents) return [];

    const sectionSchemas = sectionComponents
      .map((section: any) => {
        if (section.Schema && typeof section.Schema === 'function') {
          return section.Schema({...staticProps});
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
  }, [staticProps, parentConnection, sectionComponents]);

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
  }, [staticProps, parentConnection, storefrontSettingsSchema]);

  useEffect(() => {
    const connection = connectToParent({
      // Methods child is exposing to parent.
      methods: {
        routeToPage: (path: string) => {
          navigate(path);
          // Router.push(path);
        },

        scrollToSection: (sectionId: string) => {
          const sectionEl = document.querySelector(
            `[data-comp-id="${sectionId}"]`,
          );

          if (sectionEl) sectionEl.scrollIntoView({behavior: 'smooth'});
        },

        //This is the live form data from the shell that will be used to render the page.
        setPageData: (content: any) => setPageData(content),

        // This is the live storefront settings from the shell that will be used to render the page
        setStorefrontSettings: (settings: any) => {
          setStorefrontSettings(settings);
        },
      },
    });

    connection.promise.then((parent: any) => {
      const currentRoute = {
        environment,
        currentPath: location.pathname,
        template: staticProps?.template,
        templateType: staticProps?.templateType,
        handle: staticProps?.page.handle,
        title: staticProps?.page.title,
        description: staticProps?.page.description,
      };

      parent.setCurrentRoute(currentRoute);
      setParentConnection(parent);
    });
  }, []);

  useEffect(() => {
    refreshSections();
    refreshStorefrontSettingsSchema();
  }, [
    staticProps,
    refreshSections,
    refreshStorefrontSettingsSchema,
    sectionComponents,
  ]);

  // Not in preview: Return Static Data
  if (!isPreview) {
    return {
      pageData: staticProps.page || staticProps.blog || staticProps.article,
      storefrontSettings: staticProps?.settings?.settings,
    };
  }

  return {pageData, storefrontSettings};
};
