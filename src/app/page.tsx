import Image from "next/image";
import HeroSection from "./components/Home/HeroSection";
import CategoriesSection from "./components/CategoriesSection";
import ReviewScroller from "./components/ReviewScroller"




export default function Home() {
  return (
   <>
   <HeroSection />
   <CategoriesSection />
   <ReviewScroller />
   </>
  );
}
