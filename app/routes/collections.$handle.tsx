import {useLoaderData} from '@remix-run/react';
import {defer, LoaderArgs} from '@shopify/remix-oxygen';
import ProductGrid from '~/components/ProductGrid';
import {RenderSections} from '~/lib/pack';
import {AnalyticsPageType} from '@shopify/hydrogen';

const seo = ({data}: any) => {
  return {
    title: data?.collection?.title,
    description: data?.collection?.description.substr(0, 154),
  };
};

export const handle = {
  seo,
};

export async function loader({params, context, request}: LoaderArgs) {
  const {handle} = params;
  const searchParams = new URL(request.url).searchParams;
  const cursor = searchParams.get('cursor');

  const {collectionPage} = await context.pack.query(COLLECTION_PAGE_QUERY, {
    variables: {handle},
  });
  const {collection} = await context.storefront.query(COLLECTION_QUERY, {
    variables: {
      handle,
      cursor,
    },
  });

  // Handle 404s
  if (!collection) {
    throw new Response(null, {status: 404});
  }

  const analytics = {
    pageType: AnalyticsPageType.collection,
    handle,
    resourceId: collection.id,
  };

  return defer({
    collectionPage,
    collection,
    analytics,
  });
}

export function meta({data}: any) {
  return [
    {title: data?.collection?.title ?? 'Collection'},
    {description: data?.collection?.description},
  ];
}

export default function Collection() {
  const {collection, collectionPage} = useLoaderData();

  return (
    <>
      <header className="grid w-full gap-8 py-8 justify-items-start">
        <h1 className="text-4xl whitespace-pre-wrap font-bold inline-block">
          {collection.title}
        </h1>

        {collection.description && (
          <div className="flex items-baseline justify-between w-full">
            <div>
              <p className="max-w-md whitespace-pre-wrap inherit text-copy inline-block">
                {collection.description}
              </p>
            </div>
          </div>
        )}
      </header>

      <RenderSections content={collectionPage} />
      <ProductGrid
        collection={collection}
        url={`/collections/${collection.handle}`}
      />
    </>
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

const COLLECTION_PAGE_QUERY = `#graphql
query CollectionPage($handle: String!, $version: Version) {
  collectionPage: collectionPageByHandle(handle: $handle, version: $version) {
    id
    title
    handle
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

const COLLECTION_QUERY = `#graphql
query CollectionDetails($handle: String!, $cursor: String) {
  collection(handle: $handle) {
    id
    title
    description
    handle
    products(first: 4, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        publishedAt
        handle
        variants(first: 1) {
          nodes {
            id
            image {
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
          }
        }
      }
    }
  }
}
`;
