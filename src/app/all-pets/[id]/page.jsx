import PetDetailCard from "@/components/PetDetailCard";

export default async function PetDetail({ params }) {
  const { id } = await params;
  const res = await fetch(
    `https://pet-adoption-platform-server-8g3c.onrender.com/pets/${id}`,
  );

  const pet = await res.json();
  return (
    <div>
      <PetDetailCard key={pet._id} pet={pet} />
    </div>
  );
}
