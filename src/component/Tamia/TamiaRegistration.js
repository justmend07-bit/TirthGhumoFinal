'use client';
import { useState } from "react";
import { ChevronLeft, Plus, Trash2, Upload, X } from "lucide-react";

export default function RegistrationPage() {
    const emptyTraveller = {
        full_name: "",
        gender: "",
        age: "",
        email: "",
        contact_number: "",
        whatsapp_number: "",
        emergency_contact: "",
        college_name: "",

        id_proof_type: "",
        id_proof_number: "",
        id_proof_file: null,
        id_proof_file_name: "",
        medical_details: "",
        special_request: "",
        terms_accepted: false,
    };

    const [activeTravellerIndex, setActiveTravellerIndex] = useState(null);

    const Backend = process.env.NEXT_PUBLIC_BACKEND_URL + '/tamia';

    const [travellers, setTravellers] = useState([emptyTraveller]);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const [showTermsModal, setShowTermsModal] = useState(false);


    /* ---------------- Helpers ---------------- */

    const addTraveller = () => {
        setTravellers([...travellers, { ...emptyTraveller }]);
    };

    const removeTraveller = (index) => {
        if (travellers.length > 1) {
            setTravellers(travellers.filter((_, i) => i !== index));
        }
    };

    const updateTraveller = (index, field, value) => {
        const updated = [...travellers];
        updated[index][field] = value;
        setTravellers(updated);

        if (errors[`${index}-${field}`]) {
            const newErrors = { ...errors };
            delete newErrors[`${index}-${field}`];
            setErrors(newErrors);
        }
    };

    /* ---------------- File Upload ---------------- */

    const handleFileUpload = (index, file) => {
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            alert('Please upload only JPG, PNG, WEBP, or PDF files');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        const updated = [...travellers];
        updated[index].id_proof_file = file;
        updated[index].id_proof_file_name = file.name;
        setTravellers(updated);

        if (errors[`${index}-id_proof_file`]) {
            const newErrors = { ...errors };
            delete newErrors[`${index}-id_proof_file`];
            setErrors(newErrors);
        }
    };

    const removeFile = (index) => {
        const updated = [...travellers];
        updated[index].id_proof_file = null;
        updated[index].id_proof_file_name = "";
        setTravellers(updated);
    };

    /* ---------------- Validation ---------------- */

    const validateForm = () => {
        const newErrors = {};
        let firstErrorIndex = null;

        for (let i = 0; i < travellers.length; i++) {
            const t = travellers[i];

            if (!t.full_name || t.full_name.trim() === '') {
                newErrors[`${i}-full_name`] = 'Full name is required';
                if (firstErrorIndex === null) firstErrorIndex = i;
            }

            if (!t.gender) {
                newErrors[`${i}-gender`] = 'Please select gender';
                if (firstErrorIndex === null) firstErrorIndex = i;
            }

            const age = Number(t.age);
            if (!t.age || isNaN(age) || age < 1 || age > 120) {
                newErrors[`${i}-age`] = 'Please enter a valid age (1-120)';
                if (firstErrorIndex === null) firstErrorIndex = i;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!t.email || t.email.trim() === '') {
                newErrors[`${i}-email`] = 'Email address is required';
                if (firstErrorIndex === null) firstErrorIndex = i;
            } else if (!emailRegex.test(t.email)) {
                newErrors[`${i}-email`] = 'Please enter a valid email address';
                if (firstErrorIndex === null) firstErrorIndex = i;
            }

            const phoneRegex = /^\d{10}$/;
            if (!t.contact_number || t.contact_number.trim() === '') {
                newErrors[`${i}-contact_number`] = 'Contact number is required';
                if (firstErrorIndex === null) firstErrorIndex = i;
            } else if (!phoneRegex.test(t.contact_number)) {
                newErrors[`${i}-contact_number`] = 'Please enter a valid 10-digit number';
                if (firstErrorIndex === null) firstErrorIndex = i;
            }

            if (!t.whatsapp_number || t.whatsapp_number.trim() === '') {
                newErrors[`${i}-whatsapp_number`] = 'WhatsApp number is required';
                if (firstErrorIndex === null) firstErrorIndex = i;
            } else if (!phoneRegex.test(t.whatsapp_number)) {
                newErrors[`${i}-whatsapp_number`] = 'Please enter a valid 10-digit number';
                if (firstErrorIndex === null) firstErrorIndex = i;
            }

            if (!t.emergency_contact || t.emergency_contact.trim() === '') {
                newErrors[`${i}-emergency_contact`] = 'Emergency contact is required';
                if (firstErrorIndex === null) firstErrorIndex = i;
            } else if (!phoneRegex.test(t.emergency_contact)) {
                newErrors[`${i}-emergency_contact`] = 'Please enter a valid 10-digit number';
                if (firstErrorIndex === null) firstErrorIndex = i;
            }




            if (!t.id_proof_type) {
                newErrors[`${i}-id_proof_type`] = 'Please select ID proof type';
                if (firstErrorIndex === null) firstErrorIndex = i;
            }

            if (!t.id_proof_number || t.id_proof_number.trim() === '') {
                newErrors[`${i}-id_proof_number`] = 'ID proof number is required';
                if (firstErrorIndex === null) firstErrorIndex = i;
            }

            if (!t.id_proof_file) {
                newErrors[`${i}-id_proof_file`] = 'Please upload ID proof document';
                if (firstErrorIndex === null) firstErrorIndex = i;
            }

            if (!t.terms_accepted) {
                newErrors[`${i}-terms_accepted`] = 'You must accept the terms & conditions';
                if (firstErrorIndex === null) firstErrorIndex = i;
            }
        }

        setErrors(newErrors);

        if (firstErrorIndex !== null) {
            const firstErrorElement = document.querySelector(`[data-traveller-index="${firstErrorIndex}"]`);
            if (firstErrorElement) {
                firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        return Object.keys(newErrors).length === 0;
    };

    /* ---------------- Submit ---------------- */

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setSubmitting(true);

        try {
            const formData = new FormData();

            // Add each traveller's ID proof file
            travellers.forEach((t, index) => {
                if (t.id_proof_file) {
                    formData.append('files', t.id_proof_file);
                }
            });

            // Prepare travellers data
            const travellersData = travellers.map((t) => ({
                full_name: t.full_name,
                gender: t.gender,
                age: Number(t.age),
                email: t.email,
                contact_number: t.contact_number,
                whatsapp_number: t.whatsapp_number,
                emergency_contact: t.emergency_contact,
                id_proof_type: t.id_proof_type,
                id_proof_number: t.id_proof_number,
                medical_details: t.medical_details,
                special_request: t.special_request,
                terms_accepted: t.terms_accepted,
            }));

            // Create the payload
            const payload = {
                tour_name: "Tamia & Patalkot - 1N/2D Adventure",
                departure_batch: "29 December - 1st Batch",
                travellers: travellersData,
                total_amount: travellers.length * 6700,
            };

            // Add JSON data to FormData
            formData.append('data', JSON.stringify(payload));

            const res = await fetch(Backend, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                let errorMessage = "Failed to create booking";

                try {
                    const errorData = await res.json();
                    errorMessage = errorData?.message || errorMessage;
                } catch {
                    // response was not JSON
                }

                throw new Error(errorMessage);
            }

            const data = await res.json();

            if (typeof window !== 'undefined' && window.sessionStorage) {
                sessionStorage.setItem("bookingId", data.id);
                sessionStorage.setItem("amount", data.amount);
            }

            window.location.href = "/payment";

        } catch (err) {
            console.error("Booking error:", err);

            if (err.name === "ZodError") {
                alert(err.errors[0].message);
                return;
            }

            if (err instanceof TypeError) {
                alert("Unable to connect to server. Please try again later.");
                return;
            }

            alert(err.message || "Something went wrong. Please try again.");

        } finally {
            setSubmitting(false);
        }
    };

    /* ---------------- UI ---------------- */

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-4 px-4 sticky top-0 z-50 shadow-lg">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <button onClick={() => window.history.back()} className="hover:bg-orange-700 p-2 rounded-full transition-colors">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold">Registration Form</h1>
                        <p className="text-orange-100 text-sm">{travellers.length} Traveller{travellers.length > 1 ? 's' : ''}</p>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {travellers.map((traveller, index) => (
                    <div key={index} data-traveller-index={index} className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-orange-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Traveller {index + 1}</h3>
                            {travellers.length > 1 && (
                                <button
                                    onClick={() => removeTraveller(index)}
                                    className="text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    value={traveller.full_name}
                                    onChange={(e) => updateTraveller(index, "full_name", e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors[`${index}-full_name`] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter full name"
                                />
                                {errors[`${index}-full_name`] && (
                                    <p className="mt-1 text-sm text-red-600">{errors[`${index}-full_name`]}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                                <select
                                    value={traveller.gender}
                                    onChange={(e) => updateTraveller(index, "gender", e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors[`${index}-gender`] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                >
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors[`${index}-gender`] && (
                                    <p className="mt-1 text-sm text-red-600">{errors[`${index}-gender`]}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                                <input
                                    type="number"
                                    value={traveller.age}
                                    onChange={(e) => updateTraveller(index, "age", e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors[`${index}-age`] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter age"
                                    min="1"
                                    max="120"
                                />
                                {errors[`${index}-age`] && (
                                    <p className="mt-1 text-sm text-red-600">{errors[`${index}-age`]}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                <input
                                    type="email"
                                    value={traveller.email}
                                    onChange={(e) => updateTraveller(index, "email", e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors[`${index}-email`] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="your@email.com"
                                />
                                {errors[`${index}-email`] && (
                                    <p className="mt-1 text-sm text-red-600">{errors[`${index}-email`]}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
                                <input
                                    type="tel"
                                    value={traveller.contact_number}
                                    onChange={(e) => updateTraveller(index, "contact_number", e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors[`${index}-contact_number`] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="10-digit mobile number"
                                />
                                {errors[`${index}-contact_number`] && (
                                    <p className="mt-1 text-sm text-red-600">{errors[`${index}-contact_number`]}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number *</label>
                                <input
                                    type="tel"
                                    value={traveller.whatsapp_number}
                                    onChange={(e) => updateTraveller(index, "whatsapp_number", e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors[`${index}-whatsapp_number`] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="10-digit WhatsApp number"
                                />
                                {errors[`${index}-whatsapp_number`] && (
                                    <p className="mt-1 text-sm text-red-600">{errors[`${index}-whatsapp_number`]}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact *</label>
                                <input
                                    type="tel"
                                    value={traveller.emergency_contact}
                                    onChange={(e) => updateTraveller(index, "emergency_contact", e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors[`${index}-emergency_contact`] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Emergency contact number"
                                />
                                {errors[`${index}-emergency_contact`] && (
                                    <p className="mt-1 text-sm text-red-600">{errors[`${index}-emergency_contact`]}</p>
                                )}
                            </div>





                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ID Proof Type *</label>
                                <select
                                    value={traveller.id_proof_type}
                                    onChange={(e) => updateTraveller(index, "id_proof_type", e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors[`${index}-id_proof_type`] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                >
                                    <option value="">Select ID proof</option>
                                    <option value="Aadhar Card">Aadhar Card</option>
                                    <option value="PAN Card">PAN Card</option>
                                    <option value="Driving License">Driving License</option>
                                    <option value="Voter ID">Voter ID</option>
                                    <option value="Passport">Passport</option>

                                </select>
                                {errors[`${index}-id_proof_type`] && (
                                    <p className="mt-1 text-sm text-red-600">{errors[`${index}-id_proof_type`]}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ID Proof Number *</label>
                                <input
                                    type="text"
                                    value={traveller.id_proof_number}
                                    onChange={(e) => updateTraveller(index, "id_proof_number", e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors[`${index}-id_proof_number`] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter ID number"
                                />
                                {errors[`${index}-id_proof_number`] && (
                                    <p className="mt-1 text-sm text-red-600">{errors[`${index}-id_proof_number`]}</p>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Upload ID Proof *</label>
                                <div className="space-y-2">
                                    {!traveller.id_proof_file ? (
                                        <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${errors[`${index}-id_proof_file`] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                            }`}>
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className={`w-8 h-8 mb-2 ${errors[`${index}-id_proof_file`] ? 'text-red-500' : 'text-gray-400'}`} />
                                                <p className="mb-2 text-sm text-gray-600">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500">PNG, JPG, WEBP or PDF (MAX. 5MB)</p>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) handleFileUpload(index, file);
                                                }}
                                            />
                                        </label>
                                    ) : (
                                        <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-orange-100 p-2 rounded">
                                                    <Upload className="w-5 h-5 text-orange-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{traveller.id_proof_file_name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {(traveller.id_proof_file.size / 1024).toFixed(2)} KB
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(index)}
                                                className="text-red-600 hover:bg-red-100 p-2 rounded-full transition-colors"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                    {errors[`${index}-id_proof_file`] && (
                                        <p className="text-sm text-red-600">{errors[`${index}-id_proof_file`]}</p>
                                    )}
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Medical Details (Optional)</label>
                                <textarea
                                    value={traveller.medical_details}
                                    onChange={(e) => updateTraveller(index, "medical_details", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    rows={2}
                                    placeholder="Any medical conditions we should know about"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Special Request (Optional)</label>
                                <textarea
                                    value={traveller.special_request}
                                    onChange={(e) => updateTraveller(index, "special_request", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    rows={2}
                                    placeholder="Any special requests or dietary requirements"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="flex items-start gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={traveller.terms_accepted}
                                        onChange={(e) =>
                                            updateTraveller(index, "terms_accepted", e.target.checked)
                                        }
                                        className={`mt-1 w-4 h-4 text-orange-600 rounded focus:ring-orange-500 ${errors[`${index}-terms_accepted`]
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            }`}
                                    />

                                    <span className="text-sm text-gray-700">
                                        I agree to the{" "}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setActiveTravellerIndex(index);
                                                setShowTermsModal(true);
                                            }}

                                            className="text-orange-600 font-semibold underline hover:text-orange-700"
                                        >
                                            Terms & Conditions
                                        </button>{" "}
                                        and understand the tour policies *
                                    </span>
                                </label>

                                {errors[`${index}-terms_accepted`] && (
                                    <p className="mt-1 text-sm text-red-600 ml-6">
                                        {errors[`${index}-terms_accepted`]}
                                    </p>
                                )}
                            </div>

                        </div>
                        
                    </div>

                ))}
                
                {showTermsModal && activeTravellerIndex !== null && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    <div className="bg-white max-w-2xl w-full rounded-xl shadow-xl overflow-hidden">

      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h2 className="text-lg font-bold text-gray-900">
          Terms & Conditions
        </h2>
        <button
          onClick={() => setShowTermsModal(false)}
          className="text-gray-500 hover:text-red-600"
        >
          ✕
        </button>
      </div>

      <div className="px-6 py-4 max-h-[60vh] overflow-y-auto text-sm text-gray-700 space-y-4">
        {/* terms text */}
      </div>

      <div className="flex justify-end gap-3 px-6 py-4 border-t">
        <button
          onClick={() => setShowTermsModal(false)}
          className="px-4 py-2 rounded-lg bg-gray-100"
        >
          Close
        </button>
        <button
          onClick={() => {
            updateTraveller(activeTravellerIndex, "terms_accepted", true);
            setShowTermsModal(false);
          }}
          className="px-4 py-2 rounded-lg bg-orange-600 text-white font-semibold"
        >
          Accept
        </button>
      </div>

    </div>
  </div>
)}


                <button
                    onClick={addTraveller}
                    className="w-full bg-orange-100 text-orange-700 py-3 rounded-lg font-semibold hover:bg-orange-200 transition-colors flex items-center justify-center gap-2 mb-6"
                >
                    <Plus className="w-5 h-5" />
                    Add Another Traveller
                </button>

                <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-orange-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-600">Total Travellers</p>
                            <p className="text-2xl font-bold text-gray-900">{travellers.length}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">Total Amount</p>
                            <p className="text-2xl font-bold text-orange-600">₹{travellers.length * 6700}</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {submitting ? "Processing..." : "Proceed to Payment"}
                </button>

            </div>


        </div>
    );
}