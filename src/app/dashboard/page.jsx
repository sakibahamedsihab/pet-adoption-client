"use client";

import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function DashboardOverview() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalListings: 0,
    activeRequests: 0,
    adoptedPets: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      if (!session?.user?.email) return;

      try {
        const petsRes = await fetch(
          `https://pet-adoption-platform-server-8g3c.onrender.com/pets?email=${session.user.email}`,
        );
        const petsData = await petsRes.json();

        const requestsRes = await fetch(
          `https://pet-adoption-platform-server-8g3c.onrender.com/adoption-requests?email=${session.user.email}`,
        );
        const requestsData = await requestsRes.json();

        const totalListings = petsData.length;
        const adoptedPets = petsData.filter(
          (pet) => pet.adopted === true,
        ).length;
        const activeRequests = requestsData.filter(
          (req) => req.status === "pending",
        ).length;

        setStats({
          totalListings,
          activeRequests,
          adoptedPets,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [session]);

  return (
    <div className="bg-[#FAF6EE] border-[3px] border-[#2B1A0E] shadow-[8px_8px_0px_#2B1A0E] p-4 sm:p-6 md:p-8 max-w-5xl w-full">
      <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#2B1A0E] mb-2">
        Dashboard Overview
      </h2>
      <p className="font-mono text-xs sm:text-sm text-[#7B4F2E] mb-6">
        Manage your pet adoptions, view requests, and update your listings from
        here.
      </p>

      <hr className="border-t-2 border-dashed border-[#C9922A] mb-8" />

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <p className="font-mono font-bold text-[#7B1F1F] animate-pulse uppercase tracking-widest">
            Loading Stats...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Total Listings Card */}
          <div className="bg-white border-[2px] border-[#2B1A0E] p-4 sm:p-6 shadow-[4px_4px_0px_#2B1A0E]">
            <p className="font-mono text-[10px] font-bold text-[#7B1F1F] uppercase tracking-widest mb-2">
              Total Listings
            </p>
            <p className="font-serif text-4xl sm:text-5xl font-black text-[#2B1A0E]">
              {stats.totalListings}
            </p>
          </div>

          {/* Active Requests Card */}
          <div className="bg-white border-[2px] border-[#2B1A0E] p-4 sm:p-6 shadow-[4px_4px_0px_#2B1A0E]">
            <p className="font-mono text-[10px] font-bold text-[#7B1F1F] uppercase tracking-widest mb-2">
              Active Requests
            </p>
            <p className="font-serif text-4xl sm:text-5xl font-black text-[#2B1A0E]">
              {stats.activeRequests}
            </p>
          </div>

          {/* Adopted Pets Card */}
          <div className="bg-white border-[2px] border-[#2B1A0E] p-4 sm:p-6 shadow-[4px_4px_0px_#2B1A0E]">
            <p className="font-mono text-[10px] font-bold text-[#7B1F1F] uppercase tracking-widest mb-2">
              Adopted Pets
            </p>
            <p className="font-serif text-4xl sm:text-5xl font-black text-[#2B1A0E]">
              {stats.adoptedPets}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
