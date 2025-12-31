"use server";

import { clearAuthCookies, setAuthCookies } from "./auth-cookies";
import { redirect } from "next/navigation";
import { User } from "@/types/types";

export async function loginAction(token: string, user: User) {
  await setAuthCookies(token, user);
}

export async function logoutAction() {
  await clearAuthCookies();
  redirect("/login");
}
