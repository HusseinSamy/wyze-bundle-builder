import type { Product } from '../data/products';
import { useBundle } from '../context/BundleContext';
import { QuantityStepper } from './QuantityStepper';

interface Props {
  product: Product;
  variantId: string;
  variantLabel: string;
  qty: number;
  linePrice: number;
  lineCompare?: number;
}

function fmt(n: number, monthly = false) {
  if (n === 0) return 'FREE';
  return `$${n.toFixed(2)}${monthly ? '/mo' : ''}`;
}

export function ReviewLineItem({ product, variantId, qty, linePrice, lineCompare }: Props) {
  const { setQty } = useBundle();
  const variantObj = product.variants.find(v => v.id === variantId);
  const thumbnail = variantObj?.image ?? product.image;
  const isPlan = product.category === 'plans';

  function handleQty(v: number) {
    if (product.required && v < 1) return;
    setQty(product.id, variantId, v);
  }

  return (
    <div className="flex items-center pb-3">
      <div className={`flex items-center ${isPlan ? 'gap-0' : 'gap-3'} w-full`}>
        {/* Thumbnail */}
        <img
          src={thumbnail}
          alt={product.name}
          className={
            isPlan
              ? 'w-6 h-6 object-contain shrink-0'
              : 'w-10 h-10 object-contain shrink-0 rounded-[0.3125rem] bg-gray-000'
          }
        />

        {/* Name */}
        <div className="flex-1 min-w-0">
          <p
            className={`${isPlan ? 'font-line-item-strong' : 'font-line-item text-gray-900'} m-0 text-[0.75rem] ${isPlan ? 'md:text-[1rem]' : 'md:text-[0.875rem]'}`}
          >
            {isPlan ? (
              <>
                <span className="text-gray-900">{product.name.split(' ')[0]}</span>{' '}
                <span className="text-brand">{product.name.split(' ').slice(1).join(' ')}</span>
              </>
            ) : (
              product.name
            )}
            {product.required && (
              <span className="ml-1 text-gray-600"> (Required)</span>
            )}
          </p>
        </div>
      </div>

      {/* Stepper */}
      {!isPlan && (
        <QuantityStepper
          value={qty}
          onChange={handleQty}
          min={product.required ? 1 : 0}
          max={product.required ? 1 : 99}
          size="md"
          uniformButtons
        />
      )}

      {/* Price */}
      <div className="flex flex-col items-end gap-0.5 flex-shrink-0 min-w-14">
        {lineCompare !== undefined && lineCompare > linePrice && (
          <span className="price-original font-price-strike font-semibold text-[0.75rem] md:text-[0.8125rem]">
            {fmt(lineCompare, product.isMonthly)}
          </span>
        )}
        <span
          className={`${product.price === 0 ? 'font-price-free text-brand' : 'price-current font-price-current'} font-semibold text-[0.75rem] md:text-[0.8125rem]`}
        >
          {fmt(linePrice, product.isMonthly)}
        </span>
      </div>
    </div>
  );
}
