import type { Variant } from '../data/products';

interface Props {
  variants: Variant[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function VariantChip({ variants, activeId, onSelect }: Props) {
  if (!variants.length) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {variants.map(v => (
        <button
          key={v.id}
          className={`variant-chip ${activeId === v.id ? 'active' : ''}`}
          onClick={() => onSelect(v.id)}
        >
          {v.image ? (
            <img
              src={v.image}
              alt=""
              aria-hidden="true"
              style={{ width: '0.875rem', height: '0.875rem', objectFit: 'contain', flexShrink: 0 }}
            />
          ) : (
            <span className="swatch" style={{ backgroundColor: v.swatchColor }} />
          )}
          {v.label}
        </button>
      ))}
    </div>
  );
}
