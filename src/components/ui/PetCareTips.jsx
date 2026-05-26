"use client";

import { motion } from "framer-motion";

export default function PetCareTips() {
  const tips = [
    {
      step: "01",
      title: "Proper Nutrition",
      text: "Feed your pet high-quality food appropriate for their age, size, and activity level. Always keep fresh water available.",
    },
    {
      step: "02",
      title: "Regular Exercise",
      text: "Pets need daily physical activity to stay healthy and happy. Take dogs for walks and provide engaging toys for cats and birds.",
    },
    {
      step: "03",
      title: "Vet Checkups",
      text: "Schedule annual wellness exams and keep up with necessary vaccinations and parasite prevention.",
    },
  ];

  return (
    <section className="bg-[#EAE2D3] px-6 py-20 border-b-[3px] border-[#2B1A0E] overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="md:w-1/3 space-y-6"
        >
          <span className="font-mono text-xs font-bold text-[#FAF6EE] bg-[#7B1F1F] uppercase tracking-widest border-[2px] border-[#2B1A0E] px-4 py-1.5 shadow-[4px_4px_0px_#2B1A0E]">
            ✦ Pet Care Guide
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-black text-[#2B1A0E] leading-tight">
            Essential Tips for New Owners
          </h2>
          <p className="font-mono text-sm text-[#7B4F2E] leading-relaxed">
            Bringing a new pet home is exciting! Make sure you are prepared to
            give them the best care possible with these basic guidelines.
          </p>
        </motion.div>

        <div className="md:w-2/3 flex flex-col gap-6">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-[#FAF6EE] border-[3px] border-[#2B1A0E] flex items-center p-6 shadow-[6px_6px_0px_#2B1A0E]"
            >
              <div className="font-serif text-4xl font-black text-[#C9922A] mr-6">
                {tip.step}
              </div>
              <div className="border-l-[3px] border-[#2B1A0E] pl-6">
                <h3 className="font-serif text-xl font-black text-[#2B1A0E] mb-1">
                  {tip.title}
                </h3>
                <p className="font-mono text-sm text-[#7B4F2E]">{tip.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
