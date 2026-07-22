import { PRODUCTS, type Product } from '../data/products';
import { useBundle } from '../context/BundleContext';

interface Props {
  product: Product;
}

export function PlanCard({ product }: Props) {
  const { getQty, setQty } = useBundle();

  const qty = getQty(product.id, '');
  const isSelected = qty > 0;

  const priceDisplay = product.priceDisplay ?? `$${product.price.toFixed(2)}${product.isMonthly ? '/mo' : ''}`;
  const features = product.features ?? [];

  function handleSelect() {
    if (isSelected) {
      // Toggle off
      setQty(product.id, '', 0);
    } else {
      // Select this plan and deselect all other plans
      const planProducts = PRODUCTS.filter(p => p.category === 'plans');
      planProducts.forEach(p => {
        setQty(p.id, '', p.id === product.id ? 1 : 0);
      });
    }
  }

  return (
    <div
      className={`flex flex-col h-full cursor-pointer transition-all bg-white border-2 rounded-xl py-6 px-5 hover:border-gray-500 ${isSelected ? 'border-brand' : 'border-card-border'
        }`}
      onClick={handleSelect}
    >
      <h3 className="font-plan-title text-gray-900 mb-2">{product.name}</h3>

      {product.badge && (
        <div className={`font-plan-badge inline-block w-fit px-2 py-1 rounded mb-3 ${product.id === 'cam-plus' ? 'bg-gray-200 text-gray-600' : 'bg-surface-subtle text-brand'}`}>
          {product.badge}
        </div>
      )}

      <div className="font-plan-price text-gray-900 mb-4 flex flex-col items-baseline">
        {product.comparePrice !== undefined && product.comparePrice > product.price && (
          <span className="font-price-strike text-lg">
            ${product.comparePrice.toFixed(2)}{product.isMonthly ? '/mo' : ''}
          </span>
        )}
        <span>{priceDisplay}</span>
      </div>

      {product.listHeader && (
        <div className="font-plan-list-header text-gray-900 mb-3">{product.listHeader}</div>
      )}

      {features.length > 0 && (
        <ul className="font-plan-feature list-none p-0 mb-6">
          {features.map((feature, i) => (
            <li
              key={i}
              className="relative pl-5 text-gray-800 mb-2.5 before:content-['◦'] before:absolute before:left-0 before:text-gray-400 before:text-lg before:-top-px before:font-medium"
            >
              {feature}
            </li>
          ))}
        </ul>
      )}

      <button
        className="font-emphasis text-sm mt-auto flex items-center justify-center gap-1 w-fit bg-brand-primary text-gray-000 border-none rounded px-4 py-2 cursor-pointer transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          handleSelect();
        }}
      >
        <span>Learn more</span>
        <span className="text-xs font-bold">&gt;</span>
      </button>
    </div>
  );
}
