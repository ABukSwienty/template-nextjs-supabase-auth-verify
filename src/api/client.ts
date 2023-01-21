import axios from "axios";

const client = axios.create({
  baseURL: process.env.API_URL ?? "http://localhost:3000/",
});

export const methods = {
  get: async <ReturnType>(path: string) =>
    client
      .get<{ data: ReturnType }>(path)
      .then((res) => res)
      .catch(handleError),
  post: async <ReturnType, DataType>(path: string, data: DataType) =>
    client
      .post<{ data: ReturnType }>(path, data)
      .then((res) => res)
      .catch(handleError),
  put: async <ReturnType, DataType>(path: string, data: DataType) =>
    client
      .put<{ data: ReturnType }>(path, data)
      .then((res) => res)
      .catch(handleError),
  delete: async <ReturnType>(path: string) =>
    client
      .delete<{ data: ReturnType }>(path)
      .then((res) => res)
      .catch(handleError),
};

const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data && typeof error.response.data === "string") {
      return error.response.data;
    }
    return "Something went wrong";
  }
  return "Something went wrong";
};

const handleError = (error: unknown) => {
  throw new Error(getErrorMessage(error));
};

export default client;
