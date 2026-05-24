"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import ProfileDropdown from "../ProfileDropdown";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // ডাটাবেস থেকে আসল ইউজারের সেশন ডেটা নিয়ে আসা হচ্ছে
  const { data: session } = useSession();
  const user = session?.user;

  // ✦ নেভবার একদম ক্লিন— শুধু মেইন পেজ দুটো রাখা হলো ✦
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Pets", href: "/all-pets" },
  ];

  // লগআউট করার ফাংশন
  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

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
            <div className="flex items-center gap-4">
              {/* Profile Dropdown */}
              <ProfileDropdown user={user} />

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="font-mono font-bold text-xs uppercase tracking-widest text-[#FAF6EE] bg-[#2B1A0E] border-[2px] border-[#2B1A0E] px-4 py-2 shadow-[3px_3px_0px_#C9922A] hover:shadow-[1px_1px_0px_#C9922A] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 cursor-pointer"
              >
                Logout
              </button>
            </div>
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
