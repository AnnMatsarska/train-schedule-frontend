import api from "@/config/axios";
import { API_ROUTES } from "@/config/routes";

export const loginUser = async (email: string, password: string) => {
  const { data } = await api.post(API_ROUTES.LOGIN, { email, password });
  return data;
};

export const registerUser = async (formData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const { data } = await api.post(API_ROUTES.REGISTER, formData);
  return data;
};

export const getUserProfile = async () => {
  const { data } = await api.get(API_ROUTES.PROFILE);
  return data;
};
