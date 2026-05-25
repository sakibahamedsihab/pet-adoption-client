// src/app/loading.jsx

export default function Loading() {
  return (
    <div className="min-h-[70vh] bg-[#F5EDE0] flex flex-col items-center justify-center p-4">
      {/* ✦ কাস্টম স্পিনার ✦ */}
      <div className="w-16 h-16 border-[4px] border-[#2B1A0E] border-t-[#C9922A] rounded-full animate-spin mb-6 shadow-[4px_4px_0px_#2B1A0E]"></div>

      <p className="font-mono font-bold text-[#7B1F1F] uppercase tracking-widest animate-pulse">
        Fetching Data... 🐾
      </p>
    </div>
  );
}
