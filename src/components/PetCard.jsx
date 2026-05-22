"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";

const PetCard = ({ pet }) => {
  const { _id, petName, species, breed, age, imageURL } = pet;

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md w-[280px]">
      {/* Image */}
      <div className="relative w-full h-52">
        <Image src={imageURL} alt={petName} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        {/* Name + Species Badge */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-[#1a1a1a]">{petName}</h3>
          <span className="bg-[#d4f5ef] text-[#2a9d8f] text-xs font-medium px-3 py-1 rounded-full">
            {species}
          </span>
        </div>

        {/* Breed + Age */}
        <p className="text-sm text-[#7a7a7a]">
          {breed} • {age} Year{age > 1 ? "s" : ""} Old
        </p>

        {/* Button */}
        <Button
          as={Link}
          href={`/pets/${_id}`}
          variant="bordered"
          className="w-full border-[#2a9d8f] text-[#2a9d8f] font-medium"
          radius="lg"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default PetCard;
