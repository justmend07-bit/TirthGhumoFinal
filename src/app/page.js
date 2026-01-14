import Hero from "@/component/Home/herohome";
// import PackagesSection from "@/component/package/packageSection";
// import { getPopularPackages } from "@/lib/getPopularPackage";
import WhyChooseUs from "@/component/Home/us";
import TravelStories from "@/component/Home/travelStories";
import ParallexHero from "@/component/Home/parallexHero";
import Testimonial from "@/component/Home/testimonial";
import Footer from "@/component/footer";
export default async function Home() {
  //  const popularPackages = await getPopularPackages(3);
  return (    
    <div>
      <Hero/>
      {/* <PackagesSection data={popularPackages} /> */}
      <WhyChooseUs/>
      <TravelStories/>
      <ParallexHero/>
      <Testimonial/>
      <Footer />
      
    </div>
  );
}

