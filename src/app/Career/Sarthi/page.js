import Navbar from "@/component/navbar";
import HeroSection from '@/component/AboutSarthi/HeroSection';
import WhoIsSarthi from '@/component/AboutSarthi/WhoIsSarthi';
import WhyWeCreated from '@/component/AboutSarthi/WhyWeCreated';
import HowSarthiSupports from '@/component/AboutSarthi/HowSarthiSupports';
import WhyEldersLove from '@/component/AboutSarthi/WhyEldersLove';
import WhyBecomeSarthi from '@/component/AboutSarthi/WhyBecomeSarthi';
import WhoCanJoin from '@/component/AboutSarthi/WhoCanJoin';
import FinalCTA from '@/component/AboutSarthi/FinalCTA';
export default function SarthiPage() {


    return (
        <div className=" relative min-h-dvh bg-gradient-to-t to-amber-100 via-orange-50 from-white overflow-hidden ">
            <Navbar />
            <HeroSection  />
            <WhoIsSarthi />
            <WhyWeCreated />
            <HowSarthiSupports />
            {/* <WhyEldersLove /> */}
            <WhyBecomeSarthi />
            <WhoCanJoin />
            <FinalCTA  />
        </div>
    );
}