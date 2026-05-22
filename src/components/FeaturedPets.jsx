"use server";
import PetCard from "./PetCard";

export default async function FeaturedPets() {
  const res = await fetch("http://localhost:5000/pets");
  const pets = await res.json();
  const filteredPets = pets.slice(0, 6);

  return (
    <section className="bg-[#F5EDE0] px-4 py-16 border-b-[3px] border-[#2B1A0E]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <span className="font-mono text-xs font-bold text-[#7B1F1F] uppercase tracking-widest bg-[#FAF6EE] border-2 border-[#2B1A0E] px-4 py-1.5 shadow-[4px_4px_0px_#2B1A0E]">
            ✦ Meet Our Stars
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-black text-[#2B1A0E]">
            Featured Pets
          </h2>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPets.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      </div>
    </section>
  );
}
