import HeroSection from '@/component/AboutUs/HeroAbout';
import WhyWeExist from '@/component/AboutUs/WhyWeExist';
import ThreePillars from '@/component/AboutUs/Pillars';
import Ecosystem from '@/component/AboutUs/Ecosystem';
import MissionVision from '@/component/AboutUs/MissionVision';
import TrustSection from '@/component/AboutUs/WhyTrust';
import Navbar from '@/component/navbar';
import Footer from '@/component/footer';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <WhyWeExist />
      <ThreePillars />
      <Ecosystem />
      <MissionVision />
      <TrustSection />
      <Footer />
      
    </div>
  );
};

export default About;
