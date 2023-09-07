import {useLoaderData} from '@remix-run/react';
import {defer, LoaderArgs} from '@shopify/remix-oxygen';
import {AnalyticsPageType} from '@shopify/hydrogen';
import {RenderSections} from '@pack/react';

import CollectionGrid from '~/components/CollectionGrid';

const seo = ({data}: any) => {
  return {
    title: data?.collection?.title,
    description: data?.collection?.description.substr(0, 154),
  };
};

export const handle = {
  seo,
};

export function meta({data}: any) {
  return [
    {title: data?.collection?.title ?? 'Pack Hydrogen Demo'},
    {description: data?.collection?.description},
  ];
}

export async function loader({params, context, request}: LoaderArgs) {
  const {handle} = params;
  const searchParams = new URL(request.url).searchParams;
  const cursor = searchParams.get('cursor');

  const {data} = await context.pack.query(COLLECTION_PAGE_QUERY, {
    variables: {handle},
  });

  const {collection} = await context.storefront.query(COLLECTION_QUERY, {
    variables: {
      handle,
      cursor,
    },
  });

  // Handle 404s
  if (!data.collectionPage) {
    throw new Response(null, {status: 404});
  }

  const analytics = {
    pageType: AnalyticsPageType.collection,
    handle,
    resourceId: collection.id,
  };

  return defer({
    collectionPage: data?.collectionPage,
    collection,
    analytics,
  });
}

export default function Collection() {
  const {collection, collectionPage} = useLoaderData();

  return (
    <div className="grid gap-4">
      <header className="container space-y-3 mb-8">
        <h1 className="text-4xl whitespace-pre-wrap font-bold">
          {collection.title}
        </h1>

        {collection.description && (
          <p className="text-2xl max-w-lg whitespace-pre-wrap">
            {collection.description}
          </p>
        )}
      </header>

      <CollectionGrid
        collection={collection}
        url={`/collections/${collection.handle}`}
      />

      <div className="grid grid-cols-1 gap-4 mt-4 pt-9 border-t border-t-gray-200 container px-0">
        {collectionPage && <RenderSections content={collectionPage} />}
      </div>
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
    products(first: 10, after: $cursor) {
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
