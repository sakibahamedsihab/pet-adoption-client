"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast"; // ✦ Toast ইমপোর্ট করা হলো ✦

export default function AddPetPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false); // ✦ লোডিং স্টেট ✦

  const handleAddPet = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const petData = Object.fromEntries(formData);

    // বাই ডিফল্ট adopted স্ট্যাটাস false রাখছি
    petData.adopted = false;
    petData.createdAt = new Date().toISOString();

    try {
      // আপনার Express সার্ভারের লিংকে ডেটা পাঠানো হচ্ছে
      const response = await fetch(
        "https://pet-adoption-platform-server-8g3c.onrender.com/pets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(petData),
        },
      );

      if (response.ok) {
        toast.success("Pet added successfully! 🐾"); // ✦ Alert এর বদলে Toast ✦
        e.target.reset(); // ফর্ম ক্লিয়ার করে দেবে
        router.push("/dashboard/my-listings"); // সফল হলে My Listings পেজে রিডাইরেক্ট করবে
      } else {
        toast.error("Failed to add pet. Please try again."); // ✦ Alert এর বদলে Toast ✦
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
      toast.error("Cannot connect to the server!"); // ✦ Alert এর বদলে Toast ✦
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full font-mono text-sm text-[#2B1A0E] bg-[#FAF6EE] border-[2px] border-[#2B1A0E] px-4 py-2.5 outline-none focus:shadow-[3px_3px_0px_#2B1A0E] transition-all placeholder:text-[#A08060]";
  const labelClass =
    "font-mono text-xs font-bold text-[#7B1F1F] uppercase tracking-widest mb-1.5 block";

  return (
    <div className="bg-[#FAF6EE] border-[3px] border-[#2B1A0E] shadow-[8px_8px_0px_#2B1A0E] p-4 sm:p-6 md:p-8 max-w-4xl w-full mx-auto">
      <div className="mb-6 sm:mb-8 border-b-2 border-dashed border-[#C9922A] pb-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#2B1A0E]">
          Add a New Pet
        </h1>
        <p className="font-mono text-xs sm:text-sm text-[#7B4F2E] mt-2">
          Help a furry (or feathery) friend find their forever home by filling
          out the details below.
        </p>
      </div>

      <form onSubmit={handleAddPet} className="flex flex-col gap-4 sm:gap-6">
        {/* Row 1: Name & Species */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className={labelClass}>Pet Name</label>
            <input
              type="text"
              name="petName"
              required
              className={inputClass}
              placeholder="e.g. Max"
            />
          </div>
          <div>
            <label className={labelClass}>Species</label>
            <select name="species" required className={inputClass}>
              <option value="">Select Species</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Row 2: Breed & Age */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className={labelClass}>Breed</label>
            <input
              type="text"
              name="breed"
              required
              className={inputClass}
              placeholder="e.g. Golden Retriever"
            />
          </div>
          <div>
            <label className={labelClass}>Age</label>
            <input
              type="text"
              name="age"
              required
              className={inputClass}
              placeholder="e.g. 2 Months / 3 Years"
            />
          </div>
        </div>

        {/* Row 3: Gender & Image URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className={labelClass}>Gender</label>
            <select name="gender" required className={inputClass}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Image URL</label>
            <input
              type="url"
              name="imageURL"
              required
              className={inputClass}
              placeholder="https://i.ibb.co/..."
            />
          </div>
        </div>

        {/* Row 4: Health & Vaccination */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className={labelClass}>Health Status</label>
            <select name="healthStatus" required className={inputClass}>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Needs Care">Needs Care</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Vaccination Status</label>
            <select name="vaccinationStatus" required className={inputClass}>
              <option value="Fully Vaccinated">Fully Vaccinated</option>
              <option value="Partially Vaccinated">Partially Vaccinated</option>
              <option value="Not Vaccinated">Not Vaccinated</option>
            </select>
          </div>
        </div>

        {/* Row 5: Location & Adoption Fee */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className={labelClass}>Location</label>
            <input
              type="text"
              name="location"
              required
              className={inputClass}
              placeholder="e.g. Mirpur, Dhaka"
            />
          </div>
          <div>
            <label className={labelClass}>Adoption Fee ($)</label>
            <input
              type="number"
              name="adoptionFee"
              required
              className={inputClass}
              placeholder="0 for free"
              min="0"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className={labelClass}>Description</label>
          <textarea
            name="description"
            required
            rows="4"
            className={inputClass}
            placeholder="Tell us more about the pet's personality and needs..."
          ></textarea>
        </div>

        {/* Owner Email (Read Only) */}
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 font-mono font-bold text-sm uppercase tracking-widest text-[#FAF6EE] bg-[#7B1F1F] border-[2px] border-[#2B1A0E] py-4 shadow-[5px_5px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Processing..." : "✦ Submit Pet Details ✦"}
        </button>
      </form>
    </div>
  );
}
