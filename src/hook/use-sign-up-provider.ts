import { SignUpContext } from "@/components/organisms/sign-up/provider";
import { useContext } from "react";

const useSignUpProvider = () => {
  const ctx = useContext(SignUpContext);
  if (!ctx)
    throw new Error("useSignUpProvider must be used within a SignUpProvider");
  return ctx;
};

export default useSignUpProvider;
