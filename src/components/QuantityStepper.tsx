interface Props {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

export function QuantityStepper({ value, onChange, min = 0, max = 99, size = 'md' }: Props) {
  const btnClass = size === 'sm'
    ? 'stepper-btn !w-5 !h-5 !text-sm'
    : 'stepper-btn';
  const countClass = size === 'sm'
    ? 'stepper-count !text-sm'
    : 'stepper-count';

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
        className={`${btnClass} stepper-btn-add`}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
