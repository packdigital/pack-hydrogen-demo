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
import {DEFAULT_LOCALE} from './lib/utils';
import styles from './styles/app.css';
import favicon from '../public/favicon.svg';
import {Layout} from './components/Layout';
import {NotFound} from './components/NotFound';
import {GenericError} from './components/GenericError';
import {LoaderArgs} from '@shopify/remix-oxygen';
import {PreviewProvider} from '~/lib/pack';
import {useAnalytics} from '~/hooks/useAnalytics';

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

export async function loader({context}: LoaderArgs) {
  const isPreviewModeEnabled = context.pack.isPreviewModeEnabled();

  const siteSettings = await context.pack.query(SITE_SETTINGS_QUERY);
  const layout = await context.storefront.query(LAYOUT_QUERY);

  const analytics = {
    shopifySalesChannel: ShopifySalesChannel.hydrogen,
    shopId: layout.shop.id,
  };

  return {siteSettings, layout, isPreviewModeEnabled, analytics};
}

export default function App() {
  const hasUserConsent = true;
  const {siteSettings, layout, isPreviewModeEnabled} = useLoaderData();
  const {name} = layout.shop;

  console.log('siteSettings: ', siteSettings);

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
        <PreviewProvider preview={isPreviewModeEnabled}>
          <Layout title={name}>
            <Outlet />
          </Layout>
        </PreviewProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({error}: {error: Error}) {
  const [root] = useMatches();
  const locale = root?.data?.selectedLocale ?? DEFAULT_LOCALE;
  const routeError = useRouteError();
  const isRouteError = isRouteErrorResponse(routeError);

  let title = 'Error';
  let pageType = 'page';

  if (isRouteError) {
    title = 'Not found';
    if (routeError.status === 404) pageType = routeError.data || pageType;
  }

  return (
    <html lang={locale.language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout title="Not found" key={`${locale.language}-${locale.country}`}>
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
      seo {
        title
        description
        keywords
      }
      favicon
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
