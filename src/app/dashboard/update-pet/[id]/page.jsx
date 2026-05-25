"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"; // ✦ Toast ইমপোর্ট করা হলো ✦

export default function UpdatePetPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const [petData, setPetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // ✦ সাবমিট লোডিং স্টেট ✦

  // পেজ লোড হলেই পেটের আগের ডেটা সার্ভার থেকে নিয়ে আসা
  useEffect(() => {
    const fetchSinglePet = async () => {
      try {
        const res = await fetch(
          `https://pet-adoption-platform-server-8g3c.onrender.com/pets/${params.id}`,
        );
        const data = await res.json();
        setPetData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pet data:", error);
        setLoading(false);
      }
    };
    if (params.id) {
      fetchSinglePet();
    }
  }, [params.id]);

  const handleUpdatePet = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData);

    try {
      // আপনার Express সার্ভারের PUT রাউটে আপডেট ডেটা পাঠানো হচ্ছে
      const response = await fetch(
        `https://pet-adoption-platform-server-8g3c.onrender.com/pets/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        },
      );

      if (response.ok) {
        toast.success("Pet updated successfully! 🐾"); // ✦ Alert এর বদলে Toast ✦
        router.push("/dashboard/my-listings"); // আপডেট শেষে My Listings এ ফেরত যাবে
      } else {
        toast.error("Failed to update pet details."); // ✦ Alert এর বদলে Toast ✦
      }
    } catch (error) {
      console.error("Error updating pet:", error);
      toast.error("Something went wrong!"); // ✦ Alert এর বদলে Toast ✦
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full font-mono text-sm text-[#2B1A0E] bg-[#FAF6EE] border-[2px] border-[#2B1A0E] px-4 py-2.5 outline-none focus:shadow-[3px_3px_0px_#2B1A0E] transition-all placeholder:text-[#A08060]";
  const labelClass =
    "font-mono text-xs font-bold text-[#7B1F1F] uppercase tracking-widest mb-1.5 block";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="font-mono font-bold text-[#7B1F1F] animate-pulse uppercase tracking-widest">
          Loading pet details... 🐾
        </p>
      </div>
    );
  }

  if (!petData) {
    return (
      <p className="text-center font-mono mt-10 text-red-600">Pet not found!</p>
    );
  }

  return (
    <div className="bg-[#FAF6EE] border-[3px] border-[#2B1A0E] shadow-[8px_8px_0px_#2B1A0E] p-8 max-w-4xl mx-auto">
      <div className="mb-8 border-b-2 border-dashed border-[#C9922A] pb-4">
        <h1 className="font-serif text-3xl font-black text-[#2B1A0E]">
          Update Pet Details
        </h1>
        <p className="font-mono text-sm text-[#7B4F2E] mt-2">
          Make changes to your pet's adoption listing.
        </p>
      </div>

      {/* ✦ Update Form ✦ */}
      <form onSubmit={handleUpdatePet} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Pet Name</label>
            <input
              type="text"
              name="name"
              defaultValue={petData.name || petData.petName}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Species</label>
            <select
              name="species"
              defaultValue={petData.species}
              required
              className={inputClass}
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Breed</label>
            <input
              type="text"
              name="breed"
              defaultValue={petData.breed}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Age</label>
            <input
              type="text"
              name="age"
              defaultValue={petData.age}
              required
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Gender</label>
            <select
              name="gender"
              defaultValue={petData.gender}
              required
              className={inputClass}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Image URL</label>
            <input
              type="url"
              name="imageURL"
              defaultValue={petData.image || petData.imageURL}
              required
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Health Status</label>
            <select
              name="healthStatus"
              defaultValue={petData.healthStatus}
              required
              className={inputClass}
            >
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Needs Care">Needs Care</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Vaccination Status</label>
            <select
              name="vaccinationStatus"
              defaultValue={petData.vaccinationStatus}
              required
              className={inputClass}
            >
              <option value="Fully Vaccinated">Fully Vaccinated</option>
              <option value="Partially Vaccinated">Partially Vaccinated</option>
              <option value="Not Vaccinated">Not Vaccinated</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Location</label>
            <input
              type="text"
              name="location"
              defaultValue={petData.location}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Adoption Fee ($)</label>
            <input
              type="number"
              name="adoptionFee"
              defaultValue={petData.fee || petData.adoptionFee}
              required
              className={inputClass}
              min="0"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            name="description"
            defaultValue={petData.description}
            required
            rows="4"
            className={inputClass}
          ></textarea>
        </div>

        <div>
          <label className={labelClass}>Owner Email</label>
          <input
            type="email"
            name="ownerEmail"
            value={session?.user?.email || ""}
            readOnly
            className={`${inputClass} bg-[#EAE2D3] cursor-not-allowed opacity-70`}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 font-mono font-bold text-sm uppercase tracking-widest text-[#FAF6EE] bg-[#C9922A] border-[2px] border-[#2B1A0E] py-4 shadow-[5px_5px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Saving..." : "✦ Save Changes ✦"}
        </button>
      </form>
    </div>
  );
}
