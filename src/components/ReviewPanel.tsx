import { useReviewItems, useOrderTotals, useBundle } from '../context/BundleContext';
import { ReviewLineItem } from './ReviewLineItem';
import { FastShippingIcon } from './StepIcons';
import type { StepCategory } from '../data/products';

const SECTIONS: { label: string; category: StepCategory }[] = [
  { label: 'Cameras', category: 'cameras' },
  { label: 'Sensors', category: 'sensors' },
  { label: 'Accessories', category: 'accessories' },
  { label: 'Plan', category: 'plans' },
];

export function ReviewPanel() {
  const items = useReviewItems();
  const { totalSale, totalCompare, savings } = useOrderTotals();
  console.log(items)
  const { saveSystem } = useBundle();

  const hasItems = items.length > 0;

  function handleCheckout() {
    alert('Proceeding to checkout!');
  }

  return (
    <div className="review-panel flex flex-col gap-0 pb-7">
      {/* Header */}
      <h1 className="px-3.5 pt-3.5 font-caps text-muted-text max-md:text-[0.625rem]">Review</h1>
      < div className="mx-5 mb-3 border-b border-card-border" >
        <h2 className="pt-5.25 font-review-title text-gray-900 m-0">
          Your security system
        </h2>
        <p className="font-review-description text-xs md:text-sm  mt-1 pb-2 max-w-[21.875rem] text-secondary-text">
          Review your personalized protection system designed to keep what matters most safe.
        </p>
      </div >

      {/* Line items by section */}
      {
        hasItems ? (
          <div className="flex flex-col gap-4 ps-5 pe-5 md:pe-7.5">
            {SECTIONS.map(({ label, category }) => {
              const sectionItems = items.filter(i => i.product.category === category);
              if (!sectionItems.length) return null;
              return (
                <div key={category} className="border-b border-gray-400">
                  <h3 className="font-section-label text-muted-text pb-1.5">{label}</h3>
                  <div className="flex flex-col">
                    {sectionItems.map(item => (
                      <ReviewLineItem
                        key={`${item.product.id}-${item.variantId}`}
                        {...item}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="font-body text-xs text-center py-4 text-gray-500">
            No items selected yet.
          </p>
        )
      }

      {/* Shipping row */}
      <div
        className="flex items-center justify-between py-2 mt-2 ps-5 pe-5 md:pe-7.5">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-000 shrink-0"
          >
            <FastShippingIcon size={29} />
          </div>
          <span className="font-ui-label text-gray-900">Fast Shipping</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="price-original font-price-strike text-[0.75rem] md:text-[0.8125rem]">$5.99</span>
          <span className="shipping-free-badge font-price-total text-brand text-[0.75rem] md:text-sm">FREE</span>
        </div>
      </div>

      {/* Financing / total */}
      <div className="flex flex-col gap-1 ps-5 pe-5 md:pe-7.5">
        {/* Guarantee + financing row */}
        <div className="flex items-center justify-between">
          {/* Satisfaction badge */}
          <img
            src="/Satisfaction-Badge.png"
            alt="100% Wyze Satisfaction Guarantee"
            className="w-18 h-18 object-contain shrink-0"
          />
          {/* As-low-as */}
          <div className="flex flex-col items-end gap-1">
            <span
              className='badge-discount font-badge'
            >
              as low as ${((totalSale) / 12 + 9.99).toFixed(2)}/mo
            </span>
            <div className="flex items-baseline gap-1">
              <span className="price-original font-price-strike text-lg">
                ${totalCompare.toFixed(2)}
              </span>
              <span className="font-price-total text-2xl text-brand">
                ${totalSale.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Savings callout */}
        {savings > 0 && (
          <p
            className="font-emphasis text-center text-xs pt-3 text-success m-0"
          >
            Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
          </p>
        )}
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-2 mt-1 ps-5 pe-5 md:pe-7.5">
        <button className="btn-checkout font-cta" onClick={handleCheckout}>
          Checkout
        </button>
        <button className="font-link-muted text-link-muted cursor-pointer bg-transparent border-none hover:text-heading text-center italic" onClick={saveSystem}>
          Save my system for later
        </button>
      </div>
    </div >
  );
}
