[hydrogen-pack-demo]: https://hydrogen.app
[pack-platform]: https://app.packdigital.com
[pack-digital]: https://packdigital.com
[hydrogen-framework]: https://shopify.dev/docs/custom-storefronts/hydrogen

# Pack Hydrogen Demo - A simple example storefront powered by Pack + Hydrogen

<img width="1000" alt="image" src="https://cdn.shopify.com/s/files/1/0807/6515/7649/files/Screenshot_2023-09-07_at_12.56.39_PM_1024x.png?v=1694116680">

[Demo][hydrogen-pack-demo] | [Pack Platform][pack-platform]

## About
### About Pack:
Build and manage your Custom Storefront with [Pack][pack-platform], a Hydrogen-based Digital Experience Platform

Welcome to Pack, your ultimate solution for creating exceptional storefronts that captivate your audience and drive results. Discover how Pack redefines the way you approach content management, design, and performance to unleash the full potential of your brand.

### Meet the Hydrogen-Pack Starter:
Introducing Hydrogen-Pack Starter, a customized [Hydrogen][hydrogen-framework] starter that showcases how Pack can power your custom Shopify storefronts. With Pack, you can seamlessly connect to Shopify, leverage prebuilt React components + third party integrations, and design engaging shopping experiences.

## Features
Explore the capabilities that make Pack stand out:
- Unified Experience Platform: Manage components and content schema effortlessly all within Pack without the need of an additional CMS or page builder.
- Live Previewing: See changes in real-time to ensure a pixel-perfect storefront.
- Local Development Workflow: Streamline development for faster iteration.
- Shopify CDN-Ready: Ensure optimal performance and flexibility.
- Typescript and Tailwind-Ready: Tailor your storefront with preferred frameworks.
- Oxygen Integration: Seamlessly integrate with your preferred hosting.
- Third-Party Integration: Easily add custom snippets or build your own integrations.

## Our Approach
At Pack, we believe in simplicity and empowerment:
- Data Source Clarity: Pack syncs Shopify product and collection data solely for reference in the Customizer, eliminating stale information.
- Pack Customizer Flexibility: Leverage Metaobjects and seamlessly integrate Shopify product data, metafields, metaobjects, or Pack Content to create compelling and easy to manage experiences.
- Standard Structure: Our demo store follows the familiar Shopify page structure, including products, collections, pages, blogs and articles

## What's included

- Remix
- Hydrogen
- Oxygen
- Shopify CLI
- ESLint
- Prettier
- GraphQL generator
- TypeScript and JavaScript flavors

## Getting started

### Requirements

- Node.js version 16.14.0 or higher

### Environment Variables
Before you can run your application locally, you will need to create an `.env` file at the root of your project with your shop's domain and Storefront API token.  You can copy the necessary values from the Pack Storfront by going to `Settings -> Developer`, then `Copy All` under the `Storefront Variables` section.  See the example below:

```
SESSION_SECRET="XXX"
PUBLIC_STOREFRONT_API_TOKEN="XXX"
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

## Pack Customizer Content
You can access the data in the Pack Customizer by using the `pack` object that lives in the Hydrogen `context`.  See the following example:
```tsx
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

**NOTE:** In the future, the `lib/pack` library will be moved into it's own NPM package provided by Pack.

```tsx
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
```tsx
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
