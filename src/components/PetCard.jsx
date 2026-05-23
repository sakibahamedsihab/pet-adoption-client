"use client";

import Image from "next/image";
import Link from "next/link";

const PetCard = ({ pet }) => {
  const { _id, petName, species, breed, age, imageURL } = pet;

  return (
    <div className="bg-[#FAF6EE] border-[3px] border-[#2B1A0E] shadow-[8px_8px_0px_#2B1A0E] flex flex-col hover:-translate-y-1 hover:shadow-[12px_12px_0px_#2B1A0E] transition-all duration-200">
      {/* Image Container with Badge */}
      <div className="relative w-full h-52 border-b-[3px] border-[#2B1A0E] bg-[#2B1A0E] overflow-hidden">
        <Image
          src={imageURL ? imageURL : ""}
          alt={petName ? petName : "Not Found"}
          fill
          className="object-cover"
        />
        {/* Species Badge */}
        <div className="absolute top-3 right-3 font-mono text-[10px] font-bold text-[#2B1A0E] uppercase tracking-widest bg-[#C9922A] border-[2px] border-[#2B1A0E] px-2 py-1 shadow-[2px_2px_0px_#2B1A0E]">
          {species}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col grow gap-4">
        {/* Name */}
        <h3 className="font-serif text-2xl font-black text-[#2B1A0E] truncate">
          {petName}
        </h3>

        {/* Breed + Age List */}
        <div className="font-mono text-sm text-[#7B4F2E] flex flex-col gap-1.5 border-l-[3px] border-[#C9922A] pl-3">
          <p>
            Breed:{" "}
            <span className="font-bold text-[#2B1A0E] truncate">{breed}</span>
          </p>
          <p>
            Age:{" "}
            <span className="font-bold text-[#2B1A0E]">
              {age} Year{age > 1 ? "s" : ""}
            </span>
          </p>
        </div>

        {/* Updated Button */}
        <div className="mt-auto pt-4">
          <Link
            href={`/pets/${_id}`}
            className="block w-full text-center font-mono font-bold text-xs uppercase tracking-widest text-[#FAF6EE] bg-[#7B1F1F] border-[2px] border-[#2B1A0E] py-3.5 shadow-[5px_5px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150"
          >
            ✦ View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
