import {LoaderArgs, json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {RenderSections} from '~/lib/pack/render-sections';

export async function loader({params, context}: LoaderArgs) {
  const {handle} = params;
  const {article} = await context.pack.query(ARTICLE_QUERY, {
    variables: {handle},
  });

  return json({article});
}

export default function Article() {
  const {article} = useLoaderData();

  return (
    <div>
      <RenderSections pageData={article} />
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

const ARTICLE_QUERY = `#graphql
query Article($handle: String!, $version: Version, $cursor: String) {
  article: articleByHandle(handle: $handle, version: $version) {
    id
    title
    handle
    description
    status
    author
    category
    tags
    excerpt
    bodyHtml
    seo {
      title
      description
      image
      keywords
      noFollow
      noIndex
    }
    blog {
      handle
      title
      description
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
