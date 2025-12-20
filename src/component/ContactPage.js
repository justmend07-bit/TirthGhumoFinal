"use client";
import { useState } from "react";
import Navbar from "@/component/navbar";
import TravelCategories from "@/data/travelCategories";
import { } from "lucide-react";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [customDest, setCustomDest] = useState(false);
    const [showOther, setShowOther] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/enquiry';

    function handleChange(e) {
        const value = e.target.value;
        setCustomDest(value === "other");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError("");

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const res = await fetch(BACKEND_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!res.ok) {
            setError(result.error || "Something went wrong");
            setLoading(false);
            return;
        }

        setLoading(false);
        setSuccess(true);
        e.target.reset();
    }

    const Label = ({ children }) => (
        <label className="font-semibold text-gray-700 mb-1 block">{children}</label>
    );

    const InputGroup = ({ label, ...props }) => (
        <div>
            <Label>{label}</Label>
            <input {...props} className="input-style" />
        </div>
    );

    const Info = ({ label, value, note }) => (
        <div>
            <p className="font-bold text-gray-800">{label}</p>
            <p className="text-gray-600">{value}</p>
            {note && <p className="text-gray-500 text-sm">{note}</p>}
        </div>
    );

    const Social = ({ href, icon, color, label }) => (
        <a
            href={href}
            target="_blank"
            className={`flex items-center gap-3 text-lg font-semibold ${color} hover:underline`}
        >
            <span className="text-2xl">{icon}</span> {label}
        </a>
    );
    const categories = TravelCategories;
    return (
        <div className="max-w-6xl mx-auto px-6 py-16 my-10">
            <Navbar />

            {/* Page Header */}
            <div className="text-center mb-14">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
                    Contact Our Travel Experts
                </h1>
                <div className="w-24 h-1 bg-orange-400 mx-auto mt-3 rounded-full"></div>
                <p className="text-gray-600 mt-3 text-lg">
                    Tell us your plan — we’ll craft an unforgettable trip for you.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* FORM CARD */}
                <form
                    onSubmit={handleSubmit}
                    className="md:col-span-2 bg-white shadow-lg rounded-2xl p-8 space-y-8 border border-orange-100"
                >
                    {/* GRID ROW 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputGroup label="Full Name" name="full_name" placeholder="John Doe" />
                        <InputGroup label="Email Address" name="email" type="email" placeholder="john@example.com" />
                    </div>

                    <InputGroup label="Phone Number" name="phone" placeholder="9876543210" />

                    {/* DESTINATION SELECT */}
                    <div>
                        <label className="font-bold">Select Pilgrimage / Tour Category</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setCustomDest(false);
                            }}
                            className="input-style"
                            required
                        >
                            <option value="">Select a category</option>
                            {Object.keys(categories).map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>

                        {selectedCategory && (
                            <>
                                <label className="font-bold mt-3 block">Destination</label>
                                <select
                                    name="destination"
                                    className="input-style"
                                    required={!customDest}
                                    onChange={(e) => setCustomDest(e.target.value === "Other")}
                                >
                                    <option value="">Select destination</option>
                                    {categories[selectedCategory].map((d) => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </>
                        )}

                        {customDest && (
                            <input
                                className="input-style mt-3"
                                placeholder="Enter your custom destination"
                                name="custom_destination"
                                required
                            />
                        )}
                    </div>

                    <div className="mt-4">
                        <label className="font-semibold text-gray-700 mb-1 block">
                            Any Other Specific Destination (Optional)
                        </label>
                        <input
                            type="text"
                            name="additional_destination"
                            className="input-style"
                            placeholder="Write any specific place you also want to visit"
                        />
                    </div>

                    {/* DATE + TRAVELERS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InputGroup label="Travel Date" name="start_date" type="date" />
                        <InputGroup label="Adults" name="adults" type="number" defaultValue={0} min={1} />
                        <InputGroup label="Children ( < 8 )" name="children" type="number" defaultValue={0} min={1} max={8} />
                    </div>

                    <InputGroup label="Departure City" name="departure_city" placeholder="Mumbai, Delhi…" />

                    {/* REFERRAL SOURCE */}
                    <div>
                        <Label>How Did You Hear About Us?</Label>

                        <select
                            name="referral_source"
                            required
                            onChange={(e) => setShowOther(e.target.value === "other")}
                            className="input-style"
                        >
                            <option value="">Select</option>
                            <option value="instagram">Instagram</option>
                            <option value="facebook">Facebook</option>
                            <option value="other">Other</option>
                        </select>

                        {showOther && (
                            <input
                                className="input-style mt-3"
                                name="referral_other"
                                placeholder="Please specify"
                                required
                            />
                        )}
                    </div>

                    {/* SPECIAL REQUEST */}
                    <div>
                        <Label>Special Requests (Optional)</Label>
                        <textarea
                            name="special_request"
                            rows={4}
                            className="input-style"
                            placeholder="Any special requests?  early check-in, Honeymoon setup, etc."
                        />
                    </div>

                    {/* STATUS MESSAGES */}
                    {error && <p className="text-red-600 font-medium">{error}</p>}
                    {success && <p className="text-green-600 font-medium">Your enquiry was submitted!</p>}

                    {/* SUBMIT BUTTON */}
                    <button
                        disabled={loading}
                        className="w-full md:w-auto px-8 py-3 bg-orange-500 text-white font-semibold rounded-xl shadow hover:bg-orange-600 hover:shadow-md transition-all"
                    >
                        {loading ? "Submitting..." : "Submit Enquiry"}
                    </button>
                </form>

                {/* CONTACT INFO CARD */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-md border border-orange-200 space-y-6 h-fit">
                    <h3 className="text-2xl font-bold text-orange-700">Need Quick Help?</h3>

                    <Info label="Email us" value="tirthghumo@gmail.com" />
                    <Info label="Call us" value="+91 6260 499 299" note="Available 9 AM – 9 PM" />

                    <Info
                        label="Location"
                        value="KLIC, LNCT Raisen Road, Bhopal, Madhya Pradesh"

                    />

                    <div className="space-y-3 pt-2">
                        <Social href="https://www.instagram.com/tirthghumo?igsh=MW02ejMyMnRxeXBpNQ==" icon={<FaInstagram className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-lg" />} color="text-black" label="Instagram" />
                        <Social href="https://www.facebook.com/people/TirthGhumo/61574751792264/#" icon={<FaFacebook className="text-blue-600" />} color="text-black" label="Facebook" />
                        <Social href="https://wa.me/916260499299" icon={<FaWhatsapp className="text-green-600" />} color="text-black" label="WhatsApp" />
                    </div>
                </div>
            </div>

            {/* STYLES */}
            <style>{`
      .input-style {
        width: 100%;
        padding: 12px 14px;
        border: 1px solid #e6e6e6;
        border-radius: 12px;
        font-size: 15px;
        transition: all .2s;
        background: white;
      }
      .input-style:focus {
        border-color: #f59e0b;
        background: #fff7ed;
        box-shadow: 0 0 4px #fbbf24;
      }
    `}</style>
        </div>
    );

}
