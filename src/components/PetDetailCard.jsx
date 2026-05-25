"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function PetDetailCard({ pet }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // ✦ ডিলিট মোডালের স্টেট ✦

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
    ownerEmail, // মালিকানা চেক করার জন্য
  } = pet ?? {};

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

  // ✦ পেট ডিলিট করার ফাংশন ✦
  const confirmDelete = async () => {
    try {
      const res = await fetch(
        `https://pet-adoption-platform-server-8g3c.onrender.com/pets/${_id}`,
        { method: "DELETE" },
      );
      if (res.ok) {
        toast.success("Pet deleted successfully! 🗑️");
        router.push("/all-pets"); // ডিলিট হলে All Pets পেজে পাঠিয়ে দেবে
      } else {
        toast.error("Failed to delete pet.");
      }
    } catch (error) {
      console.error("Error deleting pet:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  // ✦ রিকোয়েস্ট সাবমিট করার ফাংশন ✦
  const handleAdoptSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      toast.error("Please login to submit an adoption request.");
      return router.push("/login");
    }

    if (session.user.email === ownerEmail) {
      return toast.error("Oops! You cannot adopt your own pet! 🚫");
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
      status: "pending",
      requestDate: new Date().toLocaleDateString(), // My Requests টেবিলে দেখানোর জন্য Date
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
        toast.success("Adoption request submitted successfully! 🎉");
        router.push("/dashboard/my-requests");
      } else {
        toast.error("Failed to submit request.");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EDE0]">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* ✦ TOP ACTION BAR: Back, Edit, Delete Buttons ✦ */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b-2 border-dashed border-[#C9922A] pb-4">
          <Link
            href="/all-pets"
            className="font-mono text-xs font-bold uppercase tracking-widest text-[#2B1A0E] bg-[#FAF6EE] border-[2px] border-[#2B1A0E] px-4 py-2.5 shadow-[4px_4px_0px_#2B1A0E] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-pointer"
          >
            ← Back to All Pets
          </Link>

          {/* শুধু ওনার (Owner) হলেই Edit এবং Delete বাটন দেখা যাবে */}
          {session?.user?.email === ownerEmail && (
            <div className="flex gap-3">
              <Link
                href={`/dashboard/update-pet/${_id}`}
                className="font-mono text-xs font-bold uppercase tracking-widest text-[#2B1A0E] bg-[#FAF6EE] border-[2px] border-[#2B1A0E] px-4 py-2.5 shadow-[4px_4px_0px_#C9922A] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all text-center"
              >
                Edit Pet
              </Link>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="font-mono text-xs font-bold uppercase tracking-widest text-[#FAF6EE] bg-[#7B1F1F] border-[2px] border-[#2B1A0E] px-4 py-2.5 shadow-[4px_4px_0px_#2B1A0E] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-pointer"
              >
                Delete Pet
              </button>
            </div>
          )}
        </div>

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

          {/* RIGHT SIDE — Adoption Form & Owner Notice */}
          <div className="w-full md:w-[320px] flex-shrink-0 md:sticky md:top-6">
            <div className="bg-[#FAF6EE] border-[3px] border-[#2B1A0E] shadow-[8px_8px_0px_#2B1A0E] p-6">
              {/* ✦ নিজের পেট হলে ফর্ম হাইড করার লজিক ✦ */}
              {session?.user?.email === ownerEmail ? (
                <div className="text-center py-4">
                  <h3 className="font-serif text-xl font-black text-[#7B1F1F] mb-2">
                    Your Listing
                  </h3>
                  <p className="font-mono text-xs text-[#7B4F2E] mb-6">
                    You cannot submit an adoption request for your own pet.
                  </p>
                  <Link
                    href="/dashboard/my-listings"
                    className="block w-full font-mono font-bold text-xs uppercase tracking-widest text-[#FAF6EE] bg-[#C9922A] border-[2px] border-[#2B1A0E] py-3 shadow-[5px_5px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150"
                  >
                    Manage Listing
                  </Link>
                </div>
              ) : (
                <>
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
                    <div>
                      <label className={labelClass}>Pet Name</label>
                      <input
                        type="text"
                        value={petName || ""}
                        readOnly
                        className={`${inputClass} bg-[#EAE2D3] cursor-not-allowed opacity-80`}
                      />
                    </div>

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

                    <div>
                      <label className={labelClass}>
                        Preferred Pickup Date
                      </label>
                      <input
                        type="date"
                        name="meetDate"
                        className={inputClass}
                        required
                      />
                    </div>

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
                      Submitting a request does not guarantee adoption. The
                      shelter will contact you to proceed.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ✦ কাস্টম ডিলিট কনফার্মেশন মোডাল ✦ */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B1A0E]/60 backdrop-blur-sm">
          <div className="bg-[#FAF6EE] border-[3px] border-[#2B1A0E] shadow-[8px_8px_0px_#2B1A0E] p-6 max-w-sm w-full mx-4">
            <h3 className="font-serif text-2xl font-black text-[#7B1F1F] mb-2">
              Wait!
            </h3>
            <p className="font-mono text-sm text-[#2B1A0E] mb-6">
              Are you sure you want to delete this pet? This action cannot be
              undone.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="font-mono text-xs font-bold uppercase tracking-widest text-[#2B1A0E] bg-[#EAE2D3] border-2 border-[#2B1A0E] px-4 py-2 hover:bg-[#D9CDB8] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="font-mono text-xs font-bold uppercase tracking-widest text-[#FAF6EE] bg-[#7B1F1F] border-2 border-[#2B1A0E] px-4 py-2 hover:bg-red-800 shadow-[3px_3px_0px_#2B1A0E] hover:shadow-none hover:translate-x-0.75 hover:translate-y-0.75 cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
