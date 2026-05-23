// src/app/dashboard/page.jsx
export default function DashboardHome() {
  return (
    <div className="bg-[#FAF6EE] border-[3px] border-[#2B1A0E] shadow-[8px_8px_0px_#2B1A0E] p-8">
      <h1 className="font-serif text-3xl font-black text-[#2B1A0E] mb-2">
        Dashboard Overview
      </h1>
      <p className="font-mono text-sm text-[#7B4F2E]">
        Manage your pet adoptions, view requests, and update your listings from
        here.
      </p>

      <hr className="border-t-2 border-dashed border-[#C9922A] my-6" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ডামি স্ট্যাট কার্ড */}
        <div className="border-[2px] border-[#2B1A0E] p-5 bg-[#FDF6F2]">
          <h3 className="font-mono text-xs uppercase tracking-widest text-[#7B1F1F] font-bold">
            Total Listings
          </h3>
          <p className="text-3xl font-black mt-2">0</p>
        </div>
        <div className="border-[2px] border-[#2B1A0E] p-5 bg-[#FDF6F2]">
          <h3 className="font-mono text-xs uppercase tracking-widest text-[#7B1F1F] font-bold">
            Active Requests
          </h3>
          <p className="text-3xl font-black mt-2">0</p>
        </div>
        <div className="border-[2px] border-[#2B1A0E] p-5 bg-[#FDF6F2]">
          <h3 className="font-mono text-xs uppercase tracking-widest text-[#7B1F1F] font-bold">
            Adopted Pets
          </h3>
          <p className="text-3xl font-black mt-2">0</p>
        </div>
      </div>
    </div>
  );
}
