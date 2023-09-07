import {CacheLong, createWithCache} from '@shopify/hydrogen';
import {PackClient} from '@pack/client';
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
  apiUrl?: string;
  token: string;
  preview?: {
    session: PreviewSession;
  };
  contentEnvironment?: string;
}

type Variables = Record<string, any>;

interface QueryOptions {
  variables?: Variables;
  cache?: CachingStrategy;
}

interface QueryError {
  message: string;
  param?: string;
  code?: string;
  type: string;
}

interface QueryResponse<T> {
  data: T | null;
  error: QueryError | null;
}

export interface Pack {
  isPreviewModeEnabled: () => boolean;
  preview?: {
    session: PreviewSession;
  };
  query: <T = any>(
    query: string,
    options?: QueryOptions,
  ) => Promise<QueryResponse<T>>;
  isValidEditToken: PackClient['isValidEditToken'];
}

const PRODUCTION_ENVIRONMENT = 'production' as const;

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

export function createPackClient(options: CreatePackClientOptions): Pack {
  const {cache, waitUntil, preview, contentEnvironment, token, apiUrl} =
    options;
  const previewEnabled = !!preview?.session.get('enabled');
  const previewEnvironment = preview?.session.get('environment');

  const clientContentEnvironment =
    previewEnvironment || contentEnvironment || PRODUCTION_ENVIRONMENT;

  const packClient = new PackClient({
    apiUrl,
    token,
    contentEnvironment: clientContentEnvironment,
  });

  return {
    preview,
    isPreviewModeEnabled: () => previewEnabled,
    async query<T = any>(
      query: string,
      {variables, cache: strategy = CacheLong()}: QueryOptions = {},
    ) {
      const queryHash = await hashQuery(query, variables);
      const withCache = createWithCache<QueryResponse<T>>({
        cache,
        waitUntil,
      });

      const queryVariables = variables ? {...variables} : {};
      if (previewEnabled) {
        queryVariables.version = 'CURRENT';
      } else {
        queryVariables.version = 'PUBLISHED';
      }

      // Preview mode always bypasses the cache
      if (previewEnabled)
        return packClient.fetch(query, {variables: queryVariables});

      return withCache(queryHash, strategy, () =>
        packClient.fetch(query, {variables: queryVariables}),
      );
    },
    isValidEditToken: (token: string | null) =>
      packClient.isValidEditToken(token),
  };
}
