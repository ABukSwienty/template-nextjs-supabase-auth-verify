import { FC, useCallback, useState } from "react";

const useSteppedComponents = <T extends Record<any, any>>({
  steps,
  startStep = 0,
}: {
  steps: FC<T>[];
  startStep?: number;
}) => {
  const [step, setStep] = useState(startStep);

  const handleNextStep = useCallback(() => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  }, [step, steps.length]);

  const handlePrevStep = useCallback(() => {
    if (step > 0) {
      setStep(step - 1);
    }
  }, [step]);

  const setStepTo = useCallback(
    (step: number) => {
      if (step >= 0 && step < steps.length) {
        setStep(step);
      }
    },
    [steps.length]
  );

  const CurrentStep = steps[step];

  const isNextStepAvailable = step < steps.length - 1;
  const isPrevStepAvailable = step > 0;
  const totalSteps = steps.length;
  const isLastStep = step === steps.length - 1;

  return {
    CurrentStep,
    handleNextStep,
    handlePrevStep,
    setStepTo,
    isNextStepAvailable,
    isPrevStepAvailable,
    totalSteps,
    step,
    isLastStep,
  };
};

export default useSteppedComponents;
