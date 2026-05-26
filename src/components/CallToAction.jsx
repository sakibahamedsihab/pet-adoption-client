"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="py-24 bg-[#EAE2D3] px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="max-w-5xl mx-auto bg-[#A7C957] border-[3px] border-[#2B1A0E] shadow-[10px_10px_0px_#2B1A0E] p-10 md:p-16 text-center"
      >
        <p className="font-mono text-sm text-[#2B1A0E] font-bold uppercase tracking-widest mb-4">
          ✦ Make a difference today ✦
        </p>
        <h2 className="font-serif text-4xl md:text-6xl font-black text-[#2B1A0E] mb-6">
          Not ready to adopt?
        </h2>
        <p className="font-mono text-sm md:text-base text-[#2B1A0E] max-w-2xl mx-auto mb-10 leading-relaxed font-semibold">
          You can still help our furry friends by volunteering, donating to
          shelters, or simply spreading the word in your community. Every little
          effort counts!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/all-pets"
            className="font-mono font-bold text-xs uppercase tracking-widest text-[#FAF6EE] bg-[#7B1F1F] border-[2px] border-[#2B1A0E] px-8 py-4 shadow-[4px_4px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            Browse Pets
          </Link>
          <button className="font-mono font-bold text-xs uppercase tracking-widest text-[#2B1A0E] bg-[#FAF6EE] border-[2px] border-[#2B1A0E] px-8 py-4 shadow-[4px_4px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
            Volunteer Now
          </button>
        </div>
      </motion.div>
    </section>
  );
}
