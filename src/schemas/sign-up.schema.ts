import * as yup from "yup";

const SIGN_UP_SCHEMA = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  name: yup.string().required(),
  phone: yup.string(),
});

export default SIGN_UP_SCHEMA;
