import {useLoaderData} from '@remix-run/react';
import {defer, LoaderArgs} from '@shopify/remix-oxygen';
import {AnalyticsPageType} from '@shopify/hydrogen';
import {RenderSections} from '@pack/react';

export function meta({data}: any) {
  return [
    {title: data?.blog?.title ?? 'Pack Hydrogen Demo'},
    {description: data?.blog?.description},
  ];
}

export async function loader({params, context}: LoaderArgs) {
  const {handle} = params;
  const {data} = await context.pack.query(BLOG_QUERY, {variables: {handle}});
  const analytics = {pageType: AnalyticsPageType.blog};

  if (!data.blog) {
    throw new Response(null, {status: 404});
  }

  return defer({blog: data.blog, analytics});
}

export default function Blog() {
  const {blog} = useLoaderData();

  return (
    <div>
      <RenderSections content={blog} />
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

const BLOG_QUERY = `#graphql
query Blog($handle: String!, $version: Version, $cursor: String) {
  blog: blogByHandle(handle: $handle, version: $version) {
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
