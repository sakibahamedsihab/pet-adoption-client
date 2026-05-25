"use client";

import { motion } from "framer-motion";

export default function WhyAdopt() {
  const reasons = [
    {
      icon: "❤️",
      title: "Save a Life",
      desc: "When you adopt, you save a loving animal by making them part of your family and open up shelter space for another animal who might desperately need it.",
    },
    {
      icon: "🏡",
      title: "A Forever Home",
      desc: "Shelter pets are often already house-trained and used to living with families. You are giving them the second chance they truly deserve.",
    },
    {
      icon: "💰",
      title: "Cost Effective",
      desc: "Usually, when you adopt a pet, the cost of spay/neuter, first vaccinations, and sometimes even microchipping is included in the adoption price.",
    },
  ];

  return (
    <section className="bg-[#FAF6EE] px-6 py-20 border-b-[3px] border-[#2B1A0E] overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Header Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center justify-center text-center space-y-4"
        >
          <span className="font-mono text-xs font-bold text-[#7B1F1F] uppercase tracking-widest bg-[#EAE2D3] border-[2px] border-[#2B1A0E] px-4 py-1.5 shadow-[4px_4px_0px_#2B1A0E]">
            ✦ Why Adopt?
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-black text-[#2B1A0E]">
            Give a Pet a Second Chance
          </h2>
        </motion.div>

        {/* Cards Animation with Stagger Effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }} // একটার পর একটা আসবে
              viewport={{ once: true, margin: "-50px" }}
              className="bg-[#F5EDE0] border-[3px] border-[#2B1A0E] shadow-[8px_8px_0px_#2B1A0E] p-8 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_#2B1A0E] transition-all"
            >
              <div className="text-4xl mb-4 bg-[#C9922A] w-14 h-14 flex items-center justify-center border-[2px] border-[#2B1A0E] shadow-[3px_3px_0px_#2B1A0E]">
                {reason.icon}
              </div>
              <h3 className="font-serif text-2xl font-black text-[#2B1A0E] mb-3">
                {reason.title}
              </h3>
              <p className="font-mono text-sm text-[#7B4F2E] leading-relaxed">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
