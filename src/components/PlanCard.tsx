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
      className={`plan-card flex flex-col h-full cursor-pointer transition-all ${
        isSelected ? 'plan-card-selected' : ''
      }`}
      onClick={handleSelect}
    >
      <h3 className="plan-title">{product.name}</h3>
      
      {product.badge && (
        <div className={`plan-badge-pill ${product.id === 'cam-plus' ? 'badge-single' : 'badge-unlimited'}`}>
          {product.badge}
        </div>
      )}

      <div className="plan-price flex items-baseline gap-2">
        {product.comparePrice !== undefined && product.comparePrice > product.price && (
          <span className="price-original" style={{ fontSize: '1.125rem' }}>
            ${product.comparePrice.toFixed(2)}{product.isMonthly ? '/mo' : ''}
          </span>
        )}
        <span>{priceDisplay}</span>
      </div>

      {product.listHeader && (
        <div className="plan-list-header">{product.listHeader}</div>
      )}

      {features.length > 0 && (
        <ul className="plan-features-list">
          {features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      )}

      <button
        className={`plan-cta-btn mt-auto flex items-center justify-center gap-1 ${
          isSelected ? 'active' : ''
        }`}
        onClick={(e) => {
          e.stopPropagation();
          handleSelect();
        }}
      >
        <span>Learn more</span>
        <span className="chevron">&gt;</span>
      </button>
    </div>
  );
}
