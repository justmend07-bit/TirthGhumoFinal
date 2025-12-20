'use client';
import React, { useState, useEffect } from 'react';
import {
  Download, Upload, CheckCircle, Clock, User, MapPin,
  Calendar, IndianRupee, Phone, Mail, X, AlertCircle
} from 'lucide-react';

const PaymentPage = () => {
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

    const parsed = JSON.parse(stored);
    setRegistrationData(parsed);
    setQrCode(parsed.qrCode);
    setLoading(false);
  }, []);

  /* ---------------- SCREENSHOT UPLOAD ---------------- */

  const handleScreenshotUpload = (file) => {
    if (!file || file.size > 10 * 1024 * 1024) {
      setError('File size should be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPaymentScreenshot(reader.result);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  /* ---------------- DOWNLOAD QR ---------------- */

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'VR-Darshan-QR.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ---------------- SUBMIT FINAL DATA ---------------- */

  const handleSubmitPayment = async () => {
    if (!paymentScreenshot || !registrationData) {
      setError('Missing payment or registration data');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const formData = new FormData();

      // registration data
      formData.append(
        'registrationData',
        JSON.stringify(registrationData)
      );

      // convert base64 screenshot → file
      const res = await fetch(paymentScreenshot);
      const blob = await res.blob();
      formData.append('paymentScreenshot', blob, 'payment.png');

      const response = await fetch(Backend, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Payment submission failed');
      }

      setShowSuccess(true);

      // cleanup
      localStorage.removeItem('vrDarshanRegistration');
    } catch (err) {
      console.error(err);
      setError('Failed to submit payment');
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
        useEffect(() => {
            return () => {
                localStorage.removeItem('vrDarshanRegistration');
                localStorage.removeItem('paymentSuccess');
            };
        }, []);

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-3 sm:p-4 lg:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
                    <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 sm:p-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">
                            Complete Your Payment
                        </h1>
                        <p className="text-orange-100 text-center mt-2 text-sm sm:text-base">
                            Order ID: <span className="font-semibold">{orderId}</span>
                        </p>
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
                                            <p className="text-sm font-semibold text-slate-800">{registrationData?.place}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Calendar className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-slate-600 font-medium">Date & Time</p>
                                            <p className="text-sm font-semibold text-slate-800">
                                                {new Date(registrationData?.date).toLocaleDateString('en-IN', {
                                                    weekday: 'short',
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })} • {registrationData?.timeSlot}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Devotees List */}
                                <div className="border border-slate-200 rounded-lg p-3">
                                    <p className="text-xs font-semibold text-slate-600 mb-2 uppercase">
                                        Devotees ({registrationData?.devotees.length})
                                    </p>
                                    <div className="space-y-2">
                                        {registrationData?.devotees.map((devotee, idx) => (
                                            <div key={idx} className="flex items-center justify-between text-sm bg-slate-50 rounded px-2 py-1.5">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-bold text-orange-600">
                                                        {idx + 1}
                                                    </div>
                                                    <span className="font-medium text-slate-800">{devotee.name}</span>
                                                    <span className="text-xs text-slate-500">({devotee.age}y, {devotee.gender})</span>
                                                </div>
                                                {devotee.isSeniorCitizen && (
                                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">
                                                        FREE
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="border border-slate-200 rounded-lg p-3 space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone className="w-4 h-4 text-slate-500" />
                                        <span className="text-slate-700">{registrationData?.contactNumber}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Mail className="w-4 h-4 text-slate-500" />
                                        <span className="text-slate-700 truncate">{registrationData?.email}</span>
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
                                    <span className="text-slate-600">Chargeable Devotees ({registrationData?.charges.chargeableDevotees})</span>
                                    <span className="font-medium text-slate-800">₹{registrationData?.charges.chargeableDevotees * 39}</span>
                                </div>

                                {registrationData?.charges.freeDevotees > 0 && (
                                    <div className="flex justify-between items-center py-2 text-green-700">
                                        <span>Free (Senior/Disabled) ({registrationData?.charges.freeDevotees})</span>
                                        <span className="font-medium">₹0</span>
                                    </div>
                                )}

                                <div className="border-t-2 border-slate-200 pt-3 mt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-slate-800">Total Amount</span>
                                        <span className="text-2xl font-bold text-orange-600">₹{amount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Payment QR & Upload */}
                    <div className="space-y-4">
                        {/* QR Code Section */}
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                            <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">
                                Scan & Pay
                            </h2>

                            {/* QR Code */}
                            <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-xl p-6 mb-4">
                                <div className="bg-white rounded-lg p-4 inline-block mx-auto shadow-lg" style={{ display: 'block', width: 'fit-content', margin: '0 auto' }}>
                                    <img
                                        src={qrCode}
                                        alt="Payment QR Code"
                                        className="w-48 h-48 sm:w-56 sm:h-56 mx-auto"
                                    />
                                </div>

                                {/* UPI ID */}
                                {/* <div className="mt-4 text-center">
                                    <p className="text-xs text-slate-600 font-medium mb-1">UPI ID</p>
                                    <div className="bg-white rounded-lg px-4 py-2 inline-block shadow">
                                        <p className="font-mono font-bold text-slate-800 text-sm sm:text-base">{upiId}</p>
                                    </div>
                                </div> */}
                            </div>

                            {/* Download Button */}
                            <button
                                onClick={downloadQR}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors mb-4"
                            >
                                <Download className="w-5 h-5" />
                                Download QR Code
                            </button>

                            {/* Payment Instructions */}
                            {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                                <p className="font-semibold text-blue-900 mb-2">Payment Instructions:</p>
                                <ol className="list-decimal list-inside space-y-1 text-blue-800">
                                    <li>Scan the QR code using any UPI app</li>
                                    <li>Or copy the UPI ID and make payment</li>
                                    <li>Complete the payment of ₹{amount}</li>
                                    <li>Take a screenshot of payment confirmation</li>
                                    <li>Upload the screenshot below</li>
                                </ol>
                            </div> */}
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
                        You will receive confirmation via email and SMS within 24 hours.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;