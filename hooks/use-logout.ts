"use client";

import { useAuth } from "@/context/AuthContext";
import { logoutAction } from "@/lib/auth-actions";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const { clearAuthState } = useAuth();
  const router = useRouter();

  const logout = async () => {
    // Clear client-side state
    clearAuthState();

    // Clear server-side cookies
    await logoutAction();
  };

  return { logout };
};
