import { methods } from "@/api/client";
import { SignUpResponse, SignUpUser } from "@/pages/api/auth/sign-up";
import routes from "@/util/routes";

export const useSignUp = () => async (data: SignUpUser) =>
  await methods.post<SignUpResponse, SignUpUser>(routes.api["sign-up"], data);

export const useVerifyEmail = () => async (token: string) =>
  await methods.post(routes.api["verify-email"], { token });
