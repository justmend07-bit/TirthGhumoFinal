"use client";

import { useState, useEffect } from "react";
import { Mountain, Shield, QrCode, Lock, User, Mail, Phone, Calendar, Building2, FileText, Heart, Upload, CheckCircle, ArrowLeft, CreditCard, AlertCircle, Users, Train } from "lucide-react";
import { useRouter } from "next/navigation";
export default function PaymentPage() {
    const [registrationData, setRegistrationData] = useState(null);
    const [paymentScreenshot, setPaymentScreenshot] = useState(null);
    const [screenshotPreview, setScreenshotPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [qrImage, setQrImage] = useState(null);
    const [qrError, setQrError] = useState("");
    const router = useRouter();

    const [isRedirecting, setIsRedirecting] = useState(false);


    // Mock backend URL - replace with actual
    const BackendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        // Check if coming from registration
        const step = typeof window !== "undefined" ? localStorage.getItem('manaliRegistrationStep') : null;
        if (step !== 'payment') {
            // Redirect to registration
            if (typeof window !== "undefined") {
                window.location.href = '/Manali/register';
            }
            return;
        }

        // Cleanup on unmount
        const cleanup = () => sessionStorage.removeItem('manaliRegistrationStep');
        if (typeof window !== "undefined") {
            window.addEventListener('beforeunload', cleanup);
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener('beforeunload', cleanup);
            }
        };
    }, []);

    useEffect(() => {
        // Load registration data from sessionStorage
        const savedData = sessionStorage.getItem('manaliRegistration');
        if (savedData) {
            try {
                setRegistrationData(JSON.parse(savedData));
            } catch (err) {
                console.error('Error parsing saved data:', err);
                alert("Error loading registration data. Please try again.");
                if (typeof window !== "undefined") {
                    window.location.href = "/Manali/register";
                }
            }
        } else {
            alert("No registration data found. Please complete the registration form first.");
            if (typeof window !== "undefined") {
                window.location.href = "/Manali/register";
            }
        }
    }, []);

    useEffect(() => {
        // Fetch QR code from backend
        const fetchQR = async () => {
            // Make sure registrationData exists first
            if (!registrationData) return;

            try {
                // Calculate counts INSIDE the useEffect
                const acCount = registrationData.travelers.filter(t => t.train_preference === 'ac').length;
                const sleeperCount = registrationData.travelers.filter(t => t.train_preference === 'non-ac').length;

                const res = await fetch(`${BackendURL}/manali/price?sleeper=${sleeperCount}&ac=${acCount}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) throw new Error("Failed to load QR");
                const data = await res.json();
                setQrImage(data.payment_qr_url);
            } catch (err) {
                console.error(err);
                setQrError("Unable to load payment QR. Please refresh.");
            }
        };

        fetchQR();
    }, [BackendURL, registrationData]);

    const handleScreenshotChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                setError('Please upload a valid image file (JPG, PNG, GIF, or WebP)');
                e.target.value = '';
                return;
            }

            // Validate file size (10MB)
            if (file.size > 10 * 1024 * 1024) {
                setError('File size should be less than 10MB');
                e.target.value = '';
                return;
            }

            setPaymentScreenshot(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setScreenshotPreview(reader.result);
            };
            reader.onerror = () => {
                setError('Failed to read file. Please try again.');
                setPaymentScreenshot(null);
                setScreenshotPreview(null);
            };
            reader.readAsDataURL(file);
            setError("");
        }
    };

    const handleBackToEdit = () => {
        if (typeof window !== "undefined") {
            window.history.back();
        }
    };

    const handleSubmit = async () => {
        if (!paymentScreenshot) {
            setError("Please upload payment screenshot to proceed");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const formData = new FormData();
            const leader = registrationData.commonDetails;
            const leaderTraveler = registrationData.travelers?.[0];


            formData.append("full_name", leaderTraveler?.full_name || "");
            formData.append("email", leader.email || "");
            formData.append("age", parseInt(leaderTraveler?.age) || 0);
            formData.append("gender", leaderTraveler?.gender || "");
            formData.append("contact_number", leader.primary_mobile || "");


            formData.append("whatsapp_number", leader.whatsapp_number || "");
            formData.append("college_name", leader.institute_name || "");
            formData.append("emergency_number", leader.emergency_contact || "");
            formData.append("proof_id_type", leader.proof_id_type || "");
            formData.append("id_number", leader.id_number || "");
            formData.append("medical_detail", leader.medical_details || "");
            formData.append("special_request", leader.special_request || "");


            formData.append("agreed", registrationData.agree_to_terms ? "true" : "false");


            const leaderTrainType = registrationData.travelers[0]?.train_preference || "mixed";
            formData.append("train_type", leaderTrainType);

            formData.append(
                "no_of_passengers",
                String(registrationData.travelers.length)
            );



            const passengers = registrationData.travelers.map(p => ({
                full_name: p.full_name,
                gender: p.gender,
                age: parseInt(p.age),
                contact_number: p.contact_number || leader.primary_mobile || "",
                train_type: p.train_preference
            }));

            formData.append("passengers", JSON.stringify(passengers));


            if (leader.id_image && leader.id_image instanceof File) {
                formData.append("id_image_url", leader.id_image);
            }


            if (paymentScreenshot && paymentScreenshot instanceof File) {
                formData.append("payment_screenshot", paymentScreenshot);
            }


            console.log("=== FormData Entries ===");
            for (let [key, value] of formData.entries()) {
                if (value instanceof File) {
                    console.log(`${key}: File - ${value.name} (${value.type}, ${value.size} bytes)`);
                } else if (key === 'passengers') {
                    console.log(`${key}:`, JSON.parse(value));
                } else {
                    console.log(`${key}:`, value, `(Type: ${typeof value})`);
                }
            }


            const response = await fetch(`${BackendURL}/manali`, {
                method: "POST",
                body: formData,

            });

            // Handle response
            if (!response.ok) {
                let errorMessage = `Server error: ${response.status}`;

                try {
                    const errorText = await response.text();
                    console.error("Server error response:", errorText);

                    // Try to parse as JSON
                    try {
                        const errorJson = JSON.parse(errorText);
                        errorMessage = errorJson.detail || errorJson.message || errorText;
                    } catch {
                        errorMessage = errorText || `HTTP ${response.status}`;
                    }
                } catch (e) {
                    console.error("Error reading response:", e);
                }

                throw new Error(errorMessage);
            }

            // Parse successful response
            const result = await response.json();
            // console.log("Success response:", result);
            setIsRedirecting(true);
            // Redirect to success page
            localStorage.setItem("ManaliPaymentSuccess", "true");
            sessionStorage.removeItem("manaliRegistration");
            localStorage.removeItem("manaliRegistrationStep");
            setTimeout(() => {
                router.replace("/Manali/Success");
            }, 300);

        } catch (err) {
            console.error("Submit error:", err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDownloadQR = async () => {
        if (!qrImage) return;

        try {
            // Fetch the image as a blob
            const response = await fetch(qrImage);
            const blob = await response.blob();

            // Create a blob URL
            const blobUrl = window.URL.createObjectURL(blob);

            // Create download link
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = "tirth-ghumo-upi-qr.jpg";
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Download failed:", error);
            // Fallback: open in new tab
            window.open(qrImage, '_blank');
        }
    };

    if (!registrationData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Calculate AC and Non-AC counts
    const acCount = registrationData.travelers.filter(t => t.train_preference === 'ac').length;
    const nonAcCount = registrationData.travelers.filter(t => t.train_preference === 'non-ac').length;

    if (isRedirecting) {
        return (
            <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        
                    </h2>
                    <p className="text-gray-600">
                        Redirecting to confirmation page…
                    </p>
                </div>
            </div>
        );
    }


    return (


        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
            {/* Header */}
            <nav className="bg-white shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center">
                            <Mountain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div>
                            <div className="font-bold text-base sm:text-lg text-gray-900">Tirth Ghumo</div>
                            <div className="text-xs text-gray-500 hidden sm:block">Aastha Bhi, Suvidha Bhi</div>
                        </div>
                    </div>
                    <button
                        onClick={handleBackToEdit}
                        className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-orange-500 transition text-xs sm:text-sm font-medium"
                    >
                        <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Edit Details</span>
                        <span className="sm:hidden">Edit</span>
                    </button>
                </div>
            </nav>

            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-6 sm:mb-10">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
                            Complete Your <span className="text-orange-500">Payment</span>
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600 px-4">Review your details and complete the payment to confirm your booking</p>
                    </div>

                    {/* Error Message - Display at the top */}
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                            <div className="flex items-start">
                                <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="text-sm font-semibold text-red-900 mb-1">Submission Error</h3>
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                        {/* Left Column - Booking Details */}
                        <div className="space-y-4 sm:space-y-6">
                            {/* Booking Summary Card */}
                            <div className="bg-gradient-to-br from-orange-300 to-orange-400 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-xl">
                                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Booking Summary</h2>
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex justify-between items-center pb-3 sm:pb-4 border-b border-orange-400">
                                        <span className="text-sm sm:text-base text-orange-100">Trip Package</span>
                                        <span className="font-bold text-lg sm:text-xl">Manali Classic</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-3 sm:pb-4 border-b border-orange-400">
                                        <span className="text-sm sm:text-base text-orange-100">Duration</span>
                                        <span className="text-sm sm:text-base font-semibold">6 Days / 5 Nights</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-3 sm:pb-4 border-b border-orange-400">
                                        <span className="text-sm sm:text-base text-orange-100">Total Travelers</span>
                                        <span className="text-sm sm:text-base font-semibold">{registrationData.traveler_count} {registrationData.traveler_count === 1 ? 'Person' : 'People'}</span>
                                    </div>
                                    {(acCount > 0 || nonAcCount > 0) && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm sm:text-base text-orange-100">Train Preferences</span>
                                            <div className="text-sm sm:text-base font-semibold text-right">
                                                {acCount > 0 && <div>AC: {acCount}</div>}
                                                {nonAcCount > 0 && <div>Non-AC: {nonAcCount}</div>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Common Contact Details */}
                            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-orange-500" />
                                    Contact Information
                                </h2>

                                <div className="space-y-4 sm:space-y-6">
                                    <div>
                                        <h3 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wide">Primary Contact</h3>
                                        <div className="space-y-2 sm:space-y-3">
                                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                                                <span className="text-sm sm:text-base text-gray-600">Mobile:</span>
                                                <span className="text-sm sm:text-base font-semibold text-gray-900">{registrationData.commonDetails?.primary_mobile}</span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2">
                                                <span className="text-sm sm:text-base text-gray-600">Email:</span>
                                                <span className="text-sm sm:text-base font-semibold text-gray-900 sm:text-right break-all">{registrationData.commonDetails?.email}</span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                                                <span className="text-sm sm:text-base text-gray-600">WhatsApp:</span>
                                                <span className="text-sm sm:text-base font-semibold text-gray-900">{registrationData.commonDetails?.whatsapp_number}</span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                                                <span className="text-sm sm:text-base text-gray-600">Emergency:</span>
                                                <span className="text-sm sm:text-base font-semibold text-gray-900">{registrationData.commonDetails?.emergency_contact}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {registrationData.commonDetails?.institute_name && (
                                        <div className="border-t border-gray-200 pt-3 sm:pt-4">
                                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                                                <span className="text-sm sm:text-base text-gray-600">Institute:</span>
                                                <span className="text-sm sm:text-base font-semibold text-gray-900 sm:text-right break-words">{registrationData.commonDetails.institute_name}</span>
                                            </div>
                                        </div>
                                    )}

                                    {(registrationData.commonDetails?.proof_id_type || registrationData.commonDetails?.id_number) && (
                                        <div className="border-t border-gray-200 pt-3 sm:pt-4">
                                            <h3 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wide">ID Details</h3>
                                            <div className="space-y-2 sm:space-y-3">
                                                {registrationData.commonDetails?.proof_id_type && (
                                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                                                        <span className="text-sm sm:text-base text-gray-600">ID Type:</span>
                                                        <span className="text-sm sm:text-base font-semibold text-gray-900 uppercase">{registrationData.commonDetails.proof_id_type}</span>
                                                    </div>
                                                )}
                                                {registrationData.commonDetails?.id_number && (
                                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                                                        <span className="text-sm sm:text-base text-gray-600">ID Number:</span>
                                                        <span className="text-sm sm:text-base font-semibold text-gray-900 break-all">{registrationData.commonDetails.id_number}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {(registrationData.commonDetails?.medical_details || registrationData.commonDetails?.special_request) && (
                                        <div className="border-t border-gray-200 pt-3 sm:pt-4">
                                            <h3 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wide">Additional Information</h3>
                                            {registrationData.commonDetails?.medical_details && (
                                                <div className="mb-3">
                                                    <span className="text-gray-600 text-xs sm:text-sm">Medical Details:</span>
                                                    <p className="text-sm sm:text-base text-gray-900 mt-1 break-words">{registrationData.commonDetails.medical_details}</p>
                                                </div>
                                            )}
                                            {registrationData.commonDetails?.special_request && (
                                                <div>
                                                    <span className="text-gray-600 text-xs sm:text-sm">Special Requests:</span>
                                                    <p className="text-sm sm:text-base text-gray-900 mt-1 break-words">{registrationData.commonDetails.special_request}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Travelers List */}
                            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                                    <Users className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-orange-500" />
                                    Traveler Details ({registrationData.traveler_count})
                                </h2>

                                <div className="space-y-4">
                                    {registrationData.travelers?.map((traveler, index) => (
                                        <div key={index} className="border border-gray-200 rounded-xl p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="font-bold text-gray-900 flex items-center">
                                                    <span className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm mr-2">
                                                        {index + 1}
                                                    </span>
                                                    {traveler.full_name}
                                                </h3>
                                                {traveler.train_preference && (
                                                    <span className={`text-xs font-semibold px-2 py-1 rounded ${traveler.train_preference === 'ac'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-green-100 text-green-700'
                                                        }`}>
                                                        {traveler.train_preference === 'ac' ? 'AC' : 'Non-AC'}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div>
                                                    <span className="text-gray-600">Age:</span>
                                                    <span className="ml-2 font-semibold text-gray-900">{traveler.age} yrs</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-600">Gender:</span>
                                                    <span className="ml-2 font-semibold text-gray-900 capitalize">{traveler.gender}</span>
                                                </div>
                                                <div className="col-span-2">
                                                    <span className="text-gray-600">Contact:</span>
                                                    <span className="ml-2 font-semibold text-gray-900">{traveler.contact_number}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={handleBackToEdit}
                                    className="mt-4 sm:mt-6 w-full py-2.5 sm:py-3 border-2 border-orange-500 text-orange-500 rounded-xl font-semibold hover:bg-orange-50 transition flex items-center justify-center text-sm sm:text-base"
                                >
                                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    Edit Information
                                </button>
                            </div>
                        </div>

                        {/* Right Column - Payment */}
                        <div className="space-y-4 sm:space-y-6" id="payment-section">
                            {/* Payment QR Card */}
                            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                                    <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-orange-500" />
                                    Payment Information
                                </h2>

                                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                                    <div className="text-center mb-3 sm:mb-4">
                                        <p className="text-sm sm:text-base text-gray-700 font-semibold mb-2">Partial Payment Amount</p>
                                        <div className="text-2xl sm:text-3xl font-bold text-orange-600">
                                            ₹{registrationData.total_amount?.toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                                        <h3 className="text-sm sm:text-base font-semibold text-yellow-900 mb-2 flex items-center">
                                            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-600" />
                                            Important Payment Information
                                        </h3>
                                        <ul className="text-xs sm:text-sm text-yellow-800 space-y-1 list-disc list-inside">
                                            <li>This is a <span className="font-bold">partial payment</span> to secure your booking</li>
                                            <li>The remaining amount will be collected prior to the trip</li>
                                            <li>Full payment of the remaining amount is required to confirm your booking</li>
                                            <li>You will receive payment reminders via WhatsApp and email</li>
                                            <li>For any payment queries, contact us at +91 6260499299</li>
                                        </ul>
                                    </div>

                                    {/* QR Code Section */}
                                    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-lg">
                                        <div className="text-center mb-4 sm:mb-6">
                                            <h3 className="text-base sm:text-lg font-bold text-slate-900">Scan QR Code to Pay</h3>
                                            <p className="text-xs sm:text-sm text-slate-500 mt-1">Use any UPI app to complete payment</p>
                                        </div>

                                        {/* QR Code Container */}
                                        <div className="relative">
                                            {/* Decorative corner brackets */}
                                            <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-6 h-6 sm:w-8 sm:h-8 border-l-4 border-t-4 border-orange-500 rounded-tl-lg"></div>
                                            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 border-r-4 border-t-4 border-orange-500 rounded-tr-lg"></div>
                                            <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-6 h-6 sm:w-8 sm:h-8 border-l-4 border-b-4 border-orange-500 rounded-bl-lg"></div>
                                            <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 border-r-4 border-b-4 border-orange-500 rounded-br-lg"></div>

                                            <div className="w-64 h-64 sm:w-72 sm:h-72 mx-auto bg-gradient-to-br from-slate-50 to-white rounded-xl sm:rounded-2xl flex items-center justify-center border-2 border-slate-200 shadow-inner">
                                                {/* Subtle background pattern */}
                                                <div className="absolute inset-0 opacity-5" style={{
                                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`
                                                }}></div>

                                                {qrImage ? (
                                                    <div className="w-full h-full flex items-center justify-center p-4">
                                                        <img
                                                            src={qrImage}
                                                            alt="Secure Payment QR Code"
                                                            className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg"
                                                        />
                                                    </div>
                                                ) : qrError ? (
                                                    <div className="text-center px-4 sm:px-6 flex flex-col items-center justify-center h-full">
                                                        <div className="bg-red-50 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                                                            <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                                                        </div>
                                                        <p className="text-sm sm:text-base text-red-600 font-semibold mb-1">Unable to load QR code</p>
                                                        <p className="text-xs sm:text-sm text-slate-500">{qrError}</p>
                                                        <button
                                                            type="button"
                                                            onClick={() => window.location.reload()}
                                                            className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors"
                                                        >
                                                            Retry
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="text-center flex flex-col items-center justify-center h-full">
                                                        <div className="relative mb-3 sm:mb-4">
                                                            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-slate-200 border-t-orange-500 mx-auto"></div>
                                                            <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                                        </div>
                                                        <p className="text-xs sm:text-sm font-semibold text-slate-700">Generating secure QR code...</p>
                                                        <p className="text-xs text-slate-500 mt-1">This may take a moment</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Download QR Button - MOVED OUTSIDE the decorative corners container */}
                                        {qrImage && (
                                            <button
                                                type="button"
                                                onClick={handleDownloadQR}
                                                className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-orange-600 transition shadow-md hover:shadow-lg"
                                            >
                                                <QrCode className="w-4 h-4 sm:w-5 sm:h-5" />
                                                Download QR Code
                                            </button>
                                        )}
                                    </div>

                                    <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-2 text-base sm:text-lg text-gray-600">
                                        <p className="flex items-center justify-center text-sm sm:text-base">
                                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2" />
                                            UPI ID: 6260499299@okbizaxis
                                        </p>
                                    </div>
                                </div>

                                {/* Payment Instructions */}
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                                    <h3 className="text-sm sm:text-base font-semibold text-blue-900 mb-2 flex items-center">
                                        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                        Payment Instructions
                                    </h3>
                                    <ol className="text-xs sm:text-sm text-blue-800 space-y-1 list-decimal list-inside">
                                        <li>Scan the QR code using any UPI app</li>
                                        <li>Complete the payment of ₹{registrationData.total_amount?.toLocaleString()}</li>
                                        <li>Take a screenshot of payment confirmation</li>
                                        <li>Upload the screenshot below</li>
                                    </ol>
                                </div>

                                {/* Screenshot Upload */}
                                <div>
                                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                                        Upload Payment Screenshot <span className="text-red-500">*</span>
                                    </label>
                                    <div className={`border-2 border-dashed ${error ? 'border-red-500' : 'border-gray-300'} rounded-xl p-4 sm:p-6 text-center hover:border-orange-500 transition`}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleScreenshotChange}
                                            className="hidden"
                                            id="screenshot-upload"
                                        />
                                        <label htmlFor="screenshot-upload" className="cursor-pointer">
                                            {screenshotPreview ? (
                                                <div className="space-y-2 sm:space-y-3">
                                                    <img src={screenshotPreview} alt="Payment Screenshot" className="max-h-40 sm:max-h-48 mx-auto rounded-lg shadow-md" />
                                                    <p className="text-xs sm:text-sm text-green-600 font-medium flex items-center justify-center">
                                                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                                        Screenshot uploaded successfully
                                                    </p>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            document.getElementById('screenshot-upload').click();
                                                        }}
                                                        className="text-orange-500 text-xs sm:text-sm hover:underline"
                                                    >
                                                        Change screenshot
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="space-y-2 sm:space-y-3">
                                                    <Upload className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-gray-400" />
                                                    <div>
                                                        <p className="text-sm sm:text-base text-gray-600 font-medium">Click to upload payment screenshot</p>
                                                        <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                                                    </div>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                    {error && <p className="text-red-500 text-xs sm:text-sm mt-2 flex items-center">
                                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                        {error}
                                    </p>}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl transform transition-all duration-300 flex items-center justify-center ${isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:shadow-2xl hover:-translate-y-1'
                                    } text-white`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white mr-2 sm:mr-3"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                                        Complete Registration
                                    </>
                                )}
                            </button>

                            {/* Security Note */}
                            <div className="bg-gray-50 rounded-xl p-3 sm:p-4 text-center">
                                <p className="text-xs text-gray-600">
                                    🔒 Your payment is secure. You will receive a confirmation email after payment verification.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}