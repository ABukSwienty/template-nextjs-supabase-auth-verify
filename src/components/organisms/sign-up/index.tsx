import StepBars from "@/components/molecules/step-bars";
import useSignUpProvider from "@/hook/use-sign-up-provider";
import { Box, Button, Container, Flex, Heading } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import SignUpProvider from "./provider";

const Component = () => {
  const {
    stepHandler: {
      CurrentStep,
      step,
      totalSteps,
      isPrevStepAvailable,
      isNextStepAvailable,
      handleNextStep,
      handlePrevStep,
    },
  } = useSignUpProvider();

  return (
    <Container
      maxW="xl"
      className="grow h-full flex flex-col justify-between items-center"
    >
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        className="py-8"
      >
        <StepBars totalSteps={totalSteps} currentStep={step} className="mb-8" />
        <Heading>Signup</Heading>
      </Flex>
      <Box className="grow flex items-center w-full">
        <AnimatePresence mode="wait">
          <CurrentStep key={step} handleNext={handleNextStep} />
        </AnimatePresence>
      </Box>
      <motion.div
        layout="position"
        className="space-x-8 py-8 flex justify-center items-center"
      >
        {step !== 0 && (
          <Button isDisabled={!isPrevStepAvailable} onClick={handlePrevStep}>
            Back
          </Button>
        )}
        <Button type="submit" form="sign-up" isDisabled={!isNextStepAvailable}>
          Next
        </Button>
      </motion.div>
    </Container>
  );
};

const SignUp = () => {
  return (
    <SignUpProvider>
      <Component />
    </SignUpProvider>
  );
};

export default SignUp;
