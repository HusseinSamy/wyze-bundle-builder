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
          style={
            isPlan
              ? { width: '1.5rem', height: '1.5rem', objectFit: 'contain', flexShrink: 0 }
              : {
                  width: '2.5rem',
                  height: '2.5rem',
                  objectFit: 'contain',
                  flexShrink: 0,
                  borderRadius: '0.3125rem',
                  background: '#FFFFFF',
                }
          }
        />

        {/* Name */}
        <div className="flex-1 min-w-0">
          <p
            className={`leading-tight m-0 text-[0.75rem] ${isPlan ? 'md:text-[1rem]' : 'md:text-[0.875rem]'}`}
            style={{
              letterSpacing: isPlan ? "-0.2%" : "0.5%",
              fontWeight: isPlan ? 700 : 500,
              color: isPlan ? undefined : '#1F1F1F',
            }}
          >
            {isPlan ? (
              <>
                <span style={{ color: '#1F1F1F' }}>{product.name.split(' ')[0]}</span>{' '}
                <span style={{ color: '#4E2FD2' }}>{product.name.split(' ').slice(1).join(' ')}</span>
              </>
            ) : (
              product.name
            )}
            {product.required && (
              <span className="ml-1 " style={{ color: '#6F7882' }}> (Required)</span>
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
          size="md"
        />
      )}

      {/* Price */}
      <div className="flex flex-col items-end gap-0.5 flex-shrink-0" style={{ minWidth: '3.5rem' }}>
        {lineCompare !== undefined && lineCompare > linePrice && (
          <span className="price-original" style={{ fontWeight: 600 }}>
            {fmt(lineCompare, product.isMonthly)}
          </span>
        )}
        <span
          className={product.price === 0 ? 'price-free' : 'price-current'}
          style={{ fontWeight: 600 }}
        >
          {fmt(linePrice, product.isMonthly)}
        </span>
      </div>
    </div>
  );
}
