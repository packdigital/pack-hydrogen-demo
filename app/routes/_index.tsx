import {useLoaderData, Link} from '@remix-run/react';
import {defer, LoaderArgs} from '@shopify/remix-oxygen';
import {AnalyticsPageType, Image} from '@shopify/hydrogen';
import {RenderSections} from '~/lib/pack';

export function meta() {
  return [
    {title: 'Hydrogen'},
    {description: 'A custom storefront powered by Hydrogen'},
  ];
}

export async function loader({context}: LoaderArgs) {
  const {page} = await context.pack.query(HOME_PAGE_QUERY);
  const {collections} = await context.storefront.query(COLLECTIONS_QUERY);
  const analytics = {pageType: AnalyticsPageType.home};

  return defer({
    page,
    collections,
    analytics,
  });
}

export default function Index() {
  const {collections, page} = useLoaderData();

  return (
    <section className="w-full gap-4">
      <h2 className="whitespace-pre-wrap max-w-prose font-bold text-lead">
        Collections
      </h2>

      <RenderSections pageData={page} />
    </section>
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

const HOME_PAGE_QUERY = `#graphql
query HomePage($version: Version, $cursor: String) {
  page: pageByHandle(handle: "/", version: $version) {
    id
    title
    handle
    description
    status
    seo {
      title
      description
      image
      keywords
      noFollow
      noIndex
    }
    sections(first: 25, after: $cursor) {
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

const COLLECTIONS_QUERY = `#graphql
query FeaturedCollections {
  collections(first: 3, query: "collection_type:smart")  {
    nodes {
      id
      title
      handle
      image {
        altText
        width
        height
        url
      }
    }
  }
}
`;
