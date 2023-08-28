import {
  type ActionFunction,
  json,
  type LoaderFunction,
  redirect,
} from '@shopify/remix-oxygen';

const ROOT_PATH = '/' as const;

/**
 * A not found response. Sets the status code.
 */
function notFound(message = 'Not Found') {
  return new Response(message, {status: 404, statusText: 'Not Found'});
}

function isLocalPath(request: Request, url: string) {
  // Our domain, based on the current request path
  const currentUrl = new URL(request.url);

  // If url is relative, the 2nd argument will act as the base domain.
  const urlToCheck = new URL(url, currentUrl.origin);

  // If the origins don't match the slug is not on our domain.
  return currentUrl.origin === urlToCheck.origin;
}

/**
 * A `POST` request to this route will exit preview mode
 * POST /api/edit Content-Type: application/x-www-form-urlencoded
 */
export const action: ActionFunction = async ({request, context}) => {
  const {preview} = context.pack;

  if (!(request.method === 'POST' && preview?.session)) {
    return json({message: 'Method not allowed'}, 405);
  }

  const body = await request.formData();
  const slug = (body.get('slug') as string) ?? ROOT_PATH;
  const redirectTo = isLocalPath(request, slug) ? slug : ROOT_PATH;

  preview.session.set('enabled', false);

  return redirect(redirectTo, {
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Set-Cookie': await preview.session.destroy(),
    },
  });
};

/**
 * A `GET` request to this route will enter preview mode
 */
export const loader: LoaderFunction = async function ({request, context}) {
  const {env, pack} = context;

  if (!pack.preview?.session) return notFound();

  const {searchParams} = new URL(request.url);

  const token = searchParams.get('token');
  const environment = searchParams.get('environment');
  const path = searchParams.get('path') ?? ROOT_PATH;
  const redirectTo = isLocalPath(request, path) ? path : ROOT_PATH;

  if (!searchParams.has('token')) {
    throw new MissingTokenError();
  }

  const isValidToken = await pack.isValidEditToken(token);

  if (!isValidToken) {
    throw new InvalidTokenError();
  }

  pack.preview.session.set('enabled', true);
  pack.preview.session.set('environment', environment);

  return redirect(redirectTo, {
    status: 307,
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Set-Cookie': await pack.preview.session.commit(),
    },
  });
};

class MissingTokenError extends Response {
  constructor() {
    super('Missing token', {status: 401, statusText: 'Unauthorized'});
  }
}

class InvalidTokenError extends Response {
  constructor() {
    super('Invalid token', {status: 401, statusText: 'Unauthorized'});
  }
}
