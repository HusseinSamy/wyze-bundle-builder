import { useReviewItems, useOrderTotals, useBundle } from '../context/BundleContext';
import { ReviewLineItem } from './ReviewLineItem';
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
  const { saveSystem } = useBundle();

  const hasItems = items.length > 0;

  function handleCheckout() {
    alert('Proceeding to checkout! (Prototype — no real checkout flow.)');
  }

  return (
    <div className="review-panel flex flex-col gap-0 pb-7">
      {/* Header */}
      <h1 className="px-[14px] pt-[14px] label-caps">Review</h1>
      < div className="mx-[20px] mb-3 border-b" style={{ borderColor: '#E6EBF0' }} >
        <h2 className="pt-[21px]" style={{ fontSize: '1.375rem', fontWeight: 700, color: '#1F1F1F', margin: 0, lineHeight: 1, letterSpacing: "0.6px" }}>
          Your security system
        </h2>
        <p className="text-xs md:text-sm  mt-1 pb-2 max-w-[350px]" style={{ color: 'rgba(31,31,31,0.75)', lineHeight: 1.4, letterSpacing: "0.6px" }}>
          Review your personalized protection system designed to keep what matters most safe.
        </p>
      </div >

      {/* Line items by section */}
      {
        hasItems ? (
          <div className="flex flex-col gap-4 ps-[20px] pe-[20px] md:pe-[30px]" style={{ letterSpacing: "0.6px" }}>
            {SECTIONS.map(({ label, category }) => {
              const sectionItems = items.filter(i => i.product.category === category);
              if (!sectionItems.length) return null;
              return (
                <div key={category} className="border-b border-gray-400">
                  <h3 className="review-section-label">{label}</h3>
                  <div className="flex flex-col" style={{ borderColor: '#E6EBF0' }}>
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
          <p className="text-xs text-center py-4" style={{ color: '#A8B2BD' }}>
            No items selected yet.
          </p>
        )
      }

      {/* Shipping row */}
      <div
        className="flex items-center justify-between py-2 mt-2 ps-[20px] pe-[20px] md:pe-[30px]">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center"
            style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', background: '#FFFFFF', flexShrink: 0 }}
          >
            <img src="/icons/fast-shipping-icon.svg" alt="" style={{ width: '1.375rem', height: '1.375rem' }} />
          </div>
          <span className="text-sm font-medium" style={{ color: '#1F1F1F' }}>Fast Shipping</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="price-original" style={{ fontSize: '0.8125rem' }}>$5.99</span>
          <span className="shipping-free-badge" style={{ fontWeight: 700, color: '#4E2FD2' }}>FREE</span>
        </div>
      </div>

      {/* Financing / total */}
      <div className="flex flex-col gap-1 ps-[20px] pe-[20px] md:pe-[30px]">
        {/* Guarantee + financing row */}
        <div className="flex items-center justify-between">
          {/* Satisfaction badge */}
          <img
            src="/Satisfaction-Badge.png"
            alt="100% Wyze Satisfaction Guarantee"
            style={{ width: '4.5rem', height: '4.5rem', objectFit: 'contain', flexShrink: 0 }}
          />
          {/* As-low-as */}
          <div className="flex flex-col items-end gap-1">
            <span
              className='badge-discount'
              style={{ borderRadius: "3.5px" }}
            >
              as low as ${((totalSale) / 12 + 9.99).toFixed(2)}/mo
            </span>
            <div className="flex items-baseline gap-1">
              <span className="price-original" style={{ fontSize: '1.125rem' }}>
                ${totalCompare.toFixed(2)}
              </span>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0B0D10' }}>
                ${totalSale.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Savings callout */}
        {savings > 0 && (
          <p
            className="text-center text-xs font-semibold pt-3"
            style={{ color: '#0AA288', margin: 0 }}
          >
            Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
          </p>
        )}
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-2 mt-1 ps-[20px] pe-[20px] md:pe-[30px]">
        <button className="btn-checkout" onClick={handleCheckout}>
          Checkout
        </button>
        <button className="link-muted text-center italic" onClick={saveSystem} style={{ fontSize: "14px", letterSpacing: "-0.02px" }}>
          Save my system for later
        </button>
      </div>
    </div >
  );
}
