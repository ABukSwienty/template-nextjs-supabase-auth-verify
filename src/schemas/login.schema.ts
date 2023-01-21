import * as yup from "yup";

const LOGIN_SCHEMA = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default LOGIN_SCHEMA;
