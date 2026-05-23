"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { useState } from "react";

export default function PetDetailCard({ pet }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    _id,
    petName,
    breed = "Unknown Breed",
    species = "Unknown Species",
    age = "Unknown Age",
    size = "Medium",
    gender = "Unknown",
    location = "Unknown Location",
    adoptionFee = 0,
    imageURL = "/placeholder.jpg",
    description = "",
    healthStatus,
    vaccinationStatus,
    ownerEmail, // মালিকানা চেক করার জন্য এটি দরকার
  } = pet ?? {};

  // ডায়নামিক হেলথ ট্যাগ তৈরি করা হলো
  const healthTags = [healthStatus, vaccinationStatus].filter(Boolean);

  const stats = [
    { icon: "🗓", label: "Age", value: age },
    { icon: "🐾", label: "Species", value: species },
    { icon: "♂", label: "Sex", value: gender },
    { icon: "📍", label: "Location", value: location },
  ];

  const inputClass =
    "w-full font-mono text-xs text-[#2B1A0E] bg-[#FAF6EE] border-[2px] border-[#2B1A0E] px-3 py-2.5 outline-none focus:shadow-[3px_3px_0px_#2B1A0E] transition-all placeholder:text-[#A08060]";

  const labelClass =
    "font-mono text-[10px] font-bold text-[#7B1F1F] uppercase tracking-widest mb-1.5 block";

  // ✦ রিকোয়েস্ট সাবমিট করার ফাংশন ✦
  const handleAdoptSubmit = async (e) => {
    e.preventDefault();

    // ১. লগ-ইন চেক
    if (!session) {
      alert("Please login to submit an adoption request.");
      return router.push("/login");
    }

    // ২. নিজের পেট কি না, সেটা চেক করা
    if (session.user.email === ownerEmail) {
      return alert("Oops! You cannot adopt your own pet! 🚫");
    }

    setIsSubmitting(true);
    const formData = new FormData(e.target);

    const requestData = {
      petId: _id,
      petName: petName,
      userName: session.user.name,
      email: session.user.email,
      pickupDate: formData.get("meetDate"),
      message: formData.get("message"),
      status: "pending", // ডিফল্ট স্ট্যাটাস pending রাখা হলো
    };

    try {
      const res = await fetch(
        "https://pet-adoption-platform-server-8g3c.onrender.com/adoption-requests",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        },
      );

      if (res.ok) {
        alert("Adoption request submitted successfully! 🎉");
        router.push("/dashboard/my-requests"); // সফল হলে My Requests পেজে পাঠিয়ে দেবে
      } else {
        alert("Failed to submit request.");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EDE0]">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* LEFT SIDE - Pet Details */}
          <div className="flex-1 w-full">
            <div className="relative border-[3px] border-[#2B1A0E] shadow-[8px_8px_0px_#2B1A0E] overflow-hidden h-[340px] mb-6">
              <Image
                src={imageURL}
                alt={petName || "Pet"}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4 bg-[#C9922A] border-[2px] border-[#2B1A0E] px-3 py-1 shadow-[3px_3px_0px_#2B1A0E]">
                <span className="font-mono text-[10px] font-bold text-[#2B1A0E] uppercase tracking-widest">
                  🐾 Looking for a home
                </span>
              </div>
            </div>

            <div className="flex items-start justify-between mb-1">
              <h1 className="font-serif text-5xl font-black text-[#2B1A0E]">
                {petName}
              </h1>
              <div className="text-right">
                <p className="font-serif text-3xl font-black text-[#7B1F1F]">
                  ${adoptionFee}
                </p>
                <p className="font-mono text-[10px] text-[#7B4F2E] uppercase tracking-widest">
                  Adoption Fee
                </p>
              </div>
            </div>

            <p className="font-mono text-xs text-[#7B4F2E] uppercase tracking-widest mb-6">
              {species} · {breed}
            </p>

            <hr className="border-t-2 border-dashed border-[#C9922A] mb-6" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {stats.map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="bg-[#FAF6EE] border-[2px] border-[#2B1A0E] shadow-[4px_4px_0px_#2B1A0E] p-3 text-center"
                >
                  <p className="text-lg mb-1">{icon}</p>
                  <p className="font-serif text-sm font-black text-[#2B1A0E] truncate">
                    {value}
                  </p>
                  <p className="font-mono text-[9px] text-[#7B4F2E] uppercase tracking-widest">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {healthTags.length > 0 && (
              <div className="mb-8">
                <h2 className="font-serif text-xl font-black text-[#2B1A0E] mb-3">
                  Health & Vitals
                </h2>
                <div className="flex flex-wrap gap-2">
                  {healthTags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] font-bold text-[#FAF6EE] bg-[#7B1F1F] border-[2px] border-[#2B1A0E] px-3 py-1 uppercase tracking-widest shadow-[2px_2px_0px_#2B1A0E]"
                    >
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <hr className="border-t-2 border-dashed border-[#C9922A] mb-6" />

            <div>
              <h2 className="font-serif text-2xl font-black text-[#2B1A0E] mb-3">
                Meet {petName}
              </h2>
              <p className="font-mono text-xs text-[#4A2E1A] leading-relaxed whitespace-pre-wrap">
                {description}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE — Adoption Form */}
          <div className="w-full md:w-[320px] flex-shrink-0 md:sticky md:top-6">
            <div className="bg-[#FAF6EE] border-[3px] border-[#2B1A0E] shadow-[8px_8px_0px_#2B1A0E] p-6">
              <p className="font-mono text-[10px] text-[#7B4F2E] uppercase tracking-widest mb-1">
                ✦ Adopt
              </p>
              <h3 className="font-serif text-2xl font-black text-[#2B1A0E] mb-1">
                Ready to adopt?
              </h3>
              <p className="font-mono text-[10px] text-[#7B4F2E] mb-5 leading-relaxed">
                Send an inquiry to the shelter to start the process.
              </p>

              <hr className="border-t-2 border-dashed border-[#C9922A] mb-5" />

              <form
                onSubmit={handleAdoptSubmit}
                className="flex flex-col gap-4"
              >
                {/* Pet Name - Read Only */}
                <div>
                  <label className={labelClass}>Pet Name</label>
                  <input
                    type="text"
                    value={petName || ""}
                    readOnly
                    className={`${inputClass} bg-[#EAE2D3] cursor-not-allowed opacity-80`}
                  />
                </div>

                {/* User Name - Read Only */}
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    type="text"
                    value={session?.user?.name || ""}
                    readOnly
                    className={`${inputClass} bg-[#EAE2D3] cursor-not-allowed opacity-80`}
                    required
                  />
                </div>

                {/* User Email - Read Only */}
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input
                    type="email"
                    value={session?.user?.email || ""}
                    readOnly
                    className={`${inputClass} bg-[#EAE2D3] cursor-not-allowed opacity-80`}
                    required
                  />
                </div>

                {/* Pickup Date */}
                <div>
                  <label className={labelClass}>Preferred Pickup Date</label>
                  <input
                    type="date"
                    name="meetDate"
                    className={inputClass}
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className={labelClass}>Message to Shelter</label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Tell us about your home environment..."
                    className={`${inputClass} resize-none`}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-mono font-bold text-xs uppercase tracking-widest text-[#FAF6EE] bg-[#7B1F1F] border-[2px] border-[#2B1A0E] py-3 shadow-[5px_5px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request ↗"}
                </button>

                <p className="font-mono text-[9px] text-[#A08060] text-center leading-relaxed">
                  Submitting a request does not guarantee adoption. The shelter
                  will contact you to proceed.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
