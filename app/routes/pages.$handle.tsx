import {defer, LoaderArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {AnalyticsPageType} from '@shopify/hydrogen';
import {RenderSections} from '@pack/react';

export function meta({data}: any) {
  return [
    {title: data?.page?.title ?? 'Pack Hydrogen Demo'},
    {description: data?.page?.description},
  ];
}

export async function loader({params, context}: LoaderArgs) {
  const {handle} = params;
  const {data} = await context.pack.query(PAGE_QUERY, {
    variables: {handle},
  });
  const analytics = {pageType: AnalyticsPageType.page};

  if (!data.page) {
    throw new Response(null, {status: 404, statusText: 'Not found'});
  }

  return defer({page: data.page, analytics});
}

export default function Page() {
  const {page} = useLoaderData();

  return (
    <div>
      <RenderSections content={page} />
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

const PAGE_QUERY = `#graphql
query Page($handle: String!, $version: Version, $cursor: String) {
  page: pageByHandle(handle: $handle, version: $version) {
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
