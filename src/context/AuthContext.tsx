"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getUserProfile,
  loginUser,
  registerUser,
} from "@/services/auth.service";
import { APP_ROUTES } from "@/config/routes";
import {
  AuthContextType,
  AuthProviderProps,
  RegisterForm,
  User,
} from "@/types/authContext";
import toast from "react-hot-toast";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string): Promise<void> => {
    setAuthLoading(true);
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      router.push(APP_ROUTES.DASHBOARD);
    } catch (err) {
      console.error("Login failed", err);
      toast.error("Login failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (formData: RegisterForm): Promise<void> => {
    setAuthLoading(true);
    try {
      const data = await registerUser(formData);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      router.push(APP_ROUTES.DASHBOARD);
    } catch (err) {
      console.error("Login failed", err);
      toast.error("Register failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem("token");
    setUser(null);
    router.push(APP_ROUTES.LOGIN);
  };

  const fetchProfile = async (): Promise<void> => {
    try {
      const data = await getUserProfile();
      setUser(data.user);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, authLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
