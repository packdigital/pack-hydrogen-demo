/// <reference types="@remix-run/dev" />
/// <reference types="@shopify/remix-oxygen" />
/// <reference types="@shopify/oxygen-workers-types" />

import type { Storefront } from '@shopify/hydrogen';
import { Pack } from '@pack/hydrogen';
import type { HydrogenSession } from './server';

declare global {
  /**
   * A global `process` object is only available during build to access NODE_ENV.
   */
  const process: { env: { NODE_ENV: 'production' | 'development' } };

  /**
   * Declare expected Env parameter in fetch handler.
   */
  interface Env {
    SESSION_SECRET: string;
    PUBLIC_STOREFRONT_API_TOKEN: string;
    PRIVATE_STOREFRONT_API_TOKEN: string;
    PUBLIC_STORE_DOMAIN: string;
    PUBLIC_STOREFRONT_ID: string;
    PACK_PUBLIC_TOKEN: string;
    PACK_SECRET_TOKEN: string;
    PACK_CONTENT_ENVIRONMENT?: string;
    PACK_API_URL?: string;
  }
}

/**
 * Declare local additions to `AppLoadContext` to include the session utilities we injected in `server.ts`.
 */
declare module '@shopify/remix-oxygen' {
  export interface AppLoadContext {
    session: HydrogenSession;
    storefront: Storefront;
    env: Env;
    pack: Pack;
  }
}
