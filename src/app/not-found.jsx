// src/app/not-found.jsx

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5EDE0] flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-[#FAF6EE] border-[3px] border-[#2B1A0E] shadow-[10px_10px_0px_#2B1A0E] p-10 max-w-md w-full">
        <h1 className="font-serif text-8xl font-black text-[#7B1F1F] mb-2">
          404
        </h1>

        <h2 className="font-serif text-2xl font-black text-[#2B1A0E] mb-3">
          Page Not Found
        </h2>

        <p className="font-mono text-sm text-[#7B4F2E] mb-8 leading-relaxed">
          Oops! We sniffed all around but couldn't find the page you're looking
          for. It might have wandered off. 🐕
        </p>

        <Link
          href="/"
          className="inline-block w-full font-mono font-bold text-xs uppercase tracking-widest text-[#FAF6EE] bg-[#2B1A0E] border-[2px] border-[#2B1A0E] px-6 py-3.5 shadow-[5px_5px_0px_#C9922A] hover:shadow-[2px_2px_0px_#C9922A] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
