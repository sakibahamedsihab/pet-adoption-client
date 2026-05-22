"use client";

import Link from "next/link";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="bg-[#F5EDE0] min-h-[90vh] flex items-center px-4 py-12 border-b-[3px] border-[#2B1A0E]">
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1 max-w-lg">
          {/* Badge */}
          <div className="inline-block bg-[#FAF6EE] border-[2px] border-[#2B1A0E] px-3 py-1 mb-6 shadow-[3px_3px_0px_#2B1A0E]">
            <span className="font-mono text-xs font-bold text-[#7B1F1F] uppercase tracking-widest">
              ✦ Compassionate Adoption
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-5xl md:text-6xl font-black text-[#2B1A0E] leading-tight mb-5">
            Find Your Forever{" "}
            <span className="text-[#7B1F1F] relative inline-block">
              Friend
              {/* Highlight underline effect */}
              <span className="absolute bottom-2 left-0 w-full h-3 bg-[#C9922A] -z-10"></span>
            </span>
          </h1>

          {/* Description */}
          <p className="font-mono text-[#7B4F2E] text-sm md:text-base leading-relaxed mb-8 border-l-[3px] border-[#C9922A] pl-4">
            Every pet deserves a loving home. We make the adoption process
            joyful, secure, and straightforward, connecting compassionate
            seekers with their perfect companion.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/all-pets"
              className="font-mono font-bold text-xs uppercase tracking-widest text-[#FAF6EE] bg-[#7B1F1F] border-[2px] border-[#2B1A0E] px-8 py-3.5 shadow-[5px_5px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150"
            >
              ✦ Adopt Now
            </Link>
            <Link
              href="#about"
              className="font-mono font-bold text-xs uppercase tracking-widest text-[#2B1A0E] bg-[#FAF6EE] border-[2px] border-[#2B1A0E] px-8 py-3.5 shadow-[5px_5px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative w-full max-w-[420px] aspect-square bg-[#FAF6EE] border-[3px] border-[#2B1A0E] shadow-[12px_12px_0px_#2B1A0E] p-2 md:p-3">
            <div className="relative w-full h-full border-[2px] border-[#2B1A0E] overflow-hidden">
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
      </div>
    </section>
  );
};

export default Banner;
