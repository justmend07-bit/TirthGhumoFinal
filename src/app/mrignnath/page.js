import React from "react";
import Navbar from '@/component/navbar';
import Hero from '@/component/1DayTrek/hero';
import Itinerary from "@/component/1DayTrek/itinerary";
import Gallery from "@/component/1DayTrek/gallery";
import Form from "@/component/1DayTrek/form";
import Testimonials from "@/component/1DayTrek/testimonials";
import Footer from "@/component/footer";
export default function Trek() {
    return (
        <div className="relative min-h-screen bg-linear-to-t to-amber-100 via-orange-50 from-white overflow-hidden ">
            <Navbar />
            <Hero />
            <Itinerary />
            <Gallery />
            <Testimonials />
            <Form />
            <Footer />
        </div >
    );
}