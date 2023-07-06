import {CacheLong, createWithCache_unstable} from '@shopify/hydrogen';

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
  secretToken: string;
}

type Variables = Record<string, any>;

interface PackFetchOptions {
  secretToken: string;
  query: string;
  variables?: Variables;
}

interface QueryOptions {
  variables?: Variables;
  cache?: CachingStrategy;
}

export interface Pack {
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

  if (variables !== null) {
    hash += JSON.stringify(variables);
  }

  return sha256(hash);
}

async function packFetch<T = any>({
  secretToken,
  query,
  variables,
}: PackFetchOptions): Promise<T> {
  const url = `https://app.packdigital.com/graphql`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: `Bearer ${secretToken}`,
    },
    body: JSON.stringify({query, ...(variables && {variables})}),
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
  const {cache, waitUntil} = options;

  return {
    async query<T = any>(
      query: string,
      {variables, cache: strategy = CacheLong()}: QueryOptions = {},
    ) {
      const queryHash = await hashQuery(query, variables);
      const withCache = createWithCache_unstable<T>({cache, waitUntil});

      return withCache(queryHash, strategy, () =>
        packFetch<T>({query, variables, secretToken: options.secretToken}),
      );
    },
  };
}
