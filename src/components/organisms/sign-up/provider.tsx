import useSteppedComponents from "@/hook/use-stepped-components";
import { SignUpUser } from "@/pages/api/auth/sign-up";
import { User } from "@prisma/client";
import React, { createContext, useCallback, useState } from "react";
import CreateUser from "./create-user";
import VerifyEmail from "./verify-email";

export type CreateUser = Pick<User, "email" | "password" | "name" | "phone">;

export interface SignUpStepProps {
  handleNext: () => void;
}

export interface SignUpContextInterface {
  user: SignUpUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<SignUpUser | undefined>>;
  stepHandler: ReturnType<typeof useSteppedComponents<SignUpStepProps>>;
}

export const SignUpContext = createContext<SignUpContextInterface>(undefined!);

const SignUpProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<SignUpUser>();

  const stepHandler = useSteppedComponents<SignUpStepProps>({
    steps: [CreateUser, VerifyEmail],
    startStep: 0,
  });

  return (
    <SignUpContext.Provider
      value={{
        user,
        setUser,
        stepHandler,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export default SignUpProvider;
