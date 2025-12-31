"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { loginAction, logoutAction } from "@/lib/auth-actions";

export const Header = () => {
  const { user, clearAuthState } = useAuth();
  const router = useRouter();

  return (
    <header className="w-full bg-white border-b ">
      <div className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={35} height={35} />
          <span className="text-xl font-bold text-gray-800">BlogsApp</span>
        </div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user.name}</span>
            <Button
              className="cursor-pointer"
              onClick={async() => {
                await logoutAction()
                clearAuthState();
                router.push("/login");
              }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button className="cursor-pointer" variant="outline">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="cursor-pointer">Register</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
