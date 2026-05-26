"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function SuccessStories() {
  const stories = [
    {
      id: 1,
      name: "Sarah & Max",
      role: "Dog Adopter",
      image:
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=600&auto=format&fit=crop",
      text: "Adopting Max was the best decision of my life! The process was incredibly smooth, and he has brought so much joy to our home.",
    },
    {
      id: 2,
      name: "David & Luna",
      role: "Cat Adopter",
      image:
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop",
      text: "I was looking for a calm companion, and Luna is just perfect. The platform helped me find my purrfect match within days!",
    },
    {
      id: 3,
      name: "The Khan Family",
      role: "Bird Adopters",
      image:
        "https://images.unsplash.com/photo-1552728089-57169134b22c?q=80&w=600&auto=format&fit=crop",
      text: "We adopted Rio, the Macaw. The previous owner was so helpful through the platform's request system. Highly recommended!",
    },
  ];

  return (
    <section className="py-20 bg-[#FAF6EE] px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs text-[#7B4F2E] uppercase tracking-widest mb-2">
            ✦ Happy Tails ✦
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-black text-[#2B1A0E]">
            Success Stories
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, idx) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-[#F5EDE0] border-[3px] border-[#2B1A0E] shadow-[8px_8px_0px_#2B1A0E] p-6 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="relative w-20 h-20 rounded-full border-[3px] border-[#2B1A0E] overflow-hidden mb-6 mx-auto bg-white">
                <Image
                  src={story.image}
                  alt={story.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <p className="font-mono text-sm text-[#2B1A0E] text-center mb-6 leading-relaxed italic">
                "{story.text}"
              </p>
              <hr className="border-t-2 border-dashed border-[#C9922A] mb-4" />
              <div className="text-center">
                <h4 className="font-serif text-xl font-black text-[#7B1F1F]">
                  {story.name}
                </h4>
                <p className="font-mono text-[10px] text-[#7B4F2E] uppercase tracking-widest mt-1">
                  {story.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
