import { useSignUp } from "@/hook/api";
import useSignUpProvider from "@/hook/use-sign-up-provider";
import getErrorToast from "@/util/frontend/get-error-toast";
import {
  Box,
  Button,
  ButtonGroup,
  ButtonSpinner,
  Flex,
  Heading,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import signUpStepVariants from "./step-variants";

const VerifyEmail = () => {
  const [isFetching, setIsFetching] = useState(false);
  const { user } = useSignUpProvider();
  const createUser = useSignUp();

  const handleSignUp = useCallback(async () => {
    if (!user) {
      toast.error("Something went wrong. Please check your details again.");
      return;
    }
    setIsFetching(true);
    try {
      await createUser(user);
      toast.success("Account created. Please check your email.");
      toast.success(
        "It may take up to five minutes to receive verification mail. If you don't receive it, please check your spam folder or request a new token by clicking the button below.",
        {
          duration: 8000,
        }
      );
    } catch (error) {
      getErrorToast(error);
    }

    setIsFetching(false);
  }, [createUser, user]);

  return (
    <motion.section
      variants={signUpStepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="border p-8 rounded-md bg-white shadow-sm w-full flex items-center justify-center flex-col space-y-8"
    >
      <Heading size="lg">Almost there!</Heading>
      <Box className="w-full space-y-2">
        <Heading size="xs" className="text-gray-600">
          Your account
        </Heading>
        <Flex
          justifyContent="center"
          className="space-x-8 text-sm border py-3 px-6 rounded-lg"
        >
          <Box className="w-1/3 truncate cursor-pointer">
            <p className="text-gray-500">Name</p>
            <Tooltip label={user?.name}>
              <Text className="truncate">{user?.name}</Text>
            </Tooltip>
          </Box>

          <Box className="w-1/3 truncate cursor-pointer">
            <p className="text-gray-500">Email</p>
            <Tooltip label={user?.email}>
              <Text className="truncate">{user?.email}</Text>
            </Tooltip>
          </Box>
          <Box className="w-1/3 truncate cursor-pointer">
            <p className="text-gray-500">Phone</p>
            {user?.phone ? (
              <Tooltip label={user?.phone}>
                <Text className="truncate">{user?.phone}</Text>
              </Tooltip>
            ) : (
              <Text className="truncate">not set</Text>
            )}
          </Box>
        </Flex>
      </Box>
      <p className="text-gray-700 text-center">
        Once the account is created you have to verify your email. Please click
        below when you{"'"}re ready.
      </p>
      <Button onClick={handleSignUp} isLoading={isFetching}>
        Create account and verify email
      </Button>
    </motion.section>
  );
};

export default VerifyEmail;
