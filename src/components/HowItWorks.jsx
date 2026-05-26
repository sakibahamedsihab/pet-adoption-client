"use client";

import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Find a Pet",
      desc: "Browse our extensive list of lovely pets looking for a home.",
    },
    {
      num: "02",
      title: "Send Request",
      desc: "Fill out a simple adoption request form to show your interest.",
    },
    {
      num: "03",
      title: "Meet & Greet",
      desc: "Get approved and schedule a pickup date with the pet owner.",
    },
    {
      num: "04",
      title: "Take Home",
      desc: "Bring your new furry friend home and start a new journey!",
    },
  ];

  // ✦ Framer Motion Variants ✦
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // একটা কার্ডের পর আরেকটা আসবে
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <section className="py-20 bg-[#F5EDE0] border-y-[3px] border-[#2B1A0E] px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <p className="font-mono text-xs text-[#7B4F2E] uppercase tracking-widest mb-2">
              ✦ Adoption Process ✦
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-[#2B1A0E]">
              How It Works
            </h2>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="bg-[#FAF6EE] border-[3px] border-[#2B1A0E] p-6 shadow-[6px_6px_0px_#C9922A] hover:shadow-[6px_6px_0px_#7B1F1F] transition-all"
            >
              <h3 className="font-serif text-6xl font-black text-[#EAE2D3] drop-shadow-[2px_2px_0px_#2B1A0E] mb-4">
                {step.num}
              </h3>
              <h4 className="font-serif text-2xl font-black text-[#2B1A0E] mb-2">
                {step.title}
              </h4>
              <p className="font-mono text-xs text-[#7B4F2E] leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
