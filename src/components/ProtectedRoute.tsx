"use client";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "./Spinner/Spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { APP_ROUTES } from "@/config/routes";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(APP_ROUTES.LOGIN);
    }
  }, [user, loading, router]);

  if (loading || !user) return <Spinner fullPage />;

  return <>{children}</>;
};
