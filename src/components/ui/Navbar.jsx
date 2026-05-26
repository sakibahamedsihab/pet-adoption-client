"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import ProfileDropdown from "../ProfileDropdown";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Pets", href: "/all-pets" },
  ];

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#FAF6EE] border-b-[3px] border-[#2B1A0E] z-50 sticky top-0">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="no-underline flex items-center gap-2">
          <span className="text-xl sm:text-2xl">🐾</span>
          <span className="font-serif text-lg sm:text-2xl font-black text-[#7B1F1F] tracking-tight">
            PawsHome
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
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

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          {user ? (
            <div className="flex items-center gap-3 lg:gap-4">
              <Link href="/dashboard">
                <button className="font-mono font-bold text-xs uppercase tracking-widest text-[#7B1F1F] bg-[#FAF6EE] border-[2px] border-[#2B1A0E] px-3 lg:px-4 py-2 shadow-[3px_3px_0px_#C9922A] hover:shadow-[1px_1px_0px_#C9922A] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 cursor-pointer">
                  Dashboard
                </button>
              </Link>
              <ProfileDropdown user={user} />
              <button
                onClick={handleLogout}
                className="font-mono font-bold text-xs uppercase tracking-widest text-[#FAF6EE] bg-[#2B1A0E] border-[2px] border-[#2B1A0E] px-3 lg:px-4 py-2 shadow-[3px_3px_0px_#C9922A] hover:shadow-[1px_1px_0px_#C9922A] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <button className="font-mono font-bold text-xs uppercase tracking-widest text-[#2B1A0E] bg-[#FAF6EE] border-[2px] border-[#2B1A0E] px-3 lg:px-5 py-2 shadow-[4px_4px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 cursor-pointer">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="font-mono font-bold text-xs uppercase tracking-widest text-[#FAF6EE] bg-[#7B1F1F] border-[2px] border-[#2B1A0E] px-3 lg:px-5 py-2 shadow-[4px_4px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span
            className={`w-6 h-0.5 bg-[#2B1A0E] transition-all ${
              mobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[#2B1A0E] transition-all ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[#2B1A0E] transition-all ${
              mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF6EE] border-t-[2px] border-[#2B1A0E] p-4 space-y-3">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block font-mono text-xs uppercase tracking-widest no-underline px-3 py-2 transition-colors ${
                pathname === href
                  ? "text-[#7B1F1F] font-bold bg-[#FDF6F2] border-l-[3px] border-[#7B1F1F]"
                  : "text-[#4A2E1A] hover:bg-[#FDF6F2]"
              }`}
            >
              {label}
            </Link>
          ))}

          {user && (
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`block font-mono text-xs uppercase tracking-widest no-underline px-3 py-2 transition-colors ${
                pathname === "/dashboard"
                  ? "text-[#7B1F1F] font-bold bg-[#FDF6F2] border-l-[3px] border-[#7B1F1F]"
                  : "text-[#4A2E1A] hover:bg-[#FDF6F2]"
              }`}
            >
              Dashboard
            </Link>
          )}

          <hr className="border-t-[2px] border-dashed border-[#C9922A] my-2" />

          {user ? (
            <button
              onClick={handleLogout}
              className="w-full font-mono font-bold text-xs uppercase tracking-widest text-[#FAF6EE] bg-[#2B1A0E] border-[2px] border-[#2B1A0E] px-3 py-2 shadow-[3px_3px_0px_#C9922A] hover:shadow-[1px_1px_0px_#C9922A] transition-all duration-150 cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <div className="space-y-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full font-mono font-bold text-xs uppercase tracking-widest text-[#2B1A0E] bg-[#FAF6EE] border-[2px] border-[#2B1A0E] px-3 py-2 shadow-[4px_4px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] transition-all duration-150 cursor-pointer">
                  Login
                </button>
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full font-mono font-bold text-xs uppercase tracking-widest text-[#FAF6EE] bg-[#7B1F1F] border-[2px] border-[#2B1A0E] px-3 py-2 shadow-[4px_4px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] transition-all duration-150 cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
