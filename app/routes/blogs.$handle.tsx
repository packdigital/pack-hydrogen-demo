import {LoaderArgs, json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {RenderSections} from '~/lib/pack';

export async function loader({params, context}: LoaderArgs) {
  const {handle} = params;
  const {blog} = await context.pack.query(BLOG_QUERY, {variables: {handle}});

  return json({blog});
}

export default function Blog() {
  const {blog} = useLoaderData();

  return (
    <div>
      <RenderSections pageData={blog} />
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
