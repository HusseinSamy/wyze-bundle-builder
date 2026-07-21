import type { Product } from '../data/products';
import { useBundle } from '../context/BundleContext';
import { QuantityStepper } from './QuantityStepper';
import { VariantChip } from './VariantChip';

interface Props {
  product: Product;
}

function fmt(n: number, monthly = false) {
  if (n === 0) return 'FREE';
  return `$${n.toFixed(2)}${monthly ? '/mo' : ''}`;
}

export function ProductCard({ product }: Props) {
  const { getQty, getActiveVariant, setQty, setVariant } = useBundle();

  const activeVariant = getActiveVariant(product.id);
  const variantId = product.variants.length ? activeVariant : '';
  const qty = getQty(product.id, variantId);
  const isSelected = qty > 0;

  const variantObj = product.variants.find(v => v.id === activeVariant);
  const displayImage = product.image ?? variantObj?.image;

  function handleQtyChange(v: number) {
    setQty(product.id, variantId, v);
  }

  function handleVariantSelect(id: string) {
    setVariant(product.id, id);
  }

  return (
    <div className={`card flex gap-[1.1875rem] items-center ${isSelected ? 'card-selected' : ''}`}>
      {/* Product image — variant-aware, badge overlaid top-left */}
      <div className="relative flex-shrink-0">
        {product.badge && (
          <span className="badge-discount absolute top-0 left-0">{product.badge}</span>
        )}
        <img
          src={displayImage}
          alt={product.name}
          style={{
            width: '6.3125rem',
            height: '8.5625rem',
            objectFit: 'contain',
            borderRadius: '0.3125rem',
            background: '#FFFFFF',
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 min-w-0 flex-1">
        {/* Text */}
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <h3 className="font-semibold text-sm leading-snug text-gray-900 m-0" style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '0.6px', lineHeight: '16px' }}>
            {product.name}
          </h3>
          <p className="text-xs leading-tight" style={{ color: 'rgba(31,31,31,0.75)', letterSpacing: "0.6px" }}>
            {product.description}{' '}
            <a href="#" className="link-brand text-xs" onClick={e => e.preventDefault()}>
              Learn More
            </a>
          </p>
        </div>

        {/* Variants */}
        {product.variants.length > 0 && (
          <VariantChip
            variants={product.variants}
            activeId={activeVariant}
            onSelect={handleVariantSelect}
          />
        )}

        {/* Stepper + price */}
        <div className="flex ps-1 items-center justify-between mt-auto">
          <QuantityStepper value={qty} onChange={handleQtyChange} />
          <div className="flex flex-col items-end gap-0.5">
            {product.comparePrice !== undefined && (
              <span className="pt-1 price-original">{fmt(product.comparePrice, product.isMonthly)}</span>
            )}
            <span className={product.price === 0 ? 'price-free text-sm font-semibold' : 'price-current'}>
              {fmt(product.price, product.isMonthly)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
