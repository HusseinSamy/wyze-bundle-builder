import { type ReactNode } from 'react';
import { useBundle } from '../context/BundleContext';
import { ChevronDown, ChevronUp } from './StepIcons';

const STEP_ICON_SRCS: Record<number, string | null> = {
  1: '/icons/camera-icon.svg',
  2: '/icons/plan-icon.svg',
  3: '/icons/sensors-icon.svg',
  4: '/icons/extra-protection-icon.svg',
};

interface Props {
  stepId: number;
  label: string;
  nextLabel: string;
  children: ReactNode;
  className?: string;
}

export function StepAccordion({ stepId, label, nextLabel, children, className }: Props) {
  const { state, goToStep, completeStep, getTotalQtyForStep } = useBundle();
  const { activeStep } = state;

  const isActive = activeStep === stepId;
  const selectedCount = getTotalQtyForStep(stepId);

  const iconSrc = STEP_ICON_SRCS[stepId];

  function handleHeaderClick() {
    // Only step 1 can collapse to a fully-closed state; it starts open on first visit.
    goToStep(stepId === 1 && isActive ? 0 : stepId);
  }

  return (
    <div className={`step-accordion ${isActive ? 'active' : 'inactive'} ${className ?? ''}`}>
      {/* Step label  */}
      <div className="px-[15px] pt-[15px] pb-1 step-header-label border-b border-gray-900 flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="step-label">Step {stepId} of 4</span>
      </div>
      {/* Header */}
      <div
        className="step-header"
        onClick={handleHeaderClick}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && handleHeaderClick()}
        aria-expanded={isActive}
      >
        <div className="flex items-center gap-2 pt-1">
          {/* Icon */}
          <img
            src={iconSrc ?? undefined}
            alt=""
            aria-hidden="true"
            className="step-icon"
            style={{ objectFit: 'contain' }}
          />


          {/* Label */}
          <span
            className="step-title"
            style={{
              fontWeight: 600,
              color: '#1F1F1F',
              lineHeight: 1.2,
            }}
          >
            {label}
          </span>
        </div>

        {/* State indicator */}
        <div
          className="flex items-center gap-1 flex-shrink-0"
          style={{ color: '#4E2FD2', fontSize: '0.8125rem', fontWeight: 400, fontFamily: 'Gilroy-Medium' }}
        >
          {selectedCount > 0 && (
            <span>{selectedCount} selected</span>
          )}
          <span style={{ color: '#6F7882' }}>
            {isActive ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </span>
        </div>
      </div>

      {/* Body */}
      {
        isActive && (
          <div className="mx-[15px] flex flex-col gap-4">
            {children}

            {nextLabel && (
              <div className="flex my-[15px] justify-center pt-2">
                <button
                  className="btn-next"
                  onClick={() => completeStep(stepId)}
                >
                  Next: {nextLabel}
                </button>
              </div>
            )}
          </div>
        )
      }
    </div >
  );
}
