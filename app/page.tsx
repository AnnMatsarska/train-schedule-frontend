"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/config/routes";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/Spinner/Spinner";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(APP_ROUTES.DASHBOARD);
    } else {
      router.push(APP_ROUTES.LOGIN);
    }
  }, [user]);

  return <Spinner />;
}
