import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import BranchesScroller from "@/components/sections/BranchesScroller";
import CompareBranches from "@/components/sections/CompareBranches";
import FacilitiesStack from "@/components/sections/FacilitiesStack";
import PlanBuilder from "@/components/sections/PlanBuilder";
import LocationContact from "@/components/sections/LocationContact";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BranchesScroller />
        <CompareBranches />
        <FacilitiesStack />
        <PlanBuilder />
        <LocationContact />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
