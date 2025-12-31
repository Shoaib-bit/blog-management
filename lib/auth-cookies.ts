"use server";

import { cookies } from "next/headers";
import { User } from "@/types/types";

const ACCESS_TOKEN_KEY = "accessToken";
const USER_KEY = "user";

export async function setAuthCookies(token: string, user: User) {
  const cookieStore = await cookies();

  // Set access token cookie (httpOnly for security)
  cookieStore.set(ACCESS_TOKEN_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  // Set user data cookie (not httpOnly so client can read it)
  cookieStore.set(USER_KEY, JSON.stringify(user), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN_KEY);
  return token?.value || null;
}

export async function getAuthUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get(USER_KEY);

  if (!userCookie?.value) {
    return null;
  }

  try {
    return JSON.parse(userCookie.value) as User;
  } catch {
    return null;
  }
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_KEY);
  cookieStore.delete(USER_KEY);
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthToken();
  const user = await getAuthUser();
  return !!(token && user);
}
