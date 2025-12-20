'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Form() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        gender: '',
        contactNumber: '',
        whatsappNumber: '',
        email: '',
        collegeName: '',
        pickUpLocation: '',
        dropLocation: '',
        mealPreference: '',
        experienceLevel: '',
        medicalDetails: '',
    });




    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({
        type: null,
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });
        const price = formData.mealPreference === "Yes" ? 939 : 739;
        const updatedData = {
            ...formData,

            price: price
        };

        if (typeof window !== "undefined") {
            localStorage.setItem('RegistrationFormData', JSON.stringify(updatedData));
        }

        router.push('/payment');
    };
    return (
        <div className="relative z-10">
            {/* Registration Form */}
            <div id="register" className="max-w-3xl mx-auto px-4 py-16">
                <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Secure Your Spot</h2>

                    {submitStatus.type && (
                        <div
                            className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                                }`}
                        >
                            {submitStatus.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name<span className='text-red-600 text-sm'>*</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="Shivam Kumar"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-green-700"
                            />
                        </div>

                        {/* Age & Gender */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Age & Gender<span className='text-red-600 text-sm'>*</span>
                                </label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    placeholder="Age"
                                    required
                                    min="5"
                                    max="100"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-green-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    &nbsp;
                                </label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-green-700"
                                >
                                    <option value="">Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                </select>
                            </div>
                        </div>

                        {/* Contact Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Number<span className='text-red-600 text-sm'>*</span>
                            </label>
                            <input
                                type="tel"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                                placeholder="946589XXXX"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-green-700"
                            />
                        </div>

                        {/* Emergency Contact */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Whatsapp Number <span className='text-red-600 text-sm'>*</span>
                            </label>
                            <input
                                type="text"
                                name="whatsappNumber"
                                value={formData.whatsappNumber}
                                onChange={handleInputChange}
                                placeholder="946589XXXX"
                                maxLength={10}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-green-700"
                            />
                        </div>

                        {/* Email Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address<span className='text-red-600 text-sm'>*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="you@example.com"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-green-700"
                            />
                        </div>

                        {/* College Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Acadmic Status<span className='text-red-600 text-sm'>*</span>
                            </label>
                            <input
                                type="text"
                                name="collegeName"
                                value={formData.collegeName}
                                onChange={handleInputChange}
                                placeholder="Institution name / working professional"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-green-700"
                            />
                        </div>

                        {/* Pick Up & Drop Location */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Pick Up Location<span className='text-red-600 text-sm'>*</span>
                                </label>
                                <select
                                    name="pickUpLocation"
                                    value={formData.pickUpLocation}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-green-700"
                                >
                                    <option value="">Select pick up point</option>
                                    <option value="LNCT , Raisen Road">LNCT , Raisen Road</option>
                                    <option value="Siddharth Lake City">Siddharth Lake City</option>
                                    <option value="Anand Nagar">Anand Nagar</option>
                                    <option value="Ratnagiri">Ratnagiri</option>
                                    <option value="Piplani Petrol Pump">Piplani Petrol Pump</option>
                                    <option value="Indrapuri BHEL GATE">Indrapuri BHEL GATE(In front of Reliance Digital)</option>
                                    <option value="Jk Road">JK Road</option>
                                    <option value="Jyoti Talkies , M.P.Nagar">Jyoti Talkies , M.P.Nagar</option>
                                    <option value="Rani Kamlapati Station">Rani Kamlapati Station(Platform No.1)</option>
                                    <option value="Barkatullah University">Barkatullah university</option>
                                    <option value="Ashima Mall">Ashima Mall</option>
                                    <option value="Capital Mall">Capital Mall</option>


                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Drop Location<span className='text-red-600 text-sm'>*</span>
                                </label>
                                <select
                                    name="dropLocation"
                                    value={formData.dropLocation}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-green-700"
                                >
                                    <option value="">Select pick up point</option>
                                    <option value="LNCT , Raisen Road">LNCT , Raisen Road</option>
                                    <option value="Siddharth Lake City">Siddharth Lake City</option>
                                    <option value="Anand Nagar">Anand Nagar</option>
                                    <option value="Ratnagiri">Ratnagiri</option>
                                    <option value="Piplani Petrol Pump">Piplani Petrol Pump</option>
                                    <option value="Indrapuri BHEL GATE">Indrapuri BHEL GATE(In front of Reliance Digital)</option>
                                    <option value="Jk Road">JK Road</option>
                                    <option value="Jyoti Talkies , M.P.Nagar">Jyoti Talkies , M.P.Nagar</option>
                                    <option value="Rani Kamlapati Station">Rani Kamlapati Station(Platform No.1)</option>
                                    <option value="Barkatullah University">Barkatullah university</option>
                                    <option value="Ashima Mall">Ashima Mall</option>
                                    <option value="Capital Mall">Capital Mall</option>
                                </select>
                            </div>
                        </div>
                        {/* Meal options */}

                        <div>
                            <label className=" block text-sm font-medium text-gray-700 mb-2 ">
                                Meal Preference<span className='text-red-600 text-sm'>*</span>
                            </label>
                            <select
                                name='mealPreference'
                                value={formData.mealPreference}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-green-700"
                            >
                                <option value="">Select meal preference</option>
                                <option value="Yes" className='font-semibold'>Meal (₹939)</option>
                                <option value="No" >No Meal (₹739)</option>
                            </select>
                        </div>


                        {/* Trek Experience Level */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Trek Experience Level<span className='text-red-600 text-sm'>*</span>
                            </label>
                            <select
                                name="experienceLevel"
                                value={formData.experienceLevel}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-green-700"
                            >
                                <option value="">Select your experience</option>
                                <option value="beginner" className="text-black">Beginner - First time trekker</option>
                                <option value="intermediate" className="text-black">Intermediate - Done a few treks</option>
                                <option value="advanced" className="text-black">Advanced - Experienced trekker</option>
                                <option value="expert" className="text-black">Expert - Professional level</option>

                            </select>
                        </div>

                        {/* Additional Comments */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Medical Details
                            </label>
                            <textarea
                                name="medicalDetails"
                                value={formData.medicalDetails}
                                onChange={handleInputChange}
                                placeholder="Any medical conditions or allergies?"
                                rows={2}
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-green-700"
                            />
                        </div>

                        {/* Payment Details */}
                        {/* <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h3 className="font-bold text-gray-800 mb-3">Payment Details</h3>
              <p className="text-gray-600 text-sm mb-3">
                You will be redirected to our secure payment partner after clicking the button below.
              </p>
              <p className="text-2xl font-bold text-gray-800">Total: $99.00</p>
            </div> */}
                        <div>

                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-4 rounded-full transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Processing...' : 'Secure My Spot'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}