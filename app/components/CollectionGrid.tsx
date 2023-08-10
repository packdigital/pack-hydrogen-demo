import {useEffect, useState} from 'react';
import {useFetcher} from '@remix-run/react';

import ProductCard from './ProductCard';

export default function CollectionGrid({collection, url}: any) {
  const [nextPage, setNextPage] = useState(
    collection.products.pageInfo.hasNextPage,
  );
  const [endCursor, setEndCursor] = useState(
    collection.products.pageInfo.endCursor,
  );

  const [products, setProducts] = useState(collection.products.nodes || []);

  // For making client-side requests
  // https://remix.run/docs/en/v1/hooks/use-fetcher
  const fetcher = useFetcher();

  function fetchMoreProducts() {
    // ?index differentiates index routes from their parent layout routes
    // https://remix.run/docs/en/v1/guides/routing#what-is-the-index-query-param
    fetcher.load(`${url}?index&cursor=${endCursor}`);
  }

  useEffect(() => {
    if (!fetcher.data) return;
    const {collection} = fetcher.data;

    setProducts((prev: any[]) => [...prev, ...collection.products.nodes]);
    setNextPage(collection.products.pageInfo.hasNextPage);
    setEndCursor(collection.products.pageInfo.endCursor);
  }, [url, fetcher.data]);

  return (
    <section className="container">
      <div className="grid-flow-row grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {nextPage && (
          <button
            className="border border-gray-200 aspect-square rounded uppercase font-bold hover:underline hover:bg-gray-100"
            disabled={fetcher.state !== 'idle'}
            onClick={fetchMoreProducts}
          >
            {fetcher.state !== 'idle' ? (
              'Loading...'
            ) : (
              <span>Load more &rarr;</span>
            )}
          </button>
        )}
      </div>
    </section>
  );
}
