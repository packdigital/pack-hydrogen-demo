import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';

export default function ProductCard({product}: any) {
  const {price, compareAtPrice} = product.variants?.nodes[0] || {};
  const isDiscounted = compareAtPrice?.amount > price?.amount;

  return (
    <Link to={`/products/${product.handle}`}>
      <div className="space-y-3">
        <div className="rounded overflow-hidden border border-gray-200 bg-gray-100">
          <Image
            data={product.variants.nodes[0].image}
            alt={product.title}
            aspectRatio="1/1"
          />
        </div>

        <span className="max-w-prose whitespace-pre-wrap inherit flex gap-1">
          <Money
            withoutTrailingZeros
            data={price}
            className={`${isDiscounted ? 'text-red-800' : ''}`}
          />

          {isDiscounted && (
            <Money
              className="line-through opacity-50"
              withoutTrailingZeros
              data={compareAtPrice}
            />
          )}
        </span>

        <h3 className="text-2xl font-bold max-w-prose w-full overflow-hidden whitespace-nowrap text-ellipsis">
          {product.title}
        </h3>
      </div>
    </Link>
  );
}
