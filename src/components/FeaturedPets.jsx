"use server";
import PetCard from "./PetCard";

export default async function FeaturedPets() {
  const res = await fetch("http://localhost:5000/pets");
  const pets = await res.json();
  const filteredPets = pets.slice(0, 6);

  return (
    <main className="max-w-7xl mx-auto space-y-5 py-10">
      <h1 className="text-2xl font-semibold">Featured Pets</h1>
      <div className="grid grid-cols-4 gap-3">
        {filteredPets.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
    </main>
  );
}
