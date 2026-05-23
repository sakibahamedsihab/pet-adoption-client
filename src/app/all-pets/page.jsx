// app/all-pets/page.jsx
// এখানে "use client" থাকবে না!

import Image from "next/image";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// আমাদের তৈরি করা ক্লায়েন্ট কম্পোনেন্টগুলো ইমপোর্ট করছি
import SearchFilter from "@/components/SearchFilter";
import PetCard from "@/components/PetCard";

const AllPetsPage = async ({ searchParams }) => {
  const resolvedPromise = await searchParams;
  const search = resolvedPromise?.search || "";
  const species = resolvedPromise?.species || "";

  // data fetching
  const res = await fetch(
    `https://pet-adoption-platform-server-8g3c.onrender.com/pets?search=${search}&species=${species}`,
    {
      cache: "no-store",
    },
  );

  const pets = await res.json();
  console.log(pets);

  return (
    <div className="min-h-screen bg-[#FDF6F2] text-[#2B1A0E]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* হেডার */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="font-serif text-5xl md:text-6xl font-black mb-4">
            Meet Your New Best Friend
          </h1>
          <p className="font-sans text-[#7B4F2E] max-w-xl text-lg mb-10 mx-auto md:mx-0">
            Browse our available companions. Every pet here is looking for a
            loving home and is ready to bring joy to your life.
          </p>
        </div>

        {/* ক্লায়েন্ট কম্পোনেন্ট: Search & Filter */}
        <SearchFilter />

        {/* পেটস গ্রিড (সার্ভার সাইড রেন্ডারিং) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPetsPage;
