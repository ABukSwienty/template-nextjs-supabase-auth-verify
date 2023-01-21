import InputWrapper from "@/components/molecules/input-wrapper";
import PasswordInput from "@/components/molecules/password-input";
import PageLayout from "@/components/templates/page-layout";
import LOGIN_SCHEMA from "@/schemas/login.schema";
import routes from "@/util/routes";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Flex,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import Link from "next/link";

const Login = () => {
  const { values, handleSubmit, handleChange, errors } = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LOGIN_SCHEMA,
    onSubmit: async (values, { setErrors }) => {
      try {
        await signIn("credentials", {
          email: values.email,
          password: values.password,
          callbackUrl: routes.home,
        });
      } catch (error) {
        setErrors({ email: "Login failed!", password: "Login failed!" });
      }
    },
  });

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <PageLayout>
      <Flex
        direction="column"
        className="grow w-full h-full"
        justifyContent="center"
        alignItems="center"
      >
        <Container maxW="md">
          <Card className="border" size="lg">
            <CardHeader>
              <Heading>Login</Heading>
            </CardHeader>
            <CardBody>
              <form id="login" onSubmit={handleSubmit} className="space-y-8">
                <InputWrapper label="E-mail">
                  <Input
                    name="email"
                    placeholder="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </InputWrapper>
                <InputWrapper label="Password">
                  <PasswordInput
                    name="password"
                    placeholder="••••••••"
                    value={values.password}
                    onChange={handleChange}
                  />
                </InputWrapper>

                <motion.p
                  initial={{ opacity: 0, visibility: "hidden" }}
                  animate={{
                    opacity: hasErrors ? 1 : 0,
                    visibility: hasErrors ? "visible" : "hidden",
                  }}
                  className="text-red-500 font-bold"
                >
                  Login failed!
                </motion.p>
              </form>
            </CardBody>
            <CardFooter className="flex flex-row justify-end items-center">
              <Link
                href={routes["sign-up"]}
                className="text-gray-500 font-bold mr-8"
              >
                New user?
              </Link>

              <Button form="login" type="submit">
                Log in
              </Button>
            </CardFooter>
          </Card>
        </Container>
      </Flex>
    </PageLayout>
  );
};

export default Login;
