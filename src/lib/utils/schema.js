import * as yup from "yup";

export const emailPasswordSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(6)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "The password must contain uppercase, lowercase, numbers and special characters"
    ),
});
