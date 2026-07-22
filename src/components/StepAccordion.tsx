import { type ReactNode } from 'react';
import { useBundle } from '../context/BundleContext';
import { CameraIcon, ChevronDown, ExtraProtectionIcon, PlanIcon, SensorsIcon } from './StepIcons';

const STEP_ICONS: Record<number, typeof CameraIcon | null> = {
  1: CameraIcon,
  2: PlanIcon,
  3: SensorsIcon,
  4: ExtraProtectionIcon,
};

interface Props {
  stepId: number;
  label: string;
  nextLabel: string;
  children: ReactNode;
  className?: string;
}

export function StepAccordion({ stepId, label, nextLabel, children }: Props) {
  const { state, goToStep, getTotalQtyForStep } = useBundle();
  const { activeStep } = state;

  const isActive = activeStep === stepId;
  const selectedCount = getTotalQtyForStep(stepId);

  const StepIcon = STEP_ICONS[stepId];

  function handleHeaderClick() {
    goToStep(isActive ? 0 : stepId);
  }

  return (
    <div className={`step-accordion step-cameras ${isActive ? 'active' : 'inactive'}`}>
      {/* Step label  */}
      <div className="px-3.75 pb-1 step-header-label border-b border-gray-900 flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="font-step-label text-muted-text max-md:text-[0.625rem]">Step {stepId} of 4</span>
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
          {StepIcon && <StepIcon size={20} className="step-icon" />}


          {/* Label */}
          <span className="font-step-title text-gray-900 max-md:text-[1.125rem]">
            {label}
          </span>
        </div>

        {/* State indicator */}
        <div className="font-body flex items-center gap-1 flex-shrink-0 text-brand text-[0.8125rem]">
          {selectedCount > 0 && (
            <span>{selectedCount} selected</span>
          )}
          <span className={`text-gray-600 inline-flex transition-transform duration-300 ease-in-out ${isActive ? 'rotate-180' : ''}`}>
            <ChevronDown size={12} />
          </span>
        </div>
      </div>

      {/* Body */}
      <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="mx-3.75 flex flex-col gap-4">
            {children}

            {nextLabel && (
              <div className="flex my-3.75 justify-center pt-2">
                <button
                  className="btn-next font-cta-outline"
                  onClick={() => goToStep(Math.min(stepId + 1, 4))}
                >
                  Next: {nextLabel}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}
