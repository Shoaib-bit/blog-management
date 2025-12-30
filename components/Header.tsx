import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="w-full bg-white border-b ">
      <div className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={35} height={35} />
          <span className="text-xl font-bold text-gray-800">BlogsApp</span>
        </div>

        {/* Right: Login / Signup */}
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
      </div>
    </header>
  );
};
