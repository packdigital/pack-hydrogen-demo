# Hydrogen template: Pack Starter Kit

Hydrogen is Shopify’s stack for headless commerce. Hydrogen is designed to dovetail with [Remix](https://remix.run/), Shopify’s full stack web framework. This template contains a **minimal setup** of components, queries and tooling to get started with Hydrogen.

- [Check out Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)
- [Get familiar with Remix](https://remix.run/docs/en/v1)

Pack provides a Hydrgoen Starter Kit template to take advantage of the Pack's visual experience manager, called the Customizer!
- [Pack Product Documentation](https://docs.packdigital.com/)
- [Pack Developer Handbook](https://developer.packdigital.com/6D88mGp3mj4aSSO0BN30)

## What's included

- Remix
- Hydrogen
- Oxygen
- Shopify CLI
- ESLint
- Prettier
- GraphQL generator
- TypeScript and JavaScript flavors
- **NEW! Pack StarterKit Components, Hooks, and Routes**

## Getting started

### Requirements

- Node.js version 16.14.0 or higher

### Environment Variables
Before you can run your application locally, you will need to create an `.env` file at the root of your project with your shop's domain and Storefront API token.  You can copy the necessary values from the Pack Storfront by going to `Settings -> Developer`, then `Copy All` under the `Storefront Variables` section.  See the example below:

```
SESSION_SECRET="XXX"
SHOPIFY_ADMIN_API_TOKEN="XXX"
PUBLIC_STORE_DOMAIN="XXX"
PACK_PUBLIC_TOKEN="XXX"
PACK_SECRET_TOKEN="XXX"
```

### Building for production
This command will simulate the same deployment job that Shopify Oxygen will use when deploying your live site.

```bash
npm run build
```

### Building for local development
This command will start a server locally on your machine at http://localhost:3000.

```bash
npm run dev
```

## Pack Cusotmizer Content
You can access the data in the Pack Customizer by using the `pack` object that lives in the Hydrogen `context`.  See the following example:
```
export async function loader({params, context, request}: LoaderArgs) {
  const {handle} = params;
  const storeDomain = context.storefront.getShopifyDomain();

  const searchParams = new URL(request.url).searchParams;
  const selectedOptions: any = [];

  // set selected options from the query string
  searchParams.forEach((value, name) => {
    selectedOptions.push({name, value});
  });

  const {data} = await context.pack.query(PRODUCT_PAGE_QUERY, {
    variables: {handle},
  });

  const {product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions,
    },
  });

  ...
}
```
The `data` object will contain all the Pack Section Setting content provided by CMS Authors in the Customizer. This data will be define per each Section's Setting schema. While the `product` object will contain any Shopify speficic data provided by the Storefront API.

See https://docs.packdigital.com/for-developers/section-api/schema.

### Caching
Pack is leveraging the same Caching Strategy available with the Hydrogen framework. For an example of this, see `app/lib/pack/create-pack-client.ts`

**NOTE:** In the future, the `lib/pack` library will be moved into it's own NPM package proided by Pack.

```
export function createPackClient(options: CreatePackClientOptions): Pack {
  const {apiUrl, cache, waitUntil, preview, contentEnvironment} = options;
  const previewEnabled = !!preview?.session.get('enabled');
  const previewEnvironment = preview?.session.get('environment');

  return {
    preview,
    isPreviewModeEnabled: () => previewEnabled,
    async query<T = any>(
      query: string,
      {variables, cache: strategy = CacheLong()}: QueryOptions = {},
    ) {
      const queryHash = await hashQuery(query, variables);
      const withCache = createWithCache<QueryResponse<T>>({
        cache,
        waitUntil,
      });

      // The preview environment takes precedence over the content environment
      // provided when creating the client
      const environment =
        previewEnvironment || contentEnvironment || PRODUCTION_ENVIRONMENT;
      const fetchOptions = {
        apiUrl,
        query,
        variables,
        token: options.token,
        previewEnabled,
        contentEnvironment: environment,
      };

      // Preview mode always bypasses the cache
      if (previewEnabled) return packFetch<T>(fetchOptions);

      return withCache(queryHash, strategy, () => packFetch<T>(fetchOptions));
    },
  };
}
```

## Data Layer
The Pack StarterKit will submit `pageView` and `addToCart` (coming soon) to Shopify Analytics via the Hydrogen hook. See the following article for more details:
https://shopify.dev/docs/api/hydrogen/2023-07/utilities/sendshopifyanalytics

For example on how events are submitted view the `products` route (`app/routes/products.$handle.tsx`):
```
export async function loader({params, context, request}: LoaderArgs) {
  ...
  
   if (!data.productPage) {
    throw new Response(null, {status: 404});
  }
  // optionally set a default variant, so you always have an "orderable" product selected
  const selectedVariant =
    product.selectedVariant ?? product?.variants?.nodes[0];

  const productAnalytics: ShopifyAnalyticsProduct = {
    productGid: product.id,
    variantGid: selectedVariant.id,
    name: product.title,
    variantName: selectedVariant.title,
    brand: product.vendor,
    price: selectedVariant.price.amount,
  };
  const analytics = {
    pageType: AnalyticsPageType.product,
    resourceId: product.id,
    products: [productAnalytics],
    totalValue: parseFloat(selectedVariant.price.amount),
  };

  return defer({
    product,
    productPage: data.productPage,
    selectedVariant,
    storeDomain,
    analytics,
  });
}
```
