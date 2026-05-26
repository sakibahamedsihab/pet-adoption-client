"use client";

import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast"; // ✦ Toast ইমপোর্ট করা হলো ✦

export default function MyListingsPage() {
  const { data: session } = useSession();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // ডিলিট মোডালের স্টেট
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);

  // ✦ রিকোয়েস্ট মোডালের স্টেট ✦
  const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [petRequests, setPetRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      fetchMyPets();
    }
  }, [session]);

  const fetchMyPets = async () => {
    try {
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

  // --- Delete Logic ---
  const handleDeleteClick = (id) => {
    setPetToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPetToDelete(null);
  };

  const confirmDelete = async () => {
    if (!petToDelete) return;
    try {
      const res = await fetch(
        `https://pet-adoption-platform-server-8g3c.onrender.com/pets/${petToDelete}`,
        { method: "DELETE" },
      );
      if (res.ok) {
        toast.success("Pet deleted successfully! 🗑️");
        setPets((prev) => prev.filter((pet) => pet._id !== petToDelete));
      } else {
        toast.error("Failed to delete pet.");
      }
    } catch (error) {
      console.error("Error deleting pet:", error);
      toast.error("Something went wrong!");
    } finally {
      closeDeleteModal();
    }
  };

  // --- ✦ Requests Modal Logic ✦ ---
  const handleViewRequests = async (pet) => {
    setSelectedPet(pet);
    setIsRequestsModalOpen(true);
    setRequestsLoading(true);

    try {
      // ব্যাকএন্ড থেকে নির্দিষ্ট petId দিয়ে রিকোয়েস্টগুলো আনছি
      const res = await fetch(
        `https://pet-adoption-platform-server-8g3c.onrender.com/adoption-requests?petId=${pet._id}`,
      );
      const data = await res.json();
      setPetRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setRequestsLoading(false);
    }
  };

  const closeRequestsModal = () => {
    setIsRequestsModalOpen(false);
    setSelectedPet(null);
    setPetRequests([]);
  };

  const handleRequestAction = async (requestId, newStatus) => {
    try {
      const res = await fetch(
        `https://pet-adoption-platform-server-8g3c.onrender.com/adoption-requests/${requestId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },

          body: JSON.stringify({ status: newStatus, petId: selectedPet._id }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(`Request ${newStatus} successfully!`);

        setPetRequests((prev) =>
          prev.map((req) =>
            req._id === requestId ? { ...req, status: newStatus } : req,
          ),
        );

        if (newStatus === "approved") {
          setPets((prev) =>
            prev.map((p) =>
              p._id === selectedPet._id ? { ...p, adopted: true } : p,
            ),
          );

          setSelectedPet((prev) => ({ ...prev, adopted: true }));
        }
      } else {
        toast.error(data.message || "Action failed. Please try again.");
      }
    } catch (error) {
      console.error(`Error updating request status:`, error);
      toast.error("Something went wrong!");
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
    <div className="relative bg-[#FAF6EE] border-[3px] border-[#2B1A0E] shadow-[8px_8px_0px_#2B1A0E] p-8 max-w-6xl mx-auto min-h-[60vh]">
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

      {pets.length === 0 ? (
        <div className="text-center py-12 bg-[#FDF6F2] border-[2px] border-[#2B1A0E]">
          <p className="font-mono text-[#7B4F2E] font-bold">
            You haven't added any pets yet.
          </p>
        </div>
      ) : (
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
                    <div className="relative w-12 h-12 rounded-full border-[2px] border-[#2B1A0E] overflow-hidden bg-white">
                      <Image
                        src={
                          pet.imageURL ||
                          pet.image ||
                          "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=600&auto=format&fit=crop"
                        }
                        alt={pet.petName || pet.name || "Pet"}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  </td>
                  <td className="p-4 font-bold text-[#2B1A0E]">
                    {pet.name || pet.petName}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest border-[2px] border-[#2B1A0E] ${pet.adopted ? "bg-[#C9922A] text-white" : "bg-[#A7C957] text-[#2B1A0E]"}`}
                    >
                      {pet.adopted ? "Adopted" : "Available"}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2 items-center h-full pt-6">
                    {/* ✦ Requests Button ✦ */}
                    <button
                      onClick={() => handleViewRequests(pet)}
                      className="bg-[#EAE2D3] text-[#2B1A0E] border-[2px] border-[#2B1A0E] px-4 py-1.5 text-xs font-bold hover:bg-[#D9CDB8] transition-colors cursor-pointer"
                    >
                      Requests
                    </button>
                    <Link
                      href={`/dashboard/update-pet/${pet._id}`}
                      className="bg-[#FAF6EE] text-[#2B1A0E] border-[2px] border-[#2B1A0E] px-4 py-1.5 text-xs font-bold hover:bg-[#C9922A] hover:text-white transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(pet._id)}
                      className="bg-[#7B1F1F] text-[#FAF6EE] border-[2px] border-[#2B1A0E] px-4 py-1.5 text-xs font-bold hover:bg-red-800 transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✦ Delete Modal ✦ */}
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
                onClick={closeDeleteModal}
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

      {/* ✦ Requests Modal ✦ */}
      {isRequestsModalOpen && selectedPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B1A0E]/60 backdrop-blur-sm">
          <div className="bg-[#FAF6EE] border-[3px] border-[#2B1A0E] shadow-[8px_8px_0px_#2B1A0E] p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b-2 border-dashed border-[#C9922A] pb-4">
              <div>
                <h3 className="font-serif text-2xl font-black text-[#2B1A0E]">
                  Adoption Requests
                </h3>
                <p className="font-mono text-xs text-[#7B4F2E] mt-1">
                  For:{" "}
                  <span className="font-bold">
                    {selectedPet.name || selectedPet.petName}
                  </span>
                </p>
              </div>
              <button
                onClick={closeRequestsModal}
                className="text-[#7B1F1F] font-bold text-xl hover:scale-110 transition-transform"
              >
                ✖
              </button>
            </div>

            {requestsLoading ? (
              <p className="text-center font-mono font-bold text-[#7B4F2E] animate-pulse py-8">
                Loading requests...
              </p>
            ) : petRequests.length === 0 ? (
              <p className="text-center font-mono text-[#7B4F2E] py-8 border-[2px] border-[#2B1A0E] bg-[#FDF6F2]">
                No adoption requests yet.
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {petRequests.map((req) => (
                  <div
                    key={req._id}
                    className="border-[2px] border-[#2B1A0E] p-4 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="font-mono text-sm">
                      <p>
                        <span className="font-bold text-[#7B1F1F]">Name:</span>{" "}
                        {req.userName}
                      </p>
                      <p>
                        <span className="font-bold text-[#7B1F1F]">Email:</span>{" "}
                        {req.email}
                      </p>
                      <p>
                        <span className="font-bold text-[#7B1F1F]">
                          Pickup Date:
                        </span>{" "}
                        {req.pickupDate}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {req.status === "pending" ? (
                        <>
                          <button
                            onClick={() =>
                              handleRequestAction(req._id, "approved")
                            }
                            disabled={selectedPet.adopted}
                            className="bg-[#A7C957] text-[#2B1A0E] border-[2px] border-[#2B1A0E] px-3 py-1.5 text-xs font-bold uppercase tracking-widest hover:bg-[#8da84a] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleRequestAction(req._id, "rejected")
                            }
                            disabled={selectedPet.adopted}
                            className="bg-[#7B1F1F] text-[#FAF6EE] border-[2px] border-[#2B1A0E] px-3 py-1.5 text-xs font-bold uppercase tracking-widest hover:bg-red-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span
                          className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border-[2px] border-[#2B1A0E] ${req.status === "approved" ? "bg-[#A7C957] text-[#2B1A0E]" : "bg-[#7B1F1F] text-white"}`}
                        >
                          {req.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
