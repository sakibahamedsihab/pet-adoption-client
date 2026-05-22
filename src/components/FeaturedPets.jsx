export default async function FeaturedPets() {
  const res = await fetch("http://localhost:500/pets");
  const pets = await res.json();
  const filteredPets = pets.slice(0, 6);
  
  return <div></div>;
}
