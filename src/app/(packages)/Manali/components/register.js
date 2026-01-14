"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { Users, Phone, Mail, Heart, CheckCircle, AlertCircle, Upload, User, X, ChevronDown, ChevronUp, Building } from "lucide-react";
import Image from 'next/image';

export default function RegistrationPage() {
    const router = useRouter();
    // Pricing
    const [totalAmount, setTotalAmount] = useState(null);
    const [isLoadingPrice, setIsLoadingPrice] = useState(true);

    const [showCustomInput, setShowCustomInput] = useState(false);
    const BackendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

    // Add this with other useState declarations at the top
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Traveler count (at the very top)
    const [travelerCount, setTravelerCount] = useState(1);

    // Individual traveler data
    const [travelers, setTravelers] = useState([
        {
            traveler_number: 1,
            full_name: "",
            age: "",
            gender: "",
            contact_number: "",
            train_preference: "non-ac",
            isExpanded: true
        }
    ]);

    // Common details (LEFT SIDE - FILLED ONCE)
    const [commonDetails, setCommonDetails] = useState({
        primary_mobile: "",
        email: "",
        whatsapp_number: "",
        sameAsPhone: true,
        emergency_contact: "",
        medical_details: "",
        special_request: "",
        institute_name: "",
        identifier: "",
        proof_id_type: "aadhar",
        id_number: "",
        id_image: null,
        id_preview: null
    });

    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [errors, setErrors] = useState({});

    // Function to calculate pricing based on current state
    const calculatePricing = useCallback(async () => {
        try {
            setIsLoadingPrice(true);

            const acCount = travelers.filter(t => t.train_preference === 'ac').length;
            const sleeperCount = travelers.filter(t => t.train_preference === 'non-ac').length;

            const response = await fetch(`${BackendURL}/manali/price?sleeper=${sleeperCount}&ac=${acCount}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch pricing');
            }

            const data = await response.json();
            // console.log('Received pricing data:', data);

            // Set total amount directly from backend
            if (data.amount) {
                setTotalAmount(data.amount);
                // console.log('Total amount:', data.amount);
            }

        } catch (error) {
            console.error('Failed to fetch pricing:', error);
            // Fallback pricing logic
            // const acCount = travelers.filter(t => t.train_preference === 'ac').length;
            // const sleeperCount = travelers.filter(t => t.train_preference === 'non-ac').length;

            // const totalFallback = (acCount * 6000) + (sleeperCount * 5000);
            // setTotalAmount(totalFallback);
        } finally {
            setIsLoadingPrice(false);
        }
    }, [travelers, BackendURL]);

    // Fetch pricing on mount and when dependencies change
    useEffect(() => {
        calculatePricing();
    }, [travelers.length, travelers.map(t => t.train_preference).join(',')]);

    // Load saved data (for edit functionality)
    // Replace the existing load saved data useEffect
    useEffect(() => {
        const savedData = sessionStorage.getItem('manaliRegistration');
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                setTravelerCount(parsedData.traveler_count || 1);
                setTravelers(parsedData.travelers || [
                    {
                        traveler_number: 1,
                        full_name: "",
                        age: "",
                        gender: "",
                        contact_number: "",
                        train_preference: "non-ac",
                        isExpanded: true
                    }
                ]);
                setCommonDetails(parsedData.commonDetails || {
                    primary_mobile: "",
                    email: "",
                    whatsapp_number: "",
                    sameAsPhone: true,
                    emergency_contact: "",
                    medical_details: "",
                    special_request: "",
                    institute_name: "",
                    identifier: "",
                    proof_id_type: "aadhar",
                    id_number: "",
                    id_image: null,
                    id_preview: null
                });
                setAgreeToTerms(parsedData.agree_to_terms || false);
            } catch (error) {
                console.error('Error loading saved data:', error);
            }
        }
    }, []); // FIXED: Empty dependency array for one-time load

    // Auto-save to sessionStorage
    // Replace the existing auto-save useEffect
    useEffect(() => {
        const saveTimer = setTimeout(() => {
            const dataToSave = {
                traveler_count: travelerCount,
                travelers: travelers.map(t => {
                    const { aadhar_preview, ...rest } = t;
                    return rest;
                }),
                commonDetails: {
                    ...commonDetails,
                    id_preview: null // Don't save preview
                },
                agree_to_terms: agreeToTerms
            };
            sessionStorage.setItem('manaliRegistration', JSON.stringify(dataToSave));
        }, 2000); // FIXED: Increased debounce to 2 seconds for better performance

        return () => clearTimeout(saveTimer);
    }, [travelerCount, travelers, commonDetails, agreeToTerms]);

    // Handle traveler count change
    const handleTravelerCountChange = (count) => {
        const newCount = parseInt(count);
        setTravelerCount(newCount);

        const newTravelers = [...travelers];

        if (newCount > travelers.length) {
            // Add new travelers with default non-AC preference
            for (let i = travelers.length; i < newCount; i++) {
                newTravelers.push({
                    traveler_number: i + 1,
                    full_name: "",
                    age: "",
                    gender: "",
                    contact_number: "",
                    train_preference: "non-ac",
                    isExpanded: true
                });
            }
        } else if (newCount < travelers.length) {
            // Remove extra travelers
            newTravelers.splice(newCount);
        }

        setTravelers(newTravelers);
    };

    // Update individual traveler - with pricing refresh
    const updateTraveler = (index, field, value) => {
        const newTravelers = [...travelers];
        newTravelers[index][field] = value;
        setTravelers(newTravelers);

        // Clear error for this field
        if (errors[`traveler_${index}_${field}`]) {
            const newErrors = { ...errors };
            delete newErrors[`traveler_${index}_${field}`];
            setErrors(newErrors);
        }

        // If train preference changed, recalculate pricing
        if (field === 'train_preference') {
            calculatePricing();
        }
        // Don't recalculate on isExpanded change
    };

    // Toggle traveler card expansion
    const toggleTravelerExpansion = (index) => {
        const newTravelers = [...travelers];
        newTravelers[index].isExpanded = !newTravelers[index].isExpanded;
        setTravelers(newTravelers);
    };

    // Replace the existing handleCommonIdUpload function
    const handleCommonIdUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                alert('Please upload a valid image file (JPG, PNG, GIF, or WebP)');
                e.target.value = ''; // Reset input
                return;
            }

            // Validate file size
            if (file.size > 5 * 1024 * 1024) {
                alert('File size should be less than 5MB');
                e.target.value = ''; // Reset input
                return;
            }

            setCommonDetails(prev => ({ ...prev, id_image: file }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setCommonDetails(prev => ({ ...prev, id_preview: reader.result }));
            };
            reader.onerror = () => {
                alert('Failed to read file. Please try again.');
                setCommonDetails(prev => ({ ...prev, id_image: null, id_preview: null }));
            };
            reader.readAsDataURL(file);

            // FIXED: Clear any existing errors
            if (errors.id_image) {
                const newErrors = { ...errors };
                delete newErrors.id_image;
                setErrors(newErrors);
            }
        }
    };

    // Add remove handler that also clears errors
    const handleRemoveCommonId = () => {
        setCommonDetails(prev => ({ ...prev, id_image: null, id_preview: null }));
        if (errors.id_image) {
            const newErrors = { ...errors };
            delete newErrors.id_image;
            setErrors(newErrors);
        }
    };

    // Update common details
    const updateCommonDetails = (field, value) => {
        setCommonDetails(prev => {
            const updated = { ...prev, [field]: value };

            // Auto-fill WhatsApp if checkbox is checked
            if (field === 'primary_mobile' && prev.sameAsPhone) {
                updated.whatsapp_number = value;
            }

            return updated;
        });

        // Clear error
        if (errors[field]) {
            const newErrors = { ...errors };
            delete newErrors[field];
            setErrors(newErrors);
        }
    };

    // Handle sameAsPhone checkbox
    const handleSameAsPhoneChange = (checked) => {
        setCommonDetails(prev => ({
            ...prev,
            sameAsPhone: checked,
            whatsapp_number: checked ? prev.primary_mobile : prev.whatsapp_number
        }));
    };

    // Validation
    const validateForm = () => {
        const newErrors = {};

        // Validate each traveler
        travelers.forEach((traveler, index) => {
            if (!traveler.full_name.trim()) {
                newErrors[`traveler_${index}_full_name`] = "Name is required";
            } else if (traveler.full_name.trim().length < 3) {
                newErrors[`traveler_${index}_full_name`] = "Name must be at least 3 characters";
            }

            if (!traveler.age) {
                newErrors[`traveler_${index}_age`] = "Age is required";
            } else if (traveler.age < 10 || traveler.age > 100) {
                newErrors[`traveler_${index}_age`] = "Age must be between 10 and 100";
            }

            if (!traveler.gender) {
                newErrors[`traveler_${index}_gender`] = "Gender is required";
            }

            if (!traveler.contact_number) {
                newErrors[`traveler_${index}_contact_number`] = "Contact number is required";
            } else if (!/^\d{10}$/.test(traveler.contact_number)) {
                newErrors[`traveler_${index}_contact_number`] = "Contact must be 10 digits";
            }

        });

        // Validate common details
        if (!commonDetails.primary_mobile) {
            newErrors.primary_mobile = "Primary mobile is required";
        } else if (!/^\d{10}$/.test(commonDetails.primary_mobile)) {
            newErrors.primary_mobile = "Mobile must be 10 digits";
        }

        if (!commonDetails.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(commonDetails.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!commonDetails.whatsapp_number) {
            newErrors.whatsapp = "WhatsApp number is required";
        } else if (!/^\d{10}$/.test(commonDetails.whatsapp_number)) {
            newErrors.whatsapp = "WhatsApp must be 10 digits";
        }

        if (!commonDetails.emergency_contact) {
            newErrors.emergency = "Emergency contact is required";
        } else if (!/^\d{10}$/.test(commonDetails.emergency_contact)) {
            newErrors.emergency = "Emergency contact must be 10 digits";
        }

        if (!agreeToTerms) {
            newErrors.terms = "You must agree to terms and conditions";
        }
        // if (commonDetails.id_number && commonDetails.id_number.trim()) {
        //     // If ID number is provided, validate based on type
        //     if (commonDetails.proof_id_type === 'aadhar') {
        //         if (!/^\d{12}$/.test(commonDetails.id_number.replace(/\s/g, ''))) {
        //             newErrors.id_number = "Aadhar must be 12 digits";
        //         }
        //     } else if (commonDetails.proof_id_type === 'passport') {
        //         if (!/^[A-Z]{1}[0-9]{7}$/.test(commonDetails.id_number.toUpperCase())) {
        //             newErrors.id_number = "Invalid passport format";
        //         }
        //     }
        //     // Add more validation as needed
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle submit
    // Replace the existing handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // SET LOADING STATE
        setIsSubmitting(true);

        try {
            // Final pricing verification before submission
            setIsLoadingPrice(true);
            await calculatePricing();

            // Wait for state to update
            await new Promise(resolve => setTimeout(resolve, 500));

            // Recalculate to ensure we have the latest price
            const acCount = travelers.filter(t => t.train_preference === 'ac').length;
            const sleeperCount = travelers.filter(t => t.train_preference === 'non-ac').length;

            let finalAmount = totalAmount;

            // Fetch one more time to ensure we have the latest price
            try {
                const response = await fetch(`${BackendURL}/manali/price?sleeper=${sleeperCount}&ac=${acCount}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.amount) {
                        finalAmount = data.amount;
                        setTotalAmount(data.amount);
                    }
                }
            } catch (error) {
                console.error('Final price check failed', error);
            }

            // Prepare booking data
            const bookingData = {
                traveler_count: travelerCount,
                travelers: travelers.map(t => {
                    const { isExpanded, ...rest } = t;
                    return rest;
                }),
                commonDetails: {
                    ...commonDetails,
                    id_image: null
                },
                agree_to_terms: agreeToTerms,
                total_amount: finalAmount,
                timestamp: new Date().toISOString()
            };

            // Save to sessionStorage
            const storageData = {
                ...bookingData,
                commonDetails: {
                    ...bookingData.commonDetails,
                    id_preview: null
                }
            };

            sessionStorage.setItem('manaliRegistration', JSON.stringify(storageData));

            // Save step to localStorage
            if (typeof window !== "undefined") {
                localStorage.setItem("manaliRegistrationStep", "payment");
            }

            // Navigate to payment page
            router.push("/Manali/payment");

        } catch (err) {
            console.error('Submit error:', err);
            alert("Failed to proceed to payment. Please try again.");
            setIsSubmitting(false); // RESET LOADING ON ERROR
        } finally {
            setIsLoadingPrice(false);
        }
    };




    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
            {/* Navbar */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6  flex items-center justify-between">
                    <Image
                        src="/logo.png"
                        alt="Tirth Ghumo Logo"
                        width={40}
                        height={40}
                        className="rounded-lg transition-transform duration-300 hover:scale-105 mt-2
                                       w-52 sm:w-58 md:w-30 lg:w-30 xl:w-55 h-auto object-contain "
                    />
                    <button
                        onClick={() => window.location.href = '/Manali'}
                        className="text-gray-600 hover:text-orange-500 transition text-sm font-medium"
                    >
                        ← Back to Home
                    </button>
                </div>
            </nav>

            <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                            Register for <span className="text-orange-500">Manali Trip 2026</span>
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600">
                            Fill in traveler details to secure your spots on this amazing adventure
                        </p>
                    </div>

                    <form className="space-y-6">
                        {/* NUMBER OF TRAVELERS SECTION - AT THE TOP */}
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8">
                            <div className="flex items-center mb-6">
                                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500 mr-3" />
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Number of Travelers
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 items-start">
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-800">
                                        How many people are traveling? <span className="text-red-500">*</span>
                                    </label>

                                    {/* Show select for 1-4 options */}
                                    {!showCustomInput && (
                                        <select
                                            value={travelerCount}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value);
                                                if (value === 5) {
                                                    // "More than 4" selected, show input
                                                    setShowCustomInput(true);
                                                    setTravelerCount(5);
                                                } else {
                                                    handleTravelerCountChange(value);
                                                }
                                            }}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base sm:text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        >
                                            {[...Array(4)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1} {i === 0 ? 'Traveler' : 'Travelers'}
                                                </option>
                                            ))}
                                            <option value={5}>More than 4 travelers</option>
                                        </select>
                                    )}

                                    {/* Show input when custom input mode is active */}
                                    {showCustomInput && (
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3">
                                                <input
                                                    type="text"
                                                    value={travelerCount}
                                                    onChange={(e) => {
                                                        const value = e.target.value;

                                                        // Allow empty input for backspace
                                                        if (value === '') {
                                                            setTravelerCount('');
                                                            return;
                                                        }

                                                        // Only allow numbers
                                                        if (!/^\d+$/.test(value)) {
                                                            return;
                                                        }

                                                        const numValue = parseInt(value);

                                                        // Update with any number up to 50
                                                        if (!isNaN(numValue) && numValue <= 50) {
                                                            setTravelerCount(numValue);
                                                        }
                                                    }}
                                                    onBlur={(e) => {
                                                        // On blur, ensure we have a valid value
                                                        const value = e.target.value;
                                                        if (value === '' || parseInt(value) < 5) {
                                                            setTravelerCount(5);
                                                            handleTravelerCountChange(5);
                                                        } else {
                                                            handleTravelerCountChange(parseInt(value));
                                                        }
                                                    }}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base sm:text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                    placeholder="Enter number of travelers"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setShowCustomInput(false);
                                                        handleTravelerCountChange(1);
                                                    }}
                                                    className="px-4 py-3 text-black border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition whitespace-nowrap"
                                                >
                                                    Back to 1-4
                                                </button>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                Enter number between 5 and 50
                                            </p>
                                        </div>
                                    )}
                                </div>


                                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
                                    {/* <div className="space-y-3">
                                        <div className="flex justify-between items-center text-xl sm:text-2xl font-bold text-orange-600">
                                            <span>Total Payment:</span>
                                            <span>
                                                {isLoadingPrice ? (
                                                    <span className="inline-block w-24 h-8 bg-orange-300 animate-pulse rounded"></span>
                                                ) : (
                                                    `₹${totalAmount?.toLocaleString()}`
                                                )}
                                            </span>
                                            
                                        </div>
                                    </div> */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-xl sm:text-2xl font-bold text-orange-600">
                                            <span>Partial Payment:</span>
                                            <span>
                                                {isLoadingPrice ? (
                                                    <span className="inline-block w-24 h-8 bg-orange-300 animate-pulse rounded"></span>
                                                ) : (
                                                    `₹${totalAmount?.toLocaleString()}`
                                                )}
                                            </span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* TWO-COLUMN LAYOUT FOR DESKTOP */}
                        <div className="lg:grid lg:grid-cols-3 gap-8">
                            {/* LEFT COLUMN - COMMON FIELDS (FILLED ONCE) */}
                            <div className="lg:col-span-1 space-y-6">
                                {/* COMMON CONTACT DETAILS */}
                                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8">
                                    <div className="flex items-center mb-6">
                                        <Phone className="w-6 h-6 text-orange-500 mr-3" />
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                            Common Details
                                        </h2>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-6">
                                        These details will be used for all communications
                                    </p>

                                    <div className="space-y-6">
                                        {/* Primary Mobile */}
                                        <div>
                                            <label className="block text-sm font-bold mb-2 text-gray-800">
                                                Primary Mobile Number <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                value={commonDetails.primary_mobile}
                                                onChange={(e) => updateCommonDetails('primary_mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                                                className={`w-full px-4 py-3 border ${errors.primary_mobile ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500`}
                                                placeholder="10-digit mobile"
                                                maxLength="10"
                                            />
                                            {errors.primary_mobile && (
                                                <p className="text-red-500 text-xs mt-1 flex items-center">
                                                    <AlertCircle className="w-3 h-3 mr-1" />
                                                    {errors.primary_mobile}
                                                </p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-bold mb-2 text-gray-800">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                value={commonDetails.email}
                                                onChange={(e) => updateCommonDetails('email', e.target.value)}
                                                className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500`}
                                                placeholder="your@email.com"
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-xs mt-1 flex items-center">
                                                    <AlertCircle className="w-3 h-3 mr-1" />
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        {/* WhatsApp */}
                                        <div>
                                            <label className="block text-sm font-bold mb-2 text-gray-800">
                                                WhatsApp Number <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                value={commonDetails.whatsapp_number}
                                                onChange={(e) => updateCommonDetails('whatsapp_number', e.target.value.replace(/\D/g, '').slice(0, 10))}
                                                disabled={commonDetails.sameAsPhone}
                                                className={`w-full px-4 py-3 border ${errors.whatsapp ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500 ${commonDetails.sameAsPhone ? 'bg-gray-100 cursor-not-allowed text-gray-600' : ''
                                                    }`}
                                                placeholder="10-digit WhatsApp"
                                                maxLength="10"
                                            />
                                            <label className="flex items-center mt-2 text-sm cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={commonDetails.sameAsPhone}
                                                    onChange={(e) => handleSameAsPhoneChange(e.target.checked)}
                                                    className="w-4 h-4 mr-2 text-orange-500 rounded focus:ring-orange-500"
                                                />
                                                <span className="text-gray-700">Same as primary mobile</span>
                                            </label>
                                            {errors.whatsapp && (
                                                <p className="text-red-500 text-xs mt-1 flex items-center">
                                                    <AlertCircle className="w-3 h-3 mr-1" />
                                                    {errors.whatsapp}
                                                </p>
                                            )}
                                        </div>

                                        {/* Emergency Contact */}
                                        <div>
                                            <label className="block text-sm font-bold mb-2 text-gray-800">
                                                Emergency Contact Number <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                value={commonDetails.emergency_contact}
                                                onChange={(e) => updateCommonDetails('emergency_contact', e.target.value.replace(/\D/g, '').slice(0, 10))}
                                                className={`w-full px-4 py-3 border ${errors.emergency ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500`}
                                                placeholder="10-digit emergency contact"
                                                maxLength="10"
                                            />
                                            {errors.emergency && (
                                                <p className="text-red-500 text-xs mt-1 flex items-center">
                                                    <AlertCircle className="w-3 h-3 mr-1" />
                                                    {errors.emergency}
                                                </p>
                                            )}
                                        </div>

                                        {/* Institute Name (Optional) */}
                                        <div>
                                            <label className="block text-sm font-bold mb-2 text-gray-800">
                                                Institute/College Name (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                value={commonDetails.institute_name}
                                                onChange={(e) => updateCommonDetails('institute_name', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500 text-gray-900 text-gray-900 placeholder-gray-500"
                                                placeholder="Your institute/college name"
                                            />
                                        </div>

                                        {/* Identifier */}
                                        {/* <div>
                                            <label className="block text-sm font-bold mb-2 text-gray-800">
                                                Identifier
                                            </label>
                                            <input
                                                type="text"
                                                value={commonDetails.identifier}
                                                onChange={(e) => updateCommonDetails('identifier', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500 text-gray-900 text-gray-900 placeholder-gray-500"
                                                placeholder="Any identifier/reference"
                                            />
                                        </div> */}

                                        {/* Proof ID Type */}
                                        <div>
                                            <label className="block text-sm font-bold mb-2 text-gray-800">
                                                Proof ID Type
                                            </label>
                                            <select
                                                value={commonDetails.proof_id_type}
                                                onChange={(e) => updateCommonDetails('proof_id_type', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500 text-gray-900 text-gray-900 placeholder-gray-500"
                                            >
                                                <option value="aadhar">Aadhar Card</option>
                                                <option value="passport">Passport</option>
                                                <option value="driver">Driver License</option>
                                                <option value="college">College ID</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        {/* ID Number */}
                                        <div>
                                            <label className="block text-sm font-bold mb-2 text-gray-800">
                                                ID Number(optional)
                                            </label>
                                            <input
                                                type="text"
                                                value={commonDetails.id_number}
                                                onChange={(e) => updateCommonDetails('id_number', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500 text-gray-900 text-gray-900 placeholder-gray-500"
                                                placeholder="ID number"
                                            />
                                        </div>

                                        {/* ID Image Upload */}
                                        <div>
                                            <label className="block text-sm font-bold mb-2 text-gray-800">
                                                ID Image (Optional)
                                            </label>
                                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-orange-500 transition">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleCommonIdUpload}
                                                    className="hidden"
                                                    id="common-id-upload"
                                                />
                                                <label htmlFor="common-id-upload" className="cursor-pointer">
                                                    {commonDetails.id_preview ? (
                                                        <div className="space-y-3">
                                                            <img
                                                                src={commonDetails.id_preview}
                                                                alt="ID Preview"
                                                                className="max-h-32 mx-auto rounded-lg shadow-md"
                                                            />
                                                            <p className="text-sm text-green-600 font-medium flex items-center justify-center">
                                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                                ID uploaded successfully
                                                            </p>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleRemoveCommonId();
                                                                }}
                                                                className="text-orange-500 text-sm hover:underline"
                                                            >
                                                                Remove & change
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-3">
                                                            <Upload className="w-10 h-10 mx-auto text-gray-400" />
                                                            <div>
                                                                <p className="text-sm text-gray-600 font-medium">
                                                                    Click to upload ID
                                                                </p>
                                                                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ADDITIONAL INFORMATION */}
                                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8">
                                    <div className="flex items-center mb-6">
                                        <Heart className="w-6 h-6 text-orange-500 mr-3" />
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                            Additional Information
                                        </h2>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-6">
                                        This information applies to the entire group (Optional)
                                    </p>

                                    <div className="space-y-6">
                                        {/* Medical Details */}
                                        <div>
                                            <label className="block text-sm font-bold mb-2 text-gray-800">
                                                Medical Details
                                            </label>
                                            <textarea
                                                value={commonDetails.medical_details}
                                                onChange={(e) => updateCommonDetails('medical_details', e.target.value)}
                                                rows="3"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500 text-gray-900 text-gray-900 placeholder-gray-500"
                                                placeholder="Any medical conditions, allergies, or medications we should know about..."
                                            />
                                        </div>

                                        {/* Special Requests */}
                                        <div>
                                            <label className="block text-sm font-bold mb-2 text-gray-800">
                                                Special Requests
                                            </label>
                                            <textarea
                                                value={commonDetails.special_request}
                                                onChange={(e) => updateCommonDetails('special_request', e.target.value)}
                                                rows="3"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500 text-gray-900 text-gray-900 placeholder-gray-500"
                                                placeholder="Dietary preferences, accessibility needs, room preferences..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT COLUMN - INDIVIDUAL TRAVELER CARDS */}
                            <div className="lg:col-span-2 space-y-6 mt-10 sm:mt-1">
                                <div className="flex items-center mb-2">
                                    <User className="w-6 h-6 text-orange-500 mr-2" />
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                        Traveler Information
                                    </h2>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">
                                    Please provide details for each traveler
                                </p>

                                {travelers.map((traveler, index) => (
                                    <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-orange-200 transition">
                                        {/* Card Header */}
                                        <div
                                            className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 flex items-center justify-between cursor-pointer"
                                            onClick={() => toggleTravelerExpansion(index)}
                                        >
                                            <div className="flex items-center text-white">
                                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                                                    <span className="font-bold text-lg">{index + 1}</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg">
                                                        Traveler {index + 1}
                                                        {index === 0 && " (Primary Contact)"}
                                                    </h3>
                                                    {traveler.full_name && !traveler.isExpanded && (
                                                        <p className="text-sm text-orange-100">
                                                            {traveler.full_name}, {traveler.age && `${traveler.age} yrs`} {traveler.gender && `• ${traveler.gender}`}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            {traveler.isExpanded ? (
                                                <ChevronUp className="w-6 h-6 text-white" />
                                            ) : (
                                                <ChevronDown className="w-6 h-6 text-white" />
                                            )}
                                        </div>

                                        {/* Card Content */}
                                        {traveler.isExpanded && (
                                            <div className="p-6">
                                                {/* DESKTOP: 2 rows for traveler details */}
                                                <div className="hidden md:block">
                                                    <div className="grid grid-cols-4 gap-4 mb-6">
                                                        {/* Full Name */}
                                                        <div className="col-span-2">
                                                            <label className="block text-sm font-bold mb-2 text-gray-800">
                                                                Full Name <span className="text-red-500">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={traveler.full_name}
                                                                onChange={(e) => updateTraveler(index, 'full_name', e.target.value)}
                                                                className={`w-full px-4 py-3 border ${errors[`traveler_${index}_full_name`] ? 'border-red-500' : 'border-gray-300'
                                                                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500`}
                                                                placeholder="Enter full name"
                                                            />
                                                            {errors[`traveler_${index}_full_name`] && (
                                                                <p className="text-red-500 text-xs mt-1 flex items-center">
                                                                    <AlertCircle className="w-3 h-3 mr-1" />
                                                                    {errors[`traveler_${index}_full_name`]}
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* Age */}
                                                        <div>
                                                            <label className="block text-sm font-bold mb-2 text-gray-800">
                                                                Age <span className="text-red-500">*</span>
                                                            </label>
                                                            <input
                                                                type="number"
                                                                value={traveler.age}
                                                                onChange={(e) => updateTraveler(index, 'age', e.target.value)}
                                                                className={`w-full px-4 py-3 border ${errors[`traveler_${index}_age`] ? 'border-red-500' : 'border-gray-300'
                                                                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500`}
                                                                min="10"
                                                                max="100"
                                                                placeholder="Age"
                                                            />
                                                            {errors[`traveler_${index}_age`] && (
                                                                <p className="text-red-500 text-xs mt-1 flex items-center">
                                                                    <AlertCircle className="w-3 h-3 mr-1" />
                                                                    {errors[`traveler_${index}_age`]}
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* Gender */}
                                                        <div>
                                                            <label className="block text-sm font-bold mb-2 text-gray-800">
                                                                Gender <span className="text-red-500">*</span>
                                                            </label>
                                                            <select
                                                                value={traveler.gender}
                                                                onChange={(e) => updateTraveler(index, 'gender', e.target.value)}
                                                                className={`w-full px-4 py-3 border ${errors[`traveler_${index}_gender`] ? 'border-red-500' : 'border-gray-300'
                                                                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500`}
                                                            >
                                                                <option value="">Select Gender</option>
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option>
                                                                <option value="other">Other</option>
                                                            </select>
                                                            {errors[`traveler_${index}_gender`] && (
                                                                <p className="text-red-500 text-xs mt-1 flex items-center">
                                                                    <AlertCircle className="w-3 h-3 mr-1" />
                                                                    {errors[`traveler_${index}_gender`]}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-4 gap-4">
                                                        {/* Contact Number */}
                                                        <div className="col-span-2">
                                                            <label className="block text-sm font-bold mb-2 text-gray-800">
                                                                Contact Number <span className="text-red-500">*</span>
                                                            </label>
                                                            <input
                                                                type="tel"
                                                                value={traveler.contact_number}
                                                                onChange={(e) => updateTraveler(index, 'contact_number', e.target.value.replace(/\D/g, '').slice(0, 10))}
                                                                className={`w-full px-4 py-3 border ${errors[`traveler_${index}_contact_number`] ? 'border-red-500' : 'border-gray-300'
                                                                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500`}
                                                                placeholder="10-digit mobile number"
                                                                maxLength="10"
                                                            />
                                                            {errors[`traveler_${index}_contact_number`] && (
                                                                <p className="text-red-500 text-xs mt-1 flex items-center">
                                                                    <AlertCircle className="w-3 h-3 mr-1" />
                                                                    {errors[`traveler_${index}_contact_number`]}
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* Train Preference */}
                                                        <div className="col-span-2">
                                                            <label className="block text-sm font-bold mb-2 text-gray-800">
                                                                Train Preference
                                                            </label>
                                                            <div className="flex items-center space-x-6 pt-2 text-black">
                                                                {[
                                                                    { value: 'ac', label: 'AC' },
                                                                    { value: 'non-ac', label: 'Non-AC' }
                                                                ].map(option => (
                                                                    <label key={option.value} className="flex items-center cursor-pointer">
                                                                        <input
                                                                            type="radio"
                                                                            name={`train_preference_${index}`}
                                                                            value={option.value}
                                                                            checked={traveler.train_preference === option.value}
                                                                            onChange={(e) => updateTraveler(index, 'train_preference', e.target.value)}
                                                                            className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                                                                        />
                                                                        <span className="ml-2 text-sm">{option.label}</span>
                                                                    </label>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* MOBILE: 3 rows for traveler details */}
                                                <div className="md:hidden space-y-4">
                                                    {/* Row 1: Name and Age */}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-bold mb-2 text-gray-800">
                                                                Full Name <span className="text-red-500">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={traveler.full_name}
                                                                onChange={(e) => updateTraveler(index, 'full_name', e.target.value)}
                                                                className={`w-full px-4 py-3 border ${errors[`traveler_${index}_full_name`] ? 'border-red-500' : 'border-gray-300'
                                                                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500`}
                                                                placeholder="Full name"
                                                            />
                                                            {errors[`traveler_${index}_full_name`] && (
                                                                <p className="text-red-500 text-xs mt-1">
                                                                    {errors[`traveler_${index}_full_name`]}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-bold mb-2 text-gray-800">
                                                                Age <span className="text-red-500">*</span>
                                                            </label>
                                                            <input
                                                                type="number"
                                                                value={traveler.age}
                                                                onChange={(e) => updateTraveler(index, 'age', e.target.value)}
                                                                className={`w-full px-4 py-3 border ${errors[`traveler_${index}_age`] ? 'border-red-500' : 'border-gray-300'
                                                                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500`}
                                                                min="10"
                                                                max="100"
                                                                placeholder="Age"
                                                            />
                                                            {errors[`traveler_${index}_age`] && (
                                                                <p className="text-red-500 text-xs mt-1">
                                                                    {errors[`traveler_${index}_age`]}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Row 2: Gender and Contact */}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-bold mb-2 text-gray-800">
                                                                Gender <span className="text-red-500">*</span>
                                                            </label>
                                                            <select
                                                                value={traveler.gender}
                                                                onChange={(e) => updateTraveler(index, 'gender', e.target.value)}
                                                                className={`w-full px-4 py-3 border ${errors[`traveler_${index}_gender`] ? 'border-red-500' : 'border-gray-300'
                                                                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500`}
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option>
                                                                <option value="other">Other</option>
                                                            </select>
                                                            {errors[`traveler_${index}_gender`] && (
                                                                <p className="text-red-500 text-xs mt-1">
                                                                    {errors[`traveler_${index}_gender`]}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-bold mb-2 text-gray-800">
                                                                Contact <span className="text-red-500">*</span>
                                                            </label>
                                                            <input
                                                                type="tel"
                                                                value={traveler.contact_number}
                                                                onChange={(e) => updateTraveler(index, 'contact_number', e.target.value.replace(/\D/g, '').slice(0, 10))}
                                                                className={`w-full px-4 py-3 border ${errors[`traveler_${index}_contact_number`] ? 'border-red-500' : 'border-gray-300'
                                                                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500`}
                                                                placeholder="10-digit"
                                                                maxLength="10"
                                                            />
                                                            {errors[`traveler_${index}_contact_number`] && (
                                                                <p className="text-red-500 text-xs mt-1">
                                                                    {errors[`traveler_${index}_contact_number`]}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Row 3: Train Preference */}
                                                    <div>
                                                        <label className="block text-sm font-bold mb-2 text-gray-800">
                                                            Train Preference
                                                        </label>
                                                        <div className="flex items-center space-x-6 text-black">
                                                            {[
                                                                { value: 'ac', label: 'AC' },
                                                                { value: 'non-ac', label: 'Non-AC' }
                                                            ].map(option => (
                                                                <label key={option.value} className="flex items-center cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        name={`train_preference_mobile_${index}`}
                                                                        value={option.value}
                                                                        checked={traveler.train_preference === option.value}
                                                                        onChange={(e) => updateTraveler(index, 'train_preference', e.target.value)}
                                                                        className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                                                                    />
                                                                    <span className="ml-2 text-sm">{option.label}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Aadhar Upload */}
                                                {/* <div className="mt-6">
                          <label className="block text-sm font-bold mb-2 text-gray-800">
                            Aadhar Card Upload (Optional)
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-orange-500 transition">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleAadharUpload(index, e)}
                              className="hidden"
                              id={`aadhar-upload-${index}`}
                            />
                            <label htmlFor={`aadhar-upload-${index}`} className="cursor-pointer">
                              {traveler.aadhar_preview ? (
                                <div className="space-y-3">
                                  <img
                                    src={traveler.aadhar_preview}
                                    alt="Aadhar Preview"
                                    className="max-h-40 mx-auto rounded-lg shadow-md"
                                  />
                                  <p className="text-sm text-green-600 font-medium flex items-center justify-center">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Aadhar uploaded successfully
                                  </p>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      updateTraveler(index, 'aadhar_image', null);
                                      updateTraveler(index, 'aadhar_preview', null);
                                    }}
                                    className="text-orange-500 text-sm hover:underline"
                                  >
                                    Remove & change
                                  </button>
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  <Upload className="w-12 h-12 mx-auto text-gray-400" />
                                  <div>
                                    <p className="text-base text-gray-600 font-medium">
                                      Click to upload Aadhar card
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                                  </div>
                                </div>
                              )}
                            </label>
                          </div>
                        </div> */}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* TERMS & CONDITIONS */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-start space-x-3">
                                <input
                                    type="checkbox"
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                    className="w-5 h-5 mt-1 text-orange-500 rounded focus:ring-orange-500"
                                />
                                <label className="text-sm text-gray-700">
                                    I agree to the terms and conditions and cancellation policy.
                                    All information provided is accurate and I understand that false information may result in booking cancellation. For consultation about any problem or refund policy contact at 6260499299. Also the refund is possible 21 days prior of the trip.
                                    <span className="text-red-500"> *</span>
                                </label>
                            </div>
                            {errors.terms && (
                                <p className="text-red-500 text-sm mt-2 flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    {errors.terms}
                                </p>
                            )}
                        </div>

                        {/* SUBMIT BUTTON */}
                        <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 -mx-4 sm:-mx-6 px-4 sm:px-6 py-4 sm:py-6 shadow-lg">
                            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4">
                                <button
                                    type="button"
                                    onClick={() => window.location.href = "/"}
                                    className="px-8 py-4 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition"
                                >
                                    ← Back
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className={`flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-6 h-6 mr-2" />
                                            Proceed to Pay ₹{totalAmount}
                                        </>
                                    )}
                                </button>

                            </div>
                        </div>

                        {/* INFO BOX */}
                        {/* <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-20 sm:mb-0">
                            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 flex items-center">
                                <AlertCircle className="w-5 h-5 mr-2 text-blue-500" />
                                Important Information
                            </h3>
                            <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
                                <li>• All fields marked with <span className="text-red-500">*</span> are mandatory</li>
                                <li>• Each traveler must provide their own contact number</li>
                                <li>• Aadhar card upload is optional but recommended for verification</li>
                                <li>• Institute/College name is optional</li>
                                <li>• Your form is auto-saved every few seconds</li>
                                <li>• You will receive booking confirmation within 24 hours after payment verification</li>
                                <li>• For queries, contact us at tirthghumo@gmail.com or +91 6260499299</li>
                            </ul>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    );
}