"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";

const Banner = () => {
  return (
    <section className="bg-[#fdf8f3] min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1 max-w-lg">
          {/* Badge */}
          <span className="inline-block bg-[#d4f5ef] text-[#2a9d8f] text-xs font-medium px-3 py-1 rounded-full mb-6">
            Compassionate Adoption
          </span>

          {/* Heading */}
          <h1 className="text-5xl font-bold text-[#1a1a1a] leading-tight mb-5">
            Find Your Forever <span className="text-[#7c3b1e]">Friend</span>
          </h1>

          {/* Description */}
          <p className="text-[#5c4a3a] text-base leading-relaxed mb-8 max-w-sm">
            Every pet deserves a loving home. We make the adoption process
            joyful, secure, and straightforward, connecting compassionate
            seekers with their perfect companion.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Button
              as={Link}
              href="/all-pets"
              className="bg-[#7c3b1e] text-white font-medium px-6"
              radius="full"
              size="md"
            >
              Adopt Now
            </Button>
            <Button
              as={Link}
              href="#about"
              variant="bordered"
              className="text-[#1a1a1a] border-[#c4b8ae] font-medium px-6"
              radius="full"
              size="md"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-end">
          <div className="relative w-[420px] h-[420px] rounded-3xl overflow-hidden">
            <Image
              src="/hero.jpg"
              alt="Adorable golden retriever puppy"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
