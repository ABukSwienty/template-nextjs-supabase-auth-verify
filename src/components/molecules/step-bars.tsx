import { Flex, FlexProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

export interface StepBarProps extends Omit<FlexProps, "onClick"> {
  currentStep: number;
  totalSteps: number;
  onClick?: (step: number) => void;
}

const Bar = ({
  isActive,
  step,
  onClick,
}: {
  isActive: boolean;
  step: number;
  onClick?: (step: number) => void;
}) => {
  const handleClick = () => {
    if (onClick) onClick(step);
  };
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: isActive ? 1.1 : 1 }}
      whileHover={{ scale: onClick && 1.1 }}
      onClick={handleClick}
      className={`${isActive ? "bg-gray-400" : "bg-gray-300"} ${
        onClick ? "cursor-pointer" : ""
      } h-2.5 rounded-full shadow-sm w-16 mx-2`}
    />
  );
};

const StepBars = ({
  currentStep,
  totalSteps,
  direction = "row",
  onClick,
  ...props
}: StepBarProps) => {
  return (
    <Flex direction={direction} {...props}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <Bar
          key={index}
          step={index}
          isActive={index === currentStep}
          onClick={onClick}
        />
      ))}
    </Flex>
  );
};

export default StepBars;
