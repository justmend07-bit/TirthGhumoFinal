'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Download, Upload, CheckCircle, Clock, User, MapPin,
    Calendar, IndianRupee, Phone, Mail, X, AlertCircle
} from 'lucide-react';

const PaymentPage = () => {
    const router = useRouter();

    const [registrationData, setRegistrationData] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const [paymentScreenshot, setPaymentScreenshot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const Backend =
        process.env.NEXT_PUBLIC_BACKEND_URL + '/vr-darshan/booking';

    /* ---------------- LOAD FROM LOCAL STORAGE ---------------- */

    useEffect(() => {
        const stored = localStorage.getItem('vrDarshanRegistration');

        if (!stored) {
            setError('Registration data not found. Please start again.');
            setLoading(false);
            return;
        }

        try {
            const parsed = JSON.parse(stored);
            console.log('Loaded registration data:', parsed);
            setRegistrationData(parsed);
            // Use payment_qr_url from the stored data
            setQrCode(parsed.payment_qr_url);
            setLoading(false);
        } catch (err) {
            setError('Invalid registration data. Please start again.');
            setLoading(false);
        }
    }, []);

    


    /* ---------------- SCREENSHOT UPLOAD ---------------- */

    const handleScreenshotUpload = (file) => {
        if (!file) {
            setError('Please select a file');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setError('File size should be less than 10MB');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setPaymentScreenshot(reader.result);
            setError('');
        };
        reader.onerror = () => {
            setError('Failed to read file');
        };
        reader.readAsDataURL(file);
    };

    /* ---------------- DOWNLOAD QR ---------------- */

    const downloadQR = () => {
        if (!qrCode) {
            setError('QR code not available');
            return;
        }

        const link = document.createElement('a');
        link.href = qrCode;
        link.download = 'VR-Darshan-QR.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    /* ---------------- SUBMIT FINAL DATA ---------------- */

    const handleSubmitPayment = async () => {
        if (!paymentScreenshot) {
            setError('Please upload payment screenshot');
            return;
        }

        if (!registrationData) {
            setError('Registration data not found');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const formData = new FormData();

            // 1. Append scalar fields with exact backend field names
            formData.append('contact_number', registrationData.contactNumber);
            formData.append('whatsapp_number', registrationData.whatsappNumber);
            formData.append('email_address', registrationData.email);
            formData.append('spiritual_place', registrationData.place);

            // 2. Format date as YYYY-MM-DD (backend expects this format)
            const formattedDate = new Date(registrationData.selectedDate)
                .toISOString()
                .split('T')[0];
            formData.append('preferred_date', formattedDate);

            formData.append('time_slot', registrationData.selectedTime);
            formData.append('special_request', registrationData.specialRequest || '');

            // 3. Prepare devotees array (only metadata, no images)
            const devoteesMetadata = registrationData.devotees.map(devotee => ({
                full_name: devotee.name,
                age: devotee.age,
                gender: devotee.gender,
                address: devotee.address || registrationData.address
            }));

            // 4. Send devotees as JSON string (backend expects Form field with JSON)
            formData.append('devotees', JSON.stringify(devoteesMetadata));

            // 5. Convert base64 Aadhaar images back to File objects
            // CRITICAL: Must match devotees array order exactly
            for (let i = 0; i < registrationData.devotees.length; i++) {
                const devotee = registrationData.devotees[i];

                // Convert base64/data URL to Blob, then to File
                const base64Data = devotee.aadharImage;
                const response = await fetch(base64Data);
                const blob = await response.blob();

                // Create File with meaningful name (backend reads as UploadFile)
                const aadharFile = new File(
                    [blob],
                    `aadhar_${i + 1}_${devotee.name.replace(/\s+/g, '_')}.jpg`,
                    { type: 'image/jpeg' }
                );

                // Append to FormData - backend expects field name 'aadhar_images' (plural)
                formData.append('aadhar_images', aadharFile);
            }

            // 6. Convert payment screenshot to File
            const paymentResponse = await fetch(paymentScreenshot);
            const paymentBlob = await paymentResponse.blob();
            const paymentFile = new File(
                [paymentBlob],
                'payment_screenshot.jpg',
                { type: 'image/jpeg' }
            );
            formData.append('payment_screenshot', paymentFile);

            // 7. Submit to backend (NO Content-Type header - browser sets it with boundary)
            console.log('Submitting payment data...');
            const apiResponse = await fetch(Backend, {
                method: 'POST',
                body: formData,
                // Do NOT set Content-Type - let browser handle multipart/form-data boundary
            });

            console.log('API Response status:', apiResponse.status);

            if (!apiResponse.ok) {
                const errorData = await apiResponse.json().catch(() => null);
                console.error('API Error:', errorData);
                throw new Error(errorData?.message || `Server error: ${apiResponse.status}`);
            }

            const result = await apiResponse.json();
            console.log('Payment submission successful:', result);

            // Show success message
            setShowSuccess(true);

            // Clear localStorage
            localStorage.removeItem('vrDarshanRegistration');

            // Redirect to success page after 2 seconds
            // setTimeout(() => {
            //     router.push('/VR');
            // }, 15000);

        } catch (err) {
            console.error('Payment submission error:', err);
            setError(err.message || 'Failed to submit payment. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto mb-4"></div>
                    <p className="text-slate-600 font-medium">Loading payment details...</p>
                </div>
            </div>
        );
    }

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">Registration Done!</h2>
                    <p className="text-slate-600 mb-6">
                        After payment verification, a confirmation email will be sent to you.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-red-700 transition-all shadow-lg"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    if (!registrationData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">Error</h2>
                    <p className="text-slate-600 mb-6">{error}</p>
                    <button
                        onClick={() => router.push('/VR')}
                        className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700"
                    >
                        Back to Registration
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-3 sm:p-4 lg:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
                    <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 sm:p-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">
                            Complete Your Payment
                        </h1>
                    </div>

                    {/* Timer/Status Bar */}
                    <div className="bg-yellow-50 border-b-2 border-yellow-200 px-4 py-3 flex items-center justify-center gap-2">
                        <Clock className="w-5 h-5 text-yellow-700" />
                        <span className="text-sm font-medium text-yellow-800">
                            Please complete payment within 30 minutes
                        </span>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Left Column - Registration Summary */}
                    <div className="space-y-4">
                        {/* Booking Summary */}
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-orange-600" />
                                Booking Summary
                            </h2>

                            <div className="space-y-3">
                                {/* Darshan Details */}
                                <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                                    <div className="flex items-start gap-2 mb-2">
                                        <MapPin className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-slate-600 font-medium">Spiritual Place</p>
                                            <p className="text-sm font-semibold text-slate-800">{registrationData.place}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Calendar className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-slate-600 font-medium">Date & Time</p>
                                            <p className="text-sm font-semibold text-slate-800">
                                                {new Date(registrationData.selectedDate).toLocaleDateString('en-IN', {
                                                    weekday: 'short',
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })} • {registrationData.selectedTime}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Devotees List */}
                                <div className="border border-slate-200 rounded-lg p-3">
                                    <p className="text-xs font-semibold text-slate-600 mb-2 uppercase">
                                        Devotees ({registrationData.devotees.length})
                                    </p>
                                    <div className="space-y-2">
                                        {registrationData.devotees.map((devotee, idx) => {
                                            const age = parseInt(devotee.age);
                                            const isFree = age >= 60 || devotee.disability;

                                            return (
                                                <div key={idx} className="flex items-center justify-between text-sm bg-slate-50 rounded px-2 py-1.5">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-bold text-orange-600">
                                                            {idx + 1}
                                                        </div>
                                                        <span className="font-medium text-slate-800">{devotee.name}</span>
                                                        <span className="text-xs text-slate-500">({devotee.age}y, {devotee.gender})</span>
                                                    </div>
                                                    {isFree && (
                                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">
                                                            FREE
                                                        </span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="border border-slate-200 rounded-lg p-3 space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone className="w-4 h-4 text-slate-500" />
                                        <span className="text-slate-700">{registrationData.contactNumber}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Mail className="w-4 h-4 text-slate-500" />
                                        <span className="text-slate-700 truncate">{registrationData.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Amount Breakdown */}
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <IndianRupee className="w-5 h-5 text-orange-600" />
                                Payment Details
                            </h2>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-slate-600">Chargeable Devotees ({registrationData.charges.chargeableDevotees})</span>
                                    <span className="font-medium text-slate-800">₹{registrationData.charges.chargeableDevotees * 39}</span>
                                </div>

                                {registrationData.charges.freeDevotees > 0 && (
                                    <div className="flex justify-between items-center py-2 text-green-700">
                                        <span>Free (Senior/Disabled) ({registrationData.charges.freeDevotees})</span>
                                        <span className="font-medium">₹0</span>
                                    </div>
                                )}

                                <div className="border-t-2 border-slate-200 pt-3 mt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-slate-800">Total Amount</span>
                                        <span className="text-2xl font-bold text-orange-600">₹{registrationData.totalAmount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Payment QR & Upload */}
                    <div className="space-y-4">
                        {/* QR Code Section - Paytm Style */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            {/* Paytm-style Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 text-center">
                                <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                                    </svg>
                                    Scan & Pay
                                </h2>
                                <p className="text-blue-50 text-sm mt-1">Using any UPI app</p>
                            </div>

                            {/* QR Code Container */}
                            {qrCode ? (
                                <div className="p-6">
                                    {/* Paytm-style QR Box */}
                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 mb-4 border-2 border-blue-200 shadow-inner">
                                        {/* Amount Display */}
                                        <div className="text-center mb-4">
                                            <p className="text-sm text-slate-600 font-medium mb-1">Pay Amount</p>
                                            <div className="flex items-center justify-center gap-1">
                                                <IndianRupee className="w-7 h-7 text-blue-600" />
                                                <span className="text-4xl font-bold text-slate-800">{registrationData.totalAmount}</span>
                                            </div>
                                        </div>

                                        {/* QR Code */}
                                        <div className="bg-white rounded-xl p-5 shadow-lg border-4 border-white relative mx-auto" style={{ width: 'fit-content' }}>
                                            {/* Corner Decorations */}
                                            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-blue-500 rounded-tl-lg"></div>
                                            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-blue-500 rounded-tr-lg"></div>
                                            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-blue-500 rounded-bl-lg"></div>
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-blue-500 rounded-br-lg"></div>

                                            <img
                                                src={qrCode}
                                                alt="Payment QR Code"
                                                className="w-48 h-48 sm:w-56 sm:h-56"
                                            />
                                        </div>

                                        {/* UPI ID Section */}
                                        <div className="mt-4 text-center">
                                            <p className="text-xs text-slate-500 font-medium mb-2">UPI ID</p>
                                            <div className="bg-white rounded-lg px-4 py-3 shadow-md border border-blue-200 inline-block">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                    </svg>
                                                    <p className="font-mono font-bold text-slate-800 text-sm sm:text-base tracking-wide">
                                                        6260499299@okbizaxis
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Payment Badges */}
                                        <div className="flex items-center justify-center gap-3 mt-4">
                                            <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                <span className="text-xs font-semibold text-slate-700">Secure</span>
                                            </div>
                                            <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm">
                                                <svg className="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                                </svg>
                                                <span className="text-xs font-semibold text-slate-700">Verified</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Supported Apps */}
                                    {/* <div className="mb-4">
                                        <p className="text-xs text-center text-slate-500 font-medium mb-3">Supported UPI Apps</p>
                                        <div className="flex items-center justify-center gap-4 flex-wrap">
                                            {['Paytm', 'PhonePe', 'GPay', 'BHIM'].map((app) => (
                                                <div key={app} className="flex flex-col items-center">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center shadow-sm border border-blue-200">
                                                        <span className="text-xs font-bold text-blue-700">{app.slice(0, 2)}</span>
                                                    </div>
                                                    <span className="text-xs text-slate-600 mt-1 font-medium">{app}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div> */}

                                    {/* Download Button */}
                                    <button
                                        onClick={downloadQR}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg mb-4"
                                    >
                                        <Download className="w-5 h-5" />
                                        Download QR Code
                                    </button>

                                    {/* Payment Instructions */}
                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4 text-sm">
                                        <div className="flex items-start gap-2 mb-3">
                                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-blue-900 mb-2">How to Pay:</p>
                                                <ol className="space-y-2 text-blue-800">
                                                    <li className="flex items-start gap-2">
                                                        <span className="font-bold min-w-[20px]">1.</span>
                                                        <span>Open any UPI app (Paytm, PhonePe, GPay, etc.)</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="font-bold min-w-[20px]">2.</span>
                                                        <span>Scan the QR code above</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="font-bold min-w-[20px]">3.</span>
                                                        <span>Enter amount ₹{registrationData.totalAmount} and complete payment</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="font-bold min-w-[20px]">4.</span>
                                                        <span>Take screenshot of payment success</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="font-bold min-w-[20px]">5.</span>
                                                        <span>Upload screenshot below to confirm</span>
                                                    </li>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6">
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                                        <p className="text-red-700 font-medium">QR Code not available</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Upload Screenshot Section */}
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                            <h2 className="text-xl font-bold text-slate-800 mb-4">
                                Upload Payment Proof *
                            </h2>

                            {!paymentScreenshot ? (
                                <label className="flex flex-col items-center justify-center border-3 border-dashed border-orange-300 rounded-xl p-8 cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all">
                                    <Upload className="w-12 h-12 text-orange-500 mb-3" />
                                    <p className="text-sm font-semibold text-slate-700 mb-1">Upload Screenshot</p>
                                    <p className="text-xs text-slate-500 text-center">PNG, JPG up to 10MB</p>
                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg,image/jpg"
                                        onChange={(e) => e.target.files?.[0] && handleScreenshotUpload(e.target.files[0])}
                                        className="hidden"
                                    />
                                </label>
                            ) : (
                                <div className="space-y-3">
                                    <div className="relative border-2 border-green-300 rounded-lg overflow-hidden">
                                        <img
                                            src={paymentScreenshot}
                                            alt="Payment Screenshot"
                                            className="w-full h-auto"
                                        />
                                        <button
                                            onClick={() => setPaymentScreenshot(null)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-700 bg-green-50 rounded-lg p-3">
                                        <CheckCircle className="w-5 h-5" />
                                        <span className="text-sm font-medium">Screenshot uploaded successfully</span>
                                    </div>
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmitPayment}
                                disabled={!paymentScreenshot || submitting}
                                className={`w-full mt-6 px-6 py-4 rounded-lg font-bold text-lg transition-all transform ${!paymentScreenshot || submitting
                                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:scale-105 shadow-lg'
                                    }`}
                            >
                                {submitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Submitting...
                                    </span>
                                ) : (
                                    'Confirm Payment'
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-4 bg-white rounded-xl shadow-lg p-4 text-center text-sm text-slate-600">
                    <p>
                        ⚠️ Your booking will be confirmed after payment verification.
                        You will receive confirmation via email within 24 hours.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;