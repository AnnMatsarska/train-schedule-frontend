"use client";

import { APP_ROUTES } from "@/config/routes";
import { useAuth } from "@/context/AuthContext";
import { loginSchema } from "@/validation/login.schema";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import styles from "./Auth.module.scss";

export const LoginForm = () => {
  const { login, authLoading } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      await login(values.email.trim(), values.password);
    },
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <h1 className={styles.formTitle}> Hello Again!</h1>
      <Paper elevation={4} className={styles.authBox}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit}>
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

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
            loading={authLoading}
            disabled={authLoading}
          >
            Login
          </Button>
        </form>
      </Paper>

      <MuiLink
        component={Link}
        href={APP_ROUTES.REGISTER}
        underline="hover"
        sx={{ mt: 3 }}
      >
        Don’t have an account?
      </MuiLink>
    </Box>
  );
};
