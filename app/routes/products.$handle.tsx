import {useLoaderData} from '@remix-run/react';
import {LoaderArgs, json} from '@shopify/remix-oxygen';
import {MediaFile, Money, ShopPayButton} from '@shopify/hydrogen';
import ProductOptions from '~/components/ProductOptions';

export async function loader({params, context, request}: LoaderArgs) {
  const {handle} = params;
  const storeDomain = context.storefront.getShopifyDomain();
  console.log('loader:storeDromain: ', storeDomain);

  const searchParams = new URL(request.url).searchParams;
  const selectedOptions: any = [];

  // set selected options from the query string
  searchParams.forEach((value, name) => {
    selectedOptions.push({name, value});
  });

  const {product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions,
    },
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }
  // optionally set a default variant so you always have an "orderable" product selected
  const selectedVariant =
    product.selectedVariant ?? product?.variants?.nodes[0];

  return json({product, selectedVariant, storeDomain});
}

export default function ProductHandle() {
  const {product, selectedVariant, storeDomain} = useLoaderData();
  const orderable = selectedVariant?.availableForSale || false;

  return (
    <section className="w-full gap-4 md:gap-8 grid px-6 md:px-8 lg:px-12">
      <div className="grid items-start gap-6 lg:gap-20 md:grid-cols-2 lg:grid-cols-3">
        <div className="grid md:grid-flow-row  md:p-0 md:overflow-x-hidden md:grid-cols-2 md:w-full lg:col-span-2">
          <div className="md:col-span-2 snap-center card-image aspect-square md:w-full w-[80vw] shadow rounded">
            <ProductGallery media={product.media.nodes} />
          </div>
        </div>

        <div className="md:sticky md:mx-auto max-w-xl md:max-w-[24rem] grid gap-8 p-0 md:p-6 md:px-0 top-[6rem] lg:top-[8rem] xl:top-[10rem]">
          <div className="grid gap-2">
            <h1 className="text-4xl font-bold leading-10 whitespace-normal">
              {product.title}
            </h1>
            <span className="max-w-prose whitespace-pre-wrap inherit text-copy opacity-50 font-medium">
              {product.vendor}
            </span>
          </div>

          <ProductOptions
            options={product.options}
            selectedVariant={selectedVariant}
          />
          <Money
            withoutTrailingZeros
            data={selectedVariant.price}
            className="text-xl font-semibold mb-2"
          />
          {orderable && (
            <div className="space-y-2">
              <ShopPayButton
                storeDomain={storeDomain}
                variantIds={[selectedVariant?.id]}
                width={'400px'}
              />
              {/* TODO product form */}
            </div>
          )}
          <div
            className="prose border-t border-gray-200 pt-6 text-black text-md"
            dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
          ></div>
        </div>
      </div>
    </section>
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
            } snap-center card-image bg-white aspect-square md:w-full w-[80vw] shadow-sm rounded`}
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

const PRODUCT_QUERY = `#graphql
  query product($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
    product(handle: $handle) {
      id
      title
      handle
      vendor
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
