import InputWrapper from "@/components/molecules/input-wrapper";
import PasswordInput from "@/components/molecules/password-input";
import useSignUpProvider from "@/hook/use-sign-up-provider";
import SIGN_UP_SCHEMA from "@/schemas/sign-up.schema";
import { Heading, Input } from "@chakra-ui/react";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { SignUpStepProps } from "./provider";
import signUpStepVariants from "./step-variants";

const CreateUser = ({ handleNext }: SignUpStepProps) => {
  const { user, setUser } = useSignUpProvider();
  const { values, errors, handleChange, handleSubmit } = useFormik({
    validateOnChange: false,
    initialValues: {
      email: user?.email || "",
      password: user?.password || "",
      passwordConfirm: user?.password || "",
      name: user?.name || "",
      phone: user?.phone || "",
    },
    onSubmit: ({ passwordConfirm, ...values }) => {
      setUser({ ...values });
      handleNext();
    },
    validationSchema: SIGN_UP_SCHEMA,
  });

  return (
    <motion.section
      variants={signUpStepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="border p-8 rounded-md bg-white shadow-sm"
    >
      <form onSubmit={handleSubmit} id="sign-up" className="space-y-8">
        <div className="space-y-4">
          <Heading size="md">Tell us about yourself</Heading>
          <InputWrapper label="Name" isRequired error={errors?.name}>
            <Input name="name" value={values.name} onChange={handleChange} />
          </InputWrapper>
          <InputWrapper label="Phonenumber" error={errors?.phone}>
            <Input name="phone" value={values.phone} onChange={handleChange} />
          </InputWrapper>
        </div>
        <div className="space-y-4">
          <Heading size="md">Login credentials</Heading>
          <InputWrapper
            label="E-mail"
            isRequired
            error={errors?.email}
            helperText="Make sure this a valid email because we will use it to confirm this account"
          >
            <Input
              name="email"
              placeholder="email"
              value={values.email}
              onChange={handleChange}
            />
          </InputWrapper>
          <InputWrapper label="Password" isRequired error={errors?.password}>
            <PasswordInput
              name="password"
              onChange={handleChange}
              value={values.password}
            />
          </InputWrapper>
          <InputWrapper
            label="Confirm password"
            isRequired
            error={errors?.passwordConfirm}
          >
            <PasswordInput
              name="passwordConfirm"
              onChange={handleChange}
              value={values.passwordConfirm}
            />
          </InputWrapper>
        </div>
      </form>
    </motion.section>
  );
};

export default CreateUser;
