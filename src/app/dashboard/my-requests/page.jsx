// src/app/dashboard/my-requests/page.jsx
"use client";

import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyRequestsPage() {
  const { data: session } = useSession();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // মোডালের স্টেট
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestToCancel, setRequestToCancel] = useState(null);

  useEffect(() => {
    if (session?.user?.email) {
      fetchMyRequests();
    }
  }, [session]);

  const fetchMyRequests = async () => {
    try {
      const res = await fetch(
        `https://pet-adoption-platform-server-8g3c.onrender.com/adoption-requests?email=${session.user.email}`,
      );
      const data = await res.json();
      setRequests(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch requests", error);
      setLoading(false);
    }
  };

  const handleCancelClick = (id) => {
    setRequestToCancel(id);
    setIsModalOpen(true);
  };

  const closeCancelModal = () => {
    setIsModalOpen(false);
    setRequestToCancel(null);
  };

  const confirmCancel = async () => {
    if (!requestToCancel) return;

    try {
      const res = await fetch(
        `https://pet-adoption-platform-server-8g3c.onrender.com/adoption-requests/${requestToCancel}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        alert("Adoption request canceled! 🚫");
        setRequests((prev) =>
          prev.filter((req) => req._id !== requestToCancel),
        );
      } else {
        alert("Failed to cancel request.");
      }
    } catch (error) {
      console.error("Error canceling request:", error);
    } finally {
      closeCancelModal();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="font-mono font-bold text-[#7B1F1F] animate-pulse uppercase tracking-widest">
          Loading your requests... 🐾
        </p>
      </div>
    );
  }

  return (
    <div className="relative bg-[#FAF6EE] border-[3px] border-[#2B1A0E] shadow-[8px_8px_0px_#2B1A0E] p-8 max-w-5xl mx-auto min-h-[60vh]">
      <div className="mb-8 border-b-2 border-dashed border-[#C9922A] pb-4">
        <h1 className="font-serif text-3xl font-black text-[#2B1A0E]">
          My Adoption Requests
        </h1>
        <p className="font-mono text-sm text-[#7B4F2E] mt-1">
          Track the status of the pets you want to bring home.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-12 bg-[#FDF6F2] border-[2px] border-[#2B1A0E]">
          <p className="font-mono text-[#7B4F2E] font-bold">
            You haven't made any adoption requests yet.
          </p>
          <Link
            href="/all-pets"
            className="inline-block mt-4 font-mono font-bold text-xs uppercase tracking-widest text-[#FAF6EE] bg-[#7B1F1F] border-[2px] border-[#2B1A0E] px-5 py-3 shadow-[4px_4px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            ✦ Browse Pets
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto border-[2px] border-[#2B1A0E]">
          <table className="w-full text-left font-mono whitespace-nowrap">
            <thead>
              <tr className="bg-[#EAE2D3] border-b-[2px] border-[#2B1A0E]">
                <th className="p-4 text-[#2B1A0E] font-bold uppercase tracking-wider text-xs">
                  Pet Name
                </th>
                <th className="p-4 text-[#2B1A0E] font-bold uppercase tracking-wider text-xs">
                  Pickup Date
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
              {requests.map((req) => (
                <tr
                  key={req._id}
                  className="border-b-[2px] border-[#2B1A0E] hover:bg-[#FDF6F2] transition-colors last:border-b-0"
                >
                  <td className="p-4 font-bold text-[#2B1A0E]">
                    {req.petName || "Unknown Pet"}
                  </td>
                  <td className="p-4 text-[#7B4F2E]">
                    {req.pickupDate || "Not Set"}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest border-[2px] border-[#2B1A0E] ${
                        req.status === "approved"
                          ? "bg-[#A7C957] text-[#2B1A0E]"
                          : req.status === "rejected"
                            ? "bg-[#7B1F1F] text-white"
                            : "bg-[#C9922A] text-white"
                      }`}
                    >
                      {req.status || "Pending"}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2 items-center">
                    <Link
                      href={`/all-pets/${req._id}`}
                      className="bg-[#FAF6EE] text-[#2B1A0E] border-[2px] border-[#2B1A0E] px-4 py-1.5 text-xs font-bold hover:bg-[#C9922A] hover:text-white transition-colors"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleCancelClick(req._id)}
                      className="bg-[#7B1F1F] text-[#FAF6EE] border-[2px] border-[#2B1A0E] px-4 py-1.5 text-xs font-bold hover:bg-red-800 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✦ কাস্টম ক্যান্সেল কনফার্মেশন মোডাল ✦ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B1A0E]/60 backdrop-blur-sm">
          <div className="bg-[#FAF6EE] border-[3px] border-[#2B1A0E] shadow-[8px_8px_0px_#2B1A0E] p-6 max-w-sm w-full mx-4">
            <h3 className="font-serif text-2xl font-black text-[#7B1F1F] mb-2">
              Cancel Request?
            </h3>
            <p className="font-mono text-sm text-[#2B1A0E] mb-6">
              Are you sure you want to withdraw your adoption request for this
              pet?
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={closeCancelModal}
                className="font-mono text-xs font-bold uppercase tracking-widest text-[#2B1A0E] bg-[#EAE2D3] border-[2px] border-[#2B1A0E] px-4 py-2 hover:bg-[#D9CDB8] transition-colors cursor-pointer"
              >
                No, Keep It
              </button>
              <button
                onClick={confirmCancel}
                className="font-mono text-xs font-bold uppercase tracking-widest text-[#FAF6EE] bg-[#7B1F1F] border-[2px] border-[#2B1A0E] px-4 py-2 hover:bg-red-800 transition-colors shadow-[3px_3px_0px_#2B1A0E] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] cursor-pointer"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
