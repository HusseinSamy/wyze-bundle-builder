interface Props {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  uniformButtons?: boolean;
}

export function QuantityStepper({ value, onChange, min = 0, max = 99, size = 'md', uniformButtons = false }: Props) {
  const btnClass = size === 'sm'
    ? 'stepper-btn !w-5 !h-5 !text-sm'
    : 'stepper-btn';
  const countClass = size === 'sm'
    ? 'font-ui-compact min-w-5 text-center !text-sm'
    : 'font-ui-compact min-w-5 text-center text-base';

  return (
    <div className="flex items-center gap-1">
      <button
        className={btnClass}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className={countClass}>{value}</span>
      <button
        className={uniformButtons ? btnClass : `${btnClass} stepper-btn-add`}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
