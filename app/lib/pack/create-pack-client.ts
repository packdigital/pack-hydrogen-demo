// import {CacheLong, createWithCache_unstable} from '@shopify/hydrogen';
import {CacheLong, createWithCache} from '@shopify/hydrogen';
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
  preview?: {
    session: PreviewSession;
  };
  contentEnvironment?: string;
}

type Variables = Record<string, any>;

interface PackFetchOptions {
  token: string;
  query: string;
  variables?: Variables;
  previewEnabled?: boolean;
  contentEnvironment?: string;
}

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

async function packFetch<T = any>({
  token,
  query,
  variables,
  previewEnabled,
  contentEnvironment = PRODUCTION_ENVIRONMENT,
}: PackFetchOptions): Promise<QueryResponse<T>> {
  const url = `https://app.packdigital.com/graphql`;

  const queryVariables = variables || {};
  if (previewEnabled) {
    queryVariables.version = 'CURRENT';
  } else {
    queryVariables.version = 'PUBLISHED';
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      /* eslint-disable @typescript-eslint/naming-convention */
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Environment': contentEnvironment,
      /* eslint-enable @typescript-eslint/naming-convention */
    },
    body: JSON.stringify({query, variables: queryVariables}),
  });

  if (!response.ok) {
    throw new Error(`Pack API error: ${response.statusText}`);
  }

  const body: any = await response.json();
  let error = body.errors?.length ? body.errors[0] : null;

  if (body.errors?.length) {
    const firstError = body.errors[0];
    const {extensions} = firstError;

    error = {
      message: firstError.message,
      param: extensions.param,
      code: extensions.code,
      type: extensions.type,
    };
  }

  return {error, data: body.data};
}

export function createPackClient(options: CreatePackClientOptions): Pack {
  const {cache, waitUntil, preview, contentEnvironment} = options;
  const previewEnabled = !!preview?.session.get('enabled');
  const previewEnvironment = preview?.session.get('environment');

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

      // The preview environment takes precedence over the content environment
      // provided when creating the client
      const environment =
        previewEnvironment || contentEnvironment || PRODUCTION_ENVIRONMENT;
      const fetchOptions = {
        query,
        variables,
        token: options.token,
        preview,
        contentEnvironment: environment,
      };

      // Preview mode always bypasses the cache
      if (previewEnabled) return packFetch<T>(fetchOptions);

      return withCache(queryHash, strategy, () => packFetch<T>(fetchOptions));
    },
  };
}
