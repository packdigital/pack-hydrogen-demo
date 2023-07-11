import {CacheLong, createWithCache_unstable} from '@shopify/hydrogen';
import {PreviewSession} from './preview/preview-session';

/** @see https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/cache#caching-strategies */
type CachingStrategy = ReturnType<typeof CacheLong>;

interface EnvironmentOptions {
  /**
   * A Cache API instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Cache
   */
  cache: Cache;
  /**
   * A runtime utility for serverless environments
   * @see https://developers.cloudflare.com/workers/runtime-apis/fetch-event/#waituntil
   */
  waitUntil: ExecutionContext['waitUntil'];
}

interface CreatePackClientOptions extends EnvironmentOptions {
  token: string;
  preview?: {session: PreviewSession};
}

type Variables = Record<string, any>;

interface PackFetchOptions {
  token: string;
  query: string;
  variables?: Variables;
  preview?: {session: PreviewSession};
}

interface QueryOptions {
  variables?: Variables;
  cache?: CachingStrategy;
}

export interface Pack {
  isPreviewModeEnabled: () => boolean;
  preview?: {session: PreviewSession};
  query: <T = any>(query: string, options?: QueryOptions) => Promise<T>;
}

/**
 * Create an SHA-256 hash as a hex string
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
 */
async function sha256(message: string): Promise<string> {
  // encode as UTF-8
  const messageBuffer = new TextEncoder().encode(message);
  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', messageBuffer);
  // convert bytes to hex string
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Hash query and its parameters for use as cache key
 * NOTE: Oxygen deployment will break if the cache key is long or contains `\n`
 */
function hashQuery(query: string, variables?: Variables): Promise<string> {
  let hash = query;
  if (variables !== null) hash += JSON.stringify(variables);

  return sha256(hash);
}

async function packFetch<T = any>({
  token,
  query,
  variables,
  preview,
}: PackFetchOptions): Promise<T> {
  const url = `https://app.packdigital.com/graphql`;
  const previewEnabled = preview && preview.session.get('enabled');

  const queryVariables = variables || {};
  if (previewEnabled) {
    queryVariables.version = 'CURRENT';
  } else {
    queryVariables.version = 'PUBLISHED';
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({query, variables: queryVariables}),
  });

  if (!response.ok) {
    throw new Error(`Pack API error: ${response.statusText}`);
  }

  const body: any = await response.json();

  if (body.errors) {
    throw new Error(`Pack API error: ${body.errors[0].message}`);
  }

  return body.data;
}

export function createPackClient(options: CreatePackClientOptions): Pack {
  const {cache, waitUntil, preview} = options;

  return {
    preview,
    isPreviewModeEnabled: () => preview && preview.session.get('enabled'),
    async query<T = any>(
      query: string,
      {variables, cache: strategy = CacheLong()}: QueryOptions = {},
    ) {
      const queryHash = await hashQuery(query, variables);
      const withCache = createWithCache_unstable<T>({cache, waitUntil});

      // Preview mode always bypasses the cache
      if (preview && preview.session.get('enabled')) {
        return packFetch<T>({query, variables, token: options.token, preview});
      }

      return withCache(queryHash, strategy, () =>
        packFetch<T>({query, variables, token: options.token, preview}),
      );
    },
  };
}
