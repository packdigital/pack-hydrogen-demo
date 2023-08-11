import {useLoaderData} from '@remix-run/react';
import {defer, LoaderArgs} from '@shopify/remix-oxygen';
import {
  AnalyticsPageType,
  MediaFile,
  Money,
  ShopifyAnalyticsProduct,
  ShopPayButton,
} from '@shopify/hydrogen';
import {RenderSections} from '@pack/react';
import ProductOptions from '~/components/ProductOptions';

export function meta({data}: any) {
  return [
    {title: data?.product?.title ?? 'Pack Hydrogen Demo'},
    {description: data?.product?.description},
  ];
}

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

export default function ProductHandle() {
  const {product, productPage, selectedVariant, storeDomain} = useLoaderData();
  const {price, compareAtPrice, availableForSale} = selectedVariant || {};
  const orderable = availableForSale || false;
  const isDiscounted = compareAtPrice?.amount > price?.amount;

  return (
    <div className="grid gap-4">
      <section className="container grid items-start gap-6 lg:gap-12 md:grid-cols-2 ">
        <div
          className={`${
            !product?.media?.nodes?.length && 'bg-gray-100'
          } col-span-1 aspect-square w-[80vw] md:w-full`}
        >
          <ProductGallery media={product.media.nodes} />
        </div>

        <div className="col-span-1 md:sticky grid gap-2 top-[6rem]">
          <div className="grid gap-2">
            <span className="max-w-prose whitespace-pre-wrap inherit text-2xl flex gap-2">
              <Money
                withoutTrailingZeros
                data={price}
                className={`${isDiscounted ? 'text-red-800' : ''}`}
              />

              {isDiscounted && (
                <Money
                  className="line-through opacity-50"
                  withoutTrailingZeros
                  data={compareAtPrice}
                />
              )}
            </span>

            <h1 className="text-4xl font-bold">{product.title}</h1>

            <p dangerouslySetInnerHTML={{__html: product.descriptionHtml}} />
          </div>

          <ProductOptions
            options={product.options}
            selectedVariant={selectedVariant}
          />

          {orderable && (
            <div className="space-y-2">
              <ShopPayButton
                storeDomain={storeDomain}
                variantIds={[selectedVariant?.id]}
                width={'100%'}
              />
            </div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 mt-4 pt-9 border-t border-t-gray-200 container px-0">
        <RenderSections content={productPage} />
      </div>
    </div>
  );
}

function ProductGallery({media}: any) {
  if (!media.length) {
    return null;
  }

  const typeNameMap: any = {
    MODEL_3D: 'Model3d',
    VIDEO: 'Video',
    IMAGE: 'MediaImage',
    EXTERNAL_VIDEO: 'ExternalVideo',
  };

  return (
    <div
      className={`grid gap-4 overflow-x-scroll grid-flow-col md:grid-flow-row  md:p-0 md:overflow-x-auto md:grid-cols-2 w-[90vw] md:w-full lg:col-span-2`}
    >
      {media.map((med: any, i: number) => {
        let extraProps = {};

        if (med.mediaContentType === 'MODEL_3D') {
          extraProps = {
            interactionPromptThreshold: '0',
            ar: true,
            loading: 'eager',
            disableZoom: true,
            style: {height: '100%', margin: '0 auto'},
          };
        }

        const data = {
          ...med,
          __typename: typeNameMap[med.mediaContentType] || typeNameMap['IMAGE'],
          image: {
            ...med.image,
            altText: med.alt || 'Product image',
          },
        };

        return (
          <div
            className={`${
              i % 3 === 0 ? 'md:col-span-2' : 'md:col-span-1'
            } snap-center card-image bg-white aspect-square md:w-full w-[80vw] rounded`}
            key={data.id || data.image.id}
          >
            <MediaFile
              tabIndex={0}
              className={`w-full h-full aspect-square object-cover`}
              data={data}
              {...extraProps}
            />
          </div>
        );
      })}
    </div>
  );
}

const SECTION_FRAGMENT = `#graphql
fragment section on Section {
  id
  title
  status
  data
  publishedAt
  createdAt
  updatedAt
  parentContentType
}
`;

const PRODUCT_PAGE_QUERY = `#graphql
query ProductPage($handle: String!, $version: Version) {
  productPage: productPageByHandle(handle: $handle, version: $version) {
    id
    title
    handle
    description
    status
    sections(first: 25) {
      nodes {
        ...section
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
    template {
      id
      title
      type
      status
      publishedAt
      createdAt
      updatedAt
    }
    publishedAt
    createdAt
    updatedAt
  }
}
${SECTION_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
query product($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
  product(handle: $handle) {
    id
    title
    handle
    vendor
    description
    descriptionHtml
    media(first: 10) {
      nodes {
        ... on MediaImage {
          mediaContentType
          image {
            id
            url
            altText
            width
            height
          }
        }
        ... on Model3d {
          id
          mediaContentType
          sources {
            mimeType
            url
          }
        }
      }
    }
    options {
      name,
      values
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
      id
      availableForSale
      selectedOptions {
        name
        value
      }
      image {
        id
        url
        altText
        width
        height
      }
      price {
        amount
        currencyCode
      }
      compareAtPrice {
        amount
        currencyCode
      }
      sku
      title
      unitPrice {
        amount
        currencyCode
      }
      product {
        title
        handle
      }
    }
    variants(first: 1) {
      nodes {
        id
        title
        availableForSale
        price {
          currencyCode
          amount
        }
        compareAtPrice {
          currencyCode
          amount
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
}
`;
