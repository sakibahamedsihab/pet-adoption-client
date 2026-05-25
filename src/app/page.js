import FeaturedPets from "@/components/FeaturedPets";
import Banner from "@/components/ui/Banner";
import PetCareTips from "@/components/ui/PetCareTips";
import WhyAdopt from "@/components/ui/WhyAdopt";

export default function Home() {
  return (
    <>
      <Banner />
      <FeaturedPets />
      <WhyAdopt />
      <PetCareTips />
    </>
  );
}
