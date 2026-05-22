"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";

const Navbar = () => {
  const user = true;
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Pets", href: "/all-pets" },
  ];
  if (user) {
    navLinks.push({ label: "My Requests", href: "/my-requests" });
  }

  return (
    <header className="bg-[#FAF6EE] border-b-[3px] border-[#2B1A0E] z-10">
      <nav className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="no-underline">
          <span className="font-serif text-2xl font-black text-[#7B1F1F] tracking-tight">
            PawsHome
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-10">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`font-mono text-xs uppercase tracking-widest no-underline transition-colors ${
                pathname === href
                  ? "text-[#7B1F1F] font-bold border-b-2 border-[#7B1F1F] pb-0.5"
                  : "text-[#4A2E1A] hover:text-[#7B1F1F]"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link href="/add-pet">
              <button className="font-mono font-bold text-xs uppercase tracking-widest text-[#FAF6EE] bg-[#7B1F1F] border-[2px] border-[#2B1A0E] px-5 py-2 shadow-[4px_4px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 cursor-pointer">
                ✦ Add Pet
              </button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <button className="font-mono font-bold text-xs uppercase tracking-widest text-[#2B1A0E] bg-[#FAF6EE] border-[2px] border-[#2B1A0E] px-5 py-2 shadow-[4px_4px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 cursor-pointer">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="font-mono font-bold text-xs uppercase tracking-widest text-[#FAF6EE] bg-[#7B1F1F] border-[2px] border-[#2B1A0E] px-5 py-2 shadow-[4px_4px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
