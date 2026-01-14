// components/virtual-darshan/VirtualDarshanPage.jsx
'use client';

import { useState } from "react";
import HeroSection from "@/component/virtual-darshan/VRHero";
import Footer from "@/component/footer";
// import WhyDarshan from "@/component/virtual-darshan/WhyDarshan";
// import Features from  "@/component/virtual-darshan/Features";
// import SocialResponsibility from "@/component/virtual-darshan/SocialResponsibility";
// import Destinations from "@/component/virtual-darshan/Destinations";
// import PricingNote from "@/component/virtual-darshan/PricingNote";
// import CTASection from "@/component/virtual-darshan/CTASection";
// import RegistrationModal from "@/component/virtual-darshan/RegistrationModal";

export default function VirtualDarshanPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HeroSection onRegister={() => setOpen(true)} />
            <Footer />

      {/* <WhyDarshan />
      <Features />
      <SocialResponsibility />
      <Destinations />
      <PricingNote />
      <CTASection onRegister={() => setOpen(true)} />
      <RegistrationModal open={open} onClose={() => setOpen(false)} /> */}
    </>
  );
}
