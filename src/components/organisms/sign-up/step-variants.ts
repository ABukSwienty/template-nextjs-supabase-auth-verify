import { Transition, Variants } from "framer-motion";

const transition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

const signUpStepVariants: Variants = {
  initial: {
    opacity: 0,
    x: 100,
    transition,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition,
  },
  exit: {
    opacity: 0,
    x: -100,
    transition,
  },
};

export default signUpStepVariants;
