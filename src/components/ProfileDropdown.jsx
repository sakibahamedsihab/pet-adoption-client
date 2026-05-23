// src/components/ProfileDropdown.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const ProfileDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // ড্রপডাউনের বাইরে ক্লিক করলে যেন বন্ধ হয়ে যায়, সেই লজিক
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ✦ ট্রিগার বাটন (ইউজারের ছবি) ✦ */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block transition-transform hover:scale-105 outline-none"
      >
        <img
          src={user?.image}
          alt="User Avatar"
          className="w-10 h-10 rounded-full border-[2px] border-[#2B1A0E] object-cover bg-white"
        />
      </button>

      {/* ✦ ড্রপডাউন মেনু (isOpen true হলেই শুধু দেখাবে) ✦ */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-[#FAF8F5] border-[3px] border-[#2B1A0E] shadow-[6px_6px_0px_#2B1A0E] rounded-xl font-mono p-1.5 z-50 flex flex-col gap-1">
          {/* প্রোফাইল ইনফো (ক্লিক করা যাবে না) */}
          <div className="px-3 py-2 cursor-default border-b-2 border-dashed border-[#C9922A] mb-1">
            <p className="font-semibold text-xs text-[#7B1F1F] mb-0.5">
              Signed in as
            </p>
            <p
              className="font-bold text-sm text-[#2B1A0E] truncate"
              title={user?.email}
            >
              {user?.email}
            </p>
          </div>

          {/* ড্যাশবোর্ড লিংক */}
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="px-3 py-2 text-[#2B1A0E] font-bold rounded-lg hover:bg-[#FDF6F2] hover:border-[#2B1A0E] border-2 border-transparent transition-all"
          >
            Dashboard
          </Link>

          {/* লগ-আউট বাটন */}
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-[#7B1F1F] font-bold rounded-lg hover:bg-[#ffebe9] hover:border-[#7B1F1F] border-2 border-transparent transition-all"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
