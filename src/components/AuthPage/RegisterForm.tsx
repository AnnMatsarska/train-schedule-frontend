"use client";

import { APP_ROUTES } from "@/config/routes";
import { useAuth } from "@/context/AuthContext";
import { loginSchema } from "@/validation/login.schema";
import { Box, Button, Paper, TextField, Link as MuiLink } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import styles from "./Auth.module.scss";

export const RegisterForm = () => {
  const { register } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const trimmedValues = {
        email: values.email.trim(),
        password: values.password,
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
      };
      await register(trimmedValues);
    },
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <h1 className={styles.formTitle}> Welcome to Train Journey!</h1>
      <Paper elevation={4} className={styles.authBox}>
        <h5 className={styles.formSubTitle}>Register</h5>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            margin="normal"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />

          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            margin="normal"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Paper>

      <MuiLink
        component={Link}
        href={APP_ROUTES.LOGIN}
        underline="hover"
        sx={{ mt: 3 }}
      >
        Already have an account?
      </MuiLink>
    </Box>
  );
};
