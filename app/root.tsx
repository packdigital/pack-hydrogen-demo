import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useMatches,
  useRouteError,
} from '@remix-run/react';
import {Seo, ShopifySalesChannel, useShopifyCookies} from '@shopify/hydrogen';
import {SerializeFrom, type LoaderFunctionArgs} from '@shopify/remix-oxygen';

import favicon from '../public/favicon.svg';
import styles from '~/styles/app.css';

import {DEFAULT_LOCALE} from '~/lib/utils';
import {PreviewProvider} from '@pack/react';

import {useAnalytics} from '~/hooks/useAnalytics';
import {Layout} from '~/components/Layout';
import {NotFound} from '~/components/NotFound';
import {GenericError} from '~/components/GenericError';

import {registerSections} from '~/sections';
import {registerStorefrontSettings} from '~/settings';

registerSections();
registerStorefrontSettings();

export const links = () => {
  return [
    {rel: 'stylesheet', href: styles},
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {env, storefront, session, pack} = context;
  const isPreviewModeEnabled = pack.isPreviewModeEnabled();

  // const isPreviewModeEnabled = context.pack.isPreviewModeEnabled();

  const siteSettings = await pack.query(SITE_SETTINGS_QUERY);
  const layout = await context.storefront.query(LAYOUT_QUERY);

  const analytics = {
    shopifySalesChannel: ShopifySalesChannel.hydrogen,
    shopId: layout.shop.id,
  };

  return {
    siteSettings,
    layout,
    isPreviewModeEnabled,
    analytics,
    customizerMeta: pack.preview?.session.get('customizerMeta'),
  };
}

export default function App() {
  const hasUserConsent = true;
  const {siteSettings, isPreviewModeEnabled, customizerMeta} =
    useLoaderData<typeof loader>();

  useShopifyCookies({hasUserConsent});
  useAnalytics(hasUserConsent, DEFAULT_LOCALE);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Seo />
        <Meta />
        <Links />
      </head>

      <body>
        <PreviewProvider
          isPreviewModeEnabled={isPreviewModeEnabled}
          siteSettings={siteSettings}
          customizerMeta={customizerMeta}
        >
          <Layout>
            <Outlet />
          </Layout>
        </PreviewProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const useRootLoaderData = () => {
  const [root] = useMatches();
  return root?.data as SerializeFrom<typeof loader>;
};

export function ErrorBoundary({error}: {error: Error}) {
  const routeError = useRouteError();
  const isRouteError = isRouteErrorResponse(routeError);
  const rootData = useRootLoaderData();

  let title = 'Error';
  let pageType = 'page';

  if (isRouteError) {
    title = 'Not found';
    if (routeError.status === 404) pageType = routeError.data || pageType;
  }

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout {...rootData}>
          {isRouteError ? (
            <>
              {routeError.status === 404 ? (
                <NotFound type={pageType} />
              ) : (
                <GenericError
                  error={{message: `${routeError.status} ${routeError.data}`}}
                />
              )}
            </>
          ) : (
            <GenericError error={error instanceof Error ? error : undefined} />
          )}
        </Layout>
        <Scripts />
      </body>
    </html>
  );
}

const SITE_SETTINGS_QUERY = `#graphql
  query SiteSettings($version: Version) {
    siteSettings(version: $version) {
      id
      status
      settings
      publishedAt
      createdAt
      updatedAt
    }
  }
`;

const LAYOUT_QUERY = `#graphql
query layout {
  shop {
    id
    name
    description
  }
}
`;
