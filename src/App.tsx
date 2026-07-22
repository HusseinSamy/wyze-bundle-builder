import { BundleProvider } from './context/BundleContext';
import { StepAccordion } from './components/StepAccordion';
import { ProductCard } from './components/ProductCard';
import { PlanCard } from './components/PlanCard';
import { ReviewPanel } from './components/ReviewPanel';
import { PRODUCTS } from './data/products';
import { STEPS } from './data/steps';

function Builder() {
  return (
    <>
      <div className="page-heading">
        <h1 className="font-display m-0">Let's get started!</h1>
      </div>
      <div className="builder-root">
        {/* Left: Steps */}
        <div className="steps-panel">
          {STEPS.map(step => {
            // Fileters products based on step category - omitting the accessories
            const products = PRODUCTS.filter(p => p.category === step.category);
            const hasOneItem = products.length === 1;

            let gridClass = 'camera-grid';
            if (step.category === 'plans') {
              gridClass = 'plans-grid';
            } else if (hasOneItem) {
              gridClass = 'one-item-grid';
            }

            return (
              <StepAccordion
                key={step.id}
                stepId={step.id}
                label={step.label}
                nextLabel={step.nextLabel}
              >
                {products.length === 0 ? (
                  <p className="text-sm text-center py-8 text-brand">
                    No options available yet.
                  </p>
                ) : (
                  <div className={gridClass}>
                    {products.map(product => {
                      if (step.category === 'plans') {
                        return <PlanCard key={product.id} product={product} />;
                      }
                      return <ProductCard key={product.id} product={product} />;
                    })}
                    {hasOneItem && (
                      <div className="invisible-placeholder card" aria-hidden="true" />
                    )}
                  </div>
                )}
              </StepAccordion>
            );
          })}
        </div>

        {/* Right: Review panel */}
        <div className="review-sticky">
          <ReviewPanel />
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BundleProvider>
      <Builder />
    </BundleProvider>
  );
}
