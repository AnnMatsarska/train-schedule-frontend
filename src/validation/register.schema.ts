import * as yup from "yup";

export const registerSchema = yup.object({
  firstName: yup
    .string()
    .transform((value) => value.trim())
    .required("First name is required"),
  lastName: yup
    .string()
    .transform((value) => value.trim())
    .required("Last name is required"),
  email: yup
    .string()
    .transform((value) => value.trim())
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});
