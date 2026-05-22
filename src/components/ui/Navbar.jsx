"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import Image from "next/image";

const Navbar = () => {
  const user = false;
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Pets", href: "/all-pets" },
  ];
  if (user) {
    navLinks.push({ label: "My Requests", href: "/my-requests" });
  }

  return (
    <main className="bg-[#fdf8f3] z-10 shadow-xs">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <Image src="/logo.png" alt="PawsHome logo" width={36} height={36} />
          <span className="text-[#7c3b1e] text-lg font-medium tracking-tight">
            PawsHome
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm no-underline transition-colors ${
                pathname === href
                  ? "text-[#7c3b1e] font-medium border-b-2 border-[#7c3b1e] pb-0.5"
                  : "text-[#5c4a3a]"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          {user ? (
            <div>
              <Button
                as={Link}
                href="/register"
                className="bg-[#7c3b1e] text-white font-medium"
                radius="sm"
                size="sm"
              >
                Add Pet
              </Button>
            </div>
          ) : (
            <div>
              <Button
                as={Link}
                href="/login"
                variant="bordered"
                className="text-[#7c3b1e] border-[#7c3b1e] font-medium"
                radius="sm"
                size="sm"
              >
                Login
              </Button>
              <Button
                as={Link}
                href="/register"
                className="bg-[#7c3b1e] text-white font-medium"
                radius="sm"
                size="sm"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </nav>
    </main>
  );
};

export default Navbar;
