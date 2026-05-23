// src/app/dashboard/layout.jsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  // ইউজার লগ-ইন করা না থাকলে জোর করে লগ-ইন পেজে পাঠিয়ে দেবে (Private Route)
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5EDE0]">
        <p className="font-mono text-[#7B1F1F] font-bold uppercase tracking-widest animate-pulse">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  if (!session) return null; // রিডাইরেক্ট হওয়ার আগে যেন পেজ রেন্ডার না হয়

  // সাইডবারের লিংকগুলো (অ্যাসাইনমেন্টের রিকয়ারমেন্ট অনুযায়ী)
  const sidebarLinks = [
    { label: "Dashboard Home", href: "/dashboard" },
    { label: "Add Pet", href: "/dashboard/add-pet" },
    { label: "My Listings", href: "/dashboard/my-listings" },
    { label: "My Requests", href: "/dashboard/my-requests" },
  ];

  return (
    <div className="min-h-screen bg-[#F5EDE0] flex">
      {/* ✦ সাইডবার (Sidebar) ✦ */}
      <aside className="w-64 bg-[#FAF6EE] border-r-[3px] border-[#2B1A0E] flex flex-col">
        <div className="p-6 border-b-[3px] border-[#2B1A0E]">
          <h2 className="font-serif text-2xl font-black text-[#2B1A0E]">
            Dashboard
          </h2>
          <p className="font-mono text-xs text-[#7B4F2E] mt-1">
            Welcome, {session.user?.name?.split(" ")[0] || "User"}!
          </p>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2">
          {sidebarLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`font-mono text-sm font-bold uppercase tracking-widest px-4 py-3 border-[2px] transition-all duration-150 ${
                  isActive
                    ? "bg-[#7B1F1F] text-[#FAF6EE] border-[#2B1A0E] shadow-[4px_4px_0px_#2B1A0E] translate-x-[-2px] translate-y-[-2px]"
                    : "bg-transparent text-[#2B1A0E] border-transparent hover:border-[#2B1A0E] hover:bg-[#FDF6F2]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ✦ মূল কন্টেন্ট (Main Content Area) ✦ */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
