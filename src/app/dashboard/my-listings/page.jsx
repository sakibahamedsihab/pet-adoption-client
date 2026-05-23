// src/app/dashboard/my-listings/page.jsx
"use client";

import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyListingsPage() {
  const { data: session } = useSession();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // ইউজারের ইমেইল পাওয়া গেলেই API কল করবে
  useEffect(() => {
    if (session?.user?.email) {
      fetchMyPets();
    }
  }, [session]);

  const fetchMyPets = async () => {
    try {
      // ইমেইল দিয়ে ফিল্টার করে শুধু এই ইউজারের পেটগুলো আনছি
      const res = await fetch(
        `https://pet-adoption-platform-server-8g3c.onrender.com/pets?email=${session.user.email}`,
      );
      const data = await res.json();
      setPets(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch pets", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="font-mono font-bold text-[#7B1F1F] animate-pulse uppercase tracking-widest">
          Loading your pets... 🐾
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF6EE] border-[3px] border-[#2B1A0E] shadow-[8px_8px_0px_#2B1A0E] p-8 max-w-5xl mx-auto">
      {/* হেডার অংশ */}
      <div className="mb-8 border-b-2 border-dashed border-[#C9922A] pb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-black text-[#2B1A0E]">
            My Listings
          </h1>
          <p className="font-mono text-sm text-[#7B4F2E] mt-1">
            Manage all the pets you have added for adoption.
          </p>
        </div>
        <Link
          href="/dashboard/add-pet"
          className="font-mono font-bold text-xs uppercase tracking-widest text-[#FAF6EE] bg-[#7B1F1F] border-[2px] border-[#2B1A0E] px-5 py-3 shadow-[4px_4px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-center"
        >
          ✦ Add New Pet
        </Link>
      </div>

      {/* ডেটা না থাকলে এই মেসেজ দেখাবে */}
      {pets.length === 0 ? (
        <div className="text-center py-12 bg-[#FDF6F2] border-[2px] border-[#2B1A0E]">
          <p className="font-mono text-[#7B4F2E] font-bold">
            You haven't added any pets yet.
          </p>
        </div>
      ) : (
        /* ডেটা থাকলে টেবিল দেখাবে */
        <div className="overflow-x-auto border-[2px] border-[#2B1A0E]">
          <table className="w-full text-left font-mono whitespace-nowrap">
            <thead>
              <tr className="bg-[#EAE2D3] border-b-[2px] border-[#2B1A0E]">
                <th className="p-4 text-[#2B1A0E] font-bold uppercase tracking-wider text-xs">
                  Pet
                </th>
                <th className="p-4 text-[#2B1A0E] font-bold uppercase tracking-wider text-xs">
                  Name
                </th>
                <th className="p-4 text-[#2B1A0E] font-bold uppercase tracking-wider text-xs">
                  Species
                </th>
                <th className="p-4 text-[#2B1A0E] font-bold uppercase tracking-wider text-xs">
                  Status
                </th>
                <th className="p-4 text-[#2B1A0E] font-bold uppercase tracking-wider text-xs">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet) => (
                <tr
                  key={pet._id}
                  className="border-b-[2px] border-[#2B1A0E] hover:bg-[#FDF6F2] transition-colors last:border-b-0"
                >
                  <td className="p-4">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-12 h-12 rounded-full border-[2px] border-[#2B1A0E] object-cover bg-white"
                    />
                  </td>
                  <td className="p-4 font-bold text-[#2B1A0E]">{pet.name}</td>
                  <td className="p-4 text-[#7B4F2E]">{pet.species}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest border-[2px] border-[#2B1A0E] ${pet.adopted ? "bg-[#C9922A] text-white" : "bg-[#A7C957] text-[#2B1A0E]"}`}
                    >
                      {pet.adopted ? "Adopted" : "Available"}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2 items-center h-full pt-6">
                    {/* এডিট এবং ডিলিট বাটনের কাজ আমরা পরে করবো */}
                    <button className="bg-[#FAF6EE] text-[#2B1A0E] border-[2px] border-[#2B1A0E] px-4 py-1.5 text-xs font-bold hover:bg-[#C9922A] hover:text-white transition-colors">
                      Edit
                    </button>
                    <button className="bg-[#7B1F1F] text-[#FAF6EE] border-[2px] border-[#2B1A0E] px-4 py-1.5 text-xs font-bold hover:bg-red-800 transition-colors">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
