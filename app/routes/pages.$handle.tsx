import {LoaderArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {RenderSections} from '~/lib/pack';

export async function loader({params, context}: LoaderArgs) {
  const {handle} = params;
  const {page} = await context.pack.query(PAGE_QUERY, {variables: {handle}});

  return {page};
}

export default function Page() {
  const {page} = useLoaderData();

  return (
    <div>
      <RenderSections pageData={page} />
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
