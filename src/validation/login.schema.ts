import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .transform((value) => value.trim())
    .required("Email is required")
    .email("Invalid email format"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});
