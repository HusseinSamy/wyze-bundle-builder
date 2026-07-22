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
          <span className="badge-discount font-badge absolute top-0 left-0">{product.badge}</span>
        )}
        <img
          src={displayImage}
          alt={product.name}
          className="w-[6.3125rem] h-[8.5625rem] object-contain rounded-[0.3125rem] bg-gray-000"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 min-w-0 flex-1">
        {/* Text */}
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <h3 className="font-product-name text-gray-900 m-0">
            {product.name}
          </h3>
          <p className="pt-2 font-description text-secondary-text">
            {product.description}{' '}
            <a href="#" className="font-body text-xs text-blue-700 underline cursor-pointer" onClick={e => e.preventDefault()}>
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
          <QuantityStepper
            value={qty}
            onChange={handleQtyChange}
            min={product.required ? 1 : 0}
            max={product.required ? 1 : 99}
          />
          <div className="flex flex-col items-end">
            {product.comparePrice !== undefined && (
              <span className="price-original font-price-strike text-base">{fmt(product.comparePrice, product.isMonthly)}</span>
            )}
            <span className={`${product.price === 0 ? 'font-price-free text-brand' : 'price-current font-price-current'} text-base -mt-1.5`}>
              {fmt(product.price, product.isMonthly)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
