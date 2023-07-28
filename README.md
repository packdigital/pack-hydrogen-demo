# Hydrogen template: Hello World!

Hydrogen is Shopify’s stack for headless commerce. Hydrogen is designed to dovetail with [Remix](https://remix.run/), Shopify’s full stack web framework. This template contains a **minimal setup** of components, queries and tooling to get started with Hydrogen.

[Check out Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)
[Get familiar with Remix](https://remix.run/docs/en/v1)

## What's included

- Remix
- Hydrogen
- Oxygen
- Shopify CLI
- ESLint
- Prettier
- GraphQL generator
- TypeScript and JavaScript flavors
- Minimal setup of components and routes

## Getting started

**Requirements:**

- Node.js version 16.14.0 or higher

```bash
npm create @shopify/hydrogen@latest -- --template hello-world
```

Remember to update `.env` with your shop's domain and Storefront API token!

**ENV**
```
# These variables are only available locally in MiniOxygen

SESSION_SECRET="foobar"
PUBLIC_STOREFRONT_API_TOKEN="xxx"
PUBLIC_STORE_DOMAIN="xxx"
PACK_PUBLIC_TOKEN="xxx"
PACK_SECRET_TOKEN="xxx"
```

## Building for production

```bash
npm run build
```

## Local development

```bash
npm run dev
```
