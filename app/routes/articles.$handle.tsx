import {useLoaderData} from '@remix-run/react';
import {defer, LoaderArgs} from '@shopify/remix-oxygen';
import {AnalyticsPageType} from '@shopify/hydrogen';
import {RenderSections} from '@pack/react';

export function meta({data}: any) {
  return [
    {title: data?.article?.title ?? 'Pack Hydrogen Demo'},
    {description: data?.article?.description},
  ];
}

export async function loader({params, context}: LoaderArgs) {
  const {handle} = params;
  const {data} = await context.pack.query<any>(ARTICLE_QUERY, {
    variables: {handle},
  });

  const analytics = {pageType: AnalyticsPageType.article};

  if (!data.article) {
    throw new Response(null, {status: 404});
  }

  return defer({article: data.article, analytics});
}

export default function Article() {
  const {article} = useLoaderData();

  return (
    <div className="grid gap-4">
      <RenderSections content={article} />
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
