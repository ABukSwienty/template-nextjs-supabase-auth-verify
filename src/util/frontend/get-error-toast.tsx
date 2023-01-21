import toast from "react-hot-toast";

const getErrorToast = (error: Error | unknown) => {
  if (error instanceof Error) {
    return toast.error(error.message);
  }

  return toast.error("Something went wrong. Please try again.");
};

export default getErrorToast;
