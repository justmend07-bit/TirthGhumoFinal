"use client";

import { FaWhatsapp, FaFacebook, FaLinkedin, FaInstagram, FaPhone } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-white to-[#f6e8bb] border-t border-white py-8 sm:py-10 md:py-12 text-gray-800">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-14">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 md:gap-10 lg:gap-12">

                    {/* Company Info */}
                    <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col items-center lg:items-start">
                        <p className="text-sm sm:text-base leading-relaxed text-center lg:text-left font-sans italic">
                            At <span className="font-bold italic">Tirth Ghumo</span>, we believe every journey should reflect our motto —{" "}
                            <span className="font-bold italic">Aastha Bhi, Suvidha Bhi.</span> As a trusted travel agency, we organize hassle-free
                            spiritual tours designed for your comfort and peace of mind. With{" "}
                            <span className="font-bold">1500+ happy travelers</span>, we're committed to making every trip a meaningful and memorable
                            experience.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center justify-center lg:justify-start space-x-3 sm:space-x-4 md:space-x-5 mt-6 md:mt-8">
                            <a 
                                href="https://www.instagram.com/tirthghumo?igsh=MW02ejMyMnRxeXBpNQ==" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-white p-2.5 sm:p-3 rounded-full hover:bg-yellow-500 transition-colors duration-300 text-yellow-500 hover:text-white"
                                aria-label="Instagram"
                            >
                                <FaInstagram size={18} />
                            </a>
                            <a 
                                href="http://wa.me/916260499299" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white p-2.5 sm:p-3 rounded-full hover:bg-yellow-500 transition-colors duration-300 text-yellow-500 hover:text-white"
                                aria-label="WhatsApp"
                            >
                                <FaWhatsapp size={18} />
                            </a>
                            <a 
                                href="https://www.facebook.com/people/TirthGhumo/61574751792264/" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white p-2.5 sm:p-3 rounded-full hover:bg-yellow-500 transition-colors duration-300 text-yellow-500 hover:text-white"
                                aria-label="Facebook"
                            >
                                <FaFacebook size={18} />
                            </a>
                            <a 
                                href="https://www.linkedin.com/company/tirthghumo/" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white p-2.5 sm:p-3 rounded-full hover:bg-yellow-500 transition-colors duration-300 text-yellow-500 hover:text-white"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin size={18} />
                            </a>
                            <a 
                                href="tel:+916260499299"
                                className="bg-white p-2.5 sm:p-3 rounded-full hover:bg-yellow-500 transition-colors duration-300 text-yellow-500 hover:text-white"
                                aria-label="Phone"
                            >
                                <FaPhone size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="w-full lg:w-1/2 xl:w-3/5 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
                        {/* Informations */}
                        <div>
                            <h3 className="font-bold text-base md:text-lg mb-4 md:mb-5 text-gray-900">Informations</h3>
                            <ul className="space-y-3 md:space-y-4 text-sm">
                                <li>
                                    <a href="#" className="hover:text-yellow-600 transition-colors duration-300 font-sans font-semibold">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-yellow-600 transition-colors duration-300 font-sans font-semibold">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-yellow-600 transition-colors duration-300 font-sans font-semibold">
                                        Testimonial
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Helpful Links */}
                        <div>
                            <h3 className="font-bold text-base md:text-lg mb-4 md:mb-5 text-gray-900">Helpful Links</h3>
                            <ul className="space-y-3 md:space-y-4 text-sm">
                                <li>
                                    <a href="/Career" className="hover:text-yellow-600 transition-colors duration-300 font-sans font-semibold">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-yellow-600 transition-colors duration-300 font-sans font-semibold">
                                        Supports
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-yellow-600 transition-colors duration-300 font-sans font-semibold">
                                        T&Cs
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Our Services */}
                        <div className="col-span-2 sm:col-span-1">
                            <h3 className="font-bold text-base md:text-lg mb-4 md:mb-5 text-gray-900">Our Services</h3>
                            <ul className="space-y-3 md:space-y-4 text-sm">
                                <li>
                                    <a href="#" className="hover:text-yellow-600 transition-colors duration-300 font-sans font-semibold">
                                        Photography
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-yellow-600 transition-colors duration-300 font-sans font-semibold">
                                        Support 24/7
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-yellow-600 transition-colors duration-300 font-sans font-semibold">
                                        Packages
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}