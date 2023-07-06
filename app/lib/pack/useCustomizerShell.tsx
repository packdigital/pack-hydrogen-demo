import {useCallback, useEffect, useState} from 'react';
import {connectToParent} from 'penpal';
import {useNavigate, useNavigation} from 'react-router-dom';

export const useCustomizerShell = ({
  environment = 'production',
  isPreview,
  sectionComponents,
  staticProps,
  storefrontSettingsSchema,
}: any) => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [_pageData, _setPageData] = useState<any>(null);
  const [_storefrontSettings, _setStorefrontSettings] = useState<any>(null);
  const [parentConnection, setParentConnection] = useState<any>(null);
  const [isRouteChanging, setIsRouteChanging] = useState<boolean>(false);

  const _refreshSections = useCallback(() => {
    if (!sectionComponents) return [];

    const sectionSchemas = sectionComponents
      .map((section: any) => {
        if (section.Schema && typeof section.Schema === 'function') {
          const qualifiedSchema = section.Schema({...staticProps});
          return qualifiedSchema;
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

  const _refreshStorefrontSettingsSchema = useCallback(() => {
    if (!storefrontSettingsSchema) return [];
    const storefrontSettingsSchemaString = JSON.stringify(
      storefrontSettingsSchema,
    );

    if (parentConnection) {
      if (sectionComponents) {
        parentConnection.setStorefrontSettingsSchema(
          storefrontSettingsSchemaString,
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staticProps, parentConnection, storefrontSettingsSchema]);

  // const handleRouteChangeStart = (url) => {
  //   const currentRoute = {
  //     environment,
  //     currentPath: url,
  //     // template: staticProps?.template, // !! Could possible change with GSProps specs
  //     // templateType: staticProps?.templateType,
  //     // handle: staticProps?.pageHandle,
  //     // title: staticProps?.pageTitle,
  //     // description: staticProps?.pageDescription,
  //   };

  //   if (url !== Router.asPath) {
  //     setIsRouteChanging(true);
  //   }

  //   if (parentConnection) {
  //     parentConnection.onRouteChange(true);
  //     parentConnection.setCurrentRoute(currentRoute);
  //   }
  // };

  // const handleRouteChangeComplete = (url) =>
  //   url === Router.asPath && setIsRouteChanging(false);

  // useEffect(() => {
  //   Router.events.on('routeChangeStart', handleRouteChangeStart);
  //   Router.events.on('routeChangeComplete', handleRouteChangeComplete);
  //   Router.events.on('routeChangeError', handleRouteChangeComplete);

  //   return () => {
  //     Router.events.off('routeChangeStart', handleRouteChangeStart);
  //     Router.events.off('routeChangeComplete', handleRouteChangeComplete);
  //     Router.events.off('routeChangeError', handleRouteChangeComplete);
  //   };
  // }, [handleRouteChangeStart, handleRouteChangeComplete]);

  useEffect(() => {
    const currentRoute = {
      environment,
      currentPath: navigation.location,
      // template: staticProps?.template, // !! Could possible change with GSProps specs
      // templateType: staticProps?.templateType,
      // handle: staticProps?.pageHandle,
      // title: staticProps?.pageTitle,
      // description: staticProps?.pageDescription,
    };

    if (navigation.state === 'loading') {
      setIsRouteChanging(true);

      if (parentConnection) {
        parentConnection.onRouteChange(true);
        parentConnection.setCurrentRoute(currentRoute);
      }
    }

    if (navigation.state === 'idle') {
      setIsRouteChanging(false);
    }
  }, [navigation.state, navigation.location, environment, parentConnection]);

  useEffect(() => {
    if (parentConnection) {
      parentConnection.onRouteChange(isRouteChanging);
    }
  }, [isRouteChanging, parentConnection]);

  useEffect(() => {
    const connection = connectToParent({
      // Methods child is exposing to parent.
      // parentOrigin: 'http://localhost:3000', // TODO: make this the platform URL
      // parentOrigin: 'https://backpack-platform.herokuapp.com', // TODO: make this the platform URL
      methods: {
        routeToPage: (path: string) => {
          navigate(path);
          // Router.push(path);
        },

        scrollToSection: (sectionId: string) => {
          const sectionEl = document.querySelector(
            `[data-comp-id="${sectionId}"]`,
          );

          if (sectionEl) {
            sectionEl.scrollIntoView({
              behavior: 'smooth',
            });
          }
        },
        /**
         * This is the live form data from the shell that will be used to render the page.
         * @param {Object} content : The page content data from form to be rendered;
         */
        setPageData: (content: any) => {
          _setPageData(content);
        },
        /**
         * This is the live storefront settings from the shell that will be used to render the page.
         * @param {*} settings : The storefront settings data from form to be rendered;
         */
        setStorefrontSettings: (settings: any) => {
          _setStorefrontSettings(settings);
        },
      },
    });

    async function setConnectionMethods() {
      try {
        const newParentConnection = await connection.promise;

        setParentConnection(newParentConnection);
      } catch (e) {
        console.error(
          'Error when trying to connect Frame to Customizer Shell.',
          e,
        );
      }
    }

    setConnectionMethods();
  }, []);

  // Inform the Customizer shell which page we are on.
  useEffect(() => {
    if (parentConnection) {
      const currentRoute = {
        environment,
        currentPath: navigation.location,
        template: staticProps?.template, // !! Could possible change with GSProps specs
        templateType: staticProps?.templateType,
        handle: staticProps?.pageHandle,
        title: staticProps?.pageTitle,
        description: staticProps?.pageDescription,
      };

      parentConnection.setCurrentRoute(currentRoute);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentConnection, staticProps]);

  useEffect(() => {
    _refreshSections();
    _refreshStorefrontSettingsSchema();
  }, [
    staticProps,
    _refreshSections,
    _refreshStorefrontSettingsSchema,
    sectionComponents,
  ]);

  // Not in preview: Return Static Data
  if (!isPreview) {
    return {
      pageData: staticProps.page || staticProps.blog || staticProps.article,
      storefrontSettings: staticProps?.settings?.settings,
    };
  }

  return {
    pageData: _pageData,
    error: null,
    storefrontSettings: _storefrontSettings,
  };
};
