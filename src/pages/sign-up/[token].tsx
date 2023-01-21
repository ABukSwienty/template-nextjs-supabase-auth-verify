import PageLayout from "@/components/templates/page-layout";
import { useVerifyEmail } from "@/hook/api";
import routes from "@/util/routes";
import { Flex, Heading, Spinner } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const VerifyEmail = ({ token }: { token: string }) => {
  const [attempted, setAttempted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const verify = useVerifyEmail();
  const router = useRouter();

  const handleVerify = useCallback(async () => {
    if (!token) {
      toast.error("No token provided");
      return;
    }
    if (attempted) {
      return;
    }
    setAttempted(true);
    setIsFetching(true);
    try {
      await verify(token);

      setIsValid(true);
    } catch (error) {
      setIsError(true);
    }
    setIsFetching(false);
  }, [attempted, token, verify]);

  useEffect(() => {
    const debounce = setTimeout(handleVerify, 1000);
    return () => clearTimeout(debounce);
  }, [handleVerify]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (isValid) {
        router.push(routes.login);
      }
    }, 2000);

    return () => clearTimeout(debounce);
  }, [isValid, router]);

  const headingText =
    isFetching && (!isError || !isValid)
      ? "Checking token"
      : isError
      ? "Error!"
      : "Success!";

  return (
    <PageLayout>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        className="grow h-full space-y-12"
      >
        <Heading>{headingText}</Heading>
        {isError && (
          <p className="text-red-700 font-bold">
            There was an error processing this token. Please check your url.
          </p>
        )}
        {isValid && (
          <>
            <p className="text-green-700 font-bold">Email verified!</p>
            <Flex direction="row" alignItems="center">
              <Spinner size="xs" />
              <p className="ml-2">Redirecting...</p>
            </Flex>
          </>
        )}
        {isFetching && (!isError || !isValid) && <Spinner size="lg" />}
      </Flex>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      token: context?.params?.token,
    },
  };
};

export default VerifyEmail;
