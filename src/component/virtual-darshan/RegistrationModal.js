'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X, Upload, Trash2 } from 'lucide-react';

/* ------------------ CONSTANTS ------------------ */

const CHARGE_PER_PERSON = 39;

const spiritualPlaces = {
  "Jyotirlingas": [
    "SHRI NAGESHWAR JYOTIRLINGA",
    "SHRI BHIMASHANKAR",
    "OMKARESHWAR",
    "SHRI TRIMBAKESHWAR MANDIR",
    "SHRI BHOJESHWAR MANDIR"
  ],
  "Shakti Peethas/Devi Temples": [
    "SHRI GADKALIKA MATA",
    "MAA SHARDA DEVI",
    "MAA HARSIDDHI DEVI SHAKTIPEETH",
    "MAA BAGLAMUKHI",
    "MAHALAXMI KOLHAPUR",
    "AMBAJI TEMPLE",
    "BHADRAKALI SHAKTIPEETH",
    "CHAMUNDA DEVI",
    "ANNAPOORNA MATA MANDIR"
  ],
  "Char Dham & Pilgrimage Circuits": [
    "CHAR DHAM PART-1",
    "CHAR DHAM PART-2 (GANGOTRI)",
    "CHAR DHAM PART-3 (KEDARNATH)",
    "CHAR DHAM PART-4",
    "YAMUNOTRI",
    "BADRINATH"
  ],
};

/* ------------------ COMPONENT ------------------ */

/* ------------------ COMPONENT ------------------ */

export default function DevoteeRegistration() {
  const router = useRouter();

  const PriceBackend =
    process.env.NEXT_PUBLIC_BACKEND_URL + '/vr-darshan/price';

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});


  const [devotees, setDevotees] = useState([
    { id: 1, name: '', age: '', gender: '', aadhar: '', aadharImage: null, disability: false }
  ]);

  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [place, setPlace] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [showTnC, setShowTnC] = useState(false);

  /* ------------------ HELPERS ------------------ */

  const addDevotee = () => {
    setDevotees([
      ...devotees,
      { id: Date.now(), name: '', age: '', gender: '', aadhar: '', aadharImage: null, disability: false }
    ]);
  };

  const removeDevotee = (id) => {
    if (devotees.length > 1) {
      setDevotees(devotees.filter(d => d.id !== id));
    }
  };

  const updateDevotee = (id, field, value) => {
    setDevotees(devotees.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const handleImageUpload = (id, file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('File size should be less than 10MB');
      return;
    }
    updateDevotee(id, 'aadharImage', file);
  };

  /* ------------------ CHARGES ------------------ */

  const calculateCharges = () => {
    let chargeableDevotees = 0;
    let freeDevotees = 0;
    let peopleBelow60 = 0;

    devotees.forEach(d => {
      const age = parseInt(d.age);
      if (age < 60) peopleBelow60++;

      if (age >= 60 || d.disability) {
        freeDevotees++;
      } else {
        chargeableDevotees++;
      }
    });

    return {
      chargeableDevotees,
      freeDevotees,
      peopleBelow60,
      totalCharge: chargeableDevotees * CHARGE_PER_PERSON
    };
  };

  const charges = calculateCharges();

  /* ------------------ API CALLS ------------------ */

  const sendPeopleBelow60 = async (count) => {
    const res = await fetch(
      `${PriceBackend}?number_of_persons=${count}`,
      { method: 'GET' }
    );

    if (!res.ok) throw new Error('Price API failed');
    const data = await res.json();
    return data;
  };

  const scrollToError = (field) => {
    const el = document.getElementById(field);
    if (el) {
      el.scrollIntoView({ behaviour: 'smooth', block: 'center' });
      el.focus();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    devotees.forEach((d, index) => {
      if (!d.name) newErrors[`name-${d.id}`] = 'Name is required';
      if (!d.age) newErrors[`age-${d.id}`] = 'Age is required';
      if (!d.gender) newErrors[`gender-${d.id}`] = 'Gender is required';
      if (!d.aadhar || d.aadhar.length !== 12)
        newErrors[`aadhar-${d.id}`] = 'Valid 12-digit Aadhaar is required';
      if (!d.aadharImage)
        newErrors[`aadharImage-${d.id}`] = 'Aadhaar image is required';
    });

    if (!contactNumber) newErrors.contactNumber = 'Contact number is required';
    if (!whatsappNumber) newErrors.whatsappNumber = 'WhatsApp number is required';
    if (!address) newErrors.address = 'Address is required';
    if (!email) newErrors.email = 'Email is required';
    if (!category) newErrors.category = 'Category is required';
    if (!place) newErrors.place = 'Spiritual place is required';
    if (!selectedDate) newErrors.selectedDate = 'Date is required';
    if (!selectedTime) newErrors.selectedTime = 'Time slot is required';

    setErrors(newErrors);

    const firstErrorKey = Object.keys(newErrors)[0];
    if (firstErrorKey) scrollToError(firstErrorKey);

    return Object.keys(newErrors).length === 0;
  }

  /* ------------------ SUBMIT ------------------ */

  const handleProceedToPay = async () => {
    if (!validateForm()) return;
    try {
      setSubmitting(true);

      // Send ONLY people below 60 and get QR code from response
      const priceResponse = await sendPeopleBelow60(charges.peopleBelow60);
      const payment_qr_url = priceResponse.payment_qr_url;

      //Save everything locally
      localStorage.setItem(
        'vrDarshanRegistration',
        JSON.stringify({
          place,
          selectedDate,
          selectedTime,
          contactNumber,
          whatsappNumber,
          email,
          address,
          devotees,
          charges,
          totalAmount: charges.totalCharge,
          payment_qr_url,
          specialRequest,
        })
      );

      if (typeof window !== "undefined") {
        sessionStorage.setItem('vrDarshanStep', 'payment');
      }
      //Redirect
      router.push('/VR/payment');

    } catch (err) {
      console.error(err);
      alert('Failed to proceed to payment');
    } finally {
      setSubmitting(false);
    }
  };


  /* ------------------ SLOT HELPERS ------------------ */

  // Weekend check (Saturday = 6, Sunday = 0)
  const isWeekend = (dateString) => {
    if (!dateString) return false;
    const day = new Date(dateString).getDay();
    return day === 0 || day === 6;
  };
  const isWeekendSelected = isWeekend(selectedDate);


  // Slot booking check (TEMP: nothing is booked)
  const isSlotBooked = (date, timeSlot) => {
    return false;
  };

  // Slot selection
  const handleTimeSlotClick = (timeSlot) => {
    if (!isWeekendSelected) return;
    setSelectedTime(timeSlot);
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-2 sm:p-4">
      {/* Terms and Conditions Modal */}
      {showTnC && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-slate-800">Terms & Conditions</h2>
              <button
                onClick={() => setShowTnC(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4 text-slate-700">
  <div>
    <h3 className="font-semibold text-lg mb-2">1. Registration & Darshan</h3>
    <p>• Registration fee is ₹39 per person per darshan.</p>
    <p>
      • Only the first darshan for senior citizens (60+ years) and persons with
      disabilities will be free of registration charges.
    </p>
  </div>

  <div>
    <h3 className="font-semibold text-lg mb-2">2. Payment Policy</h3>
    <p>• Payment is non-refundable once the registration is confirmed.</p>
  </div>

  <div>
    <h3 className="font-semibold text-lg mb-2">3. Booking & Cancellation</h3>
    <p>• Time slots are subject to availability on a first-come, first-served basis.</p>
    <p>• Cancellations after registration are not allowed.</p>
    <p>• No-shows will not be eligible for refunds or rescheduling.</p>
  </div>

  <div>
    <h3 className="font-semibold text-lg mb-2">4. Saarthi (Guide) Arrangements</h3>
    <p>
      • Travel and accommodation expenses of the assigned Saarthi (guide) will be
      borne by the devotee/user.
    </p>
  </div>

  <div>
    <h3 className="font-semibold text-lg mb-2">5. General Terms</h3>
    <p>
      • Management reserves the right to modify or cancel bookings in case of
      unforeseen circumstances.
    </p>
  </div>
</div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowTnC(false)}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">
            Devotee Registration Form
          </h1>
        </div>

        <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
          {/* Devotee Details */}
          <div className="bg-slate-50 p-3 sm:p-5 rounded-lg border-2 border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                Devotee Details
              </h2>
              <button
                onClick={addDevotee}
                className="flex items-center gap-1 px-3 py-1.5 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
            <div className="border-b-2 border-orange-400 mb-4"></div>

            <div className="space-y-4">
              {devotees.map((devotee, index) => (
                <div
                  key={devotee.id}
                  className="bg-white p-3 sm:p-4 rounded-lg border border-slate-300"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-slate-600">
                      Devotee {index + 1}
                    </span>
                    {devotees.length > 1 && (
                      <button
                        onClick={() => removeDevotee(devotee.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {/* ===== DESKTOP (TIGHT GRID) ===== */}
                  <div className="hidden lg:grid lg:grid-cols-12 gap-3">
                    {/* Full Name */}
                    <div className="col-span-3">
                      <label className="block text-sm font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        id={`name-${devotee.id}`}
                        type="text"
                        value={devotee.name}
                        onChange={(e) =>
                          updateDevotee(devotee.id, 'name', e.target.value)
                        }
                        className={`w-full px-3 py-1.5 border rounded focus:ring-2 ${errors[`name-${devotee.id}`] ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-orange-500'}`}
                        placeholder="Full name"
                      />

                      {errors[`name-${devotee.id}`] && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors[`name-${devotee.id}`]}
                        </p>
                      )}
                    </div>

                    {/* Age (tight) */}
                    <div className="col-span-1">
                      <label className="block text-sm font-semibold text-slate-700 mb-1">
                        Age *
                      </label>
                      <input
                        id={`age-${devotee.id}`}
                        type="number"
                        value={devotee.age}
                        onChange={(e) =>
                          updateDevotee(devotee.id, 'age', e.target.value)
                        }
                        className={`w-full px-3 py-1.5 border rounded focus:ring-2 ${errors[`age-${devotee.id}`] ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-orange-500'}`}
                        min="1"
                        max="120"
                      />
                      {errors[`age-${devotee.id}`] && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors[`age-${devotee.id}`]}
                        </p>
                      )}
                    </div>

                    {/* Gender */}
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-1">
                        Gender *
                      </label>
                      <select
                        id={`gender-${devotee.id}`}
                        value={devotee.gender}
                        onChange={(e) =>
                          updateDevotee(devotee.id, 'gender', e.target.value)
                        }
                        className={`w-full px-3 py-1.5 border rounded focus:ring-2 ${errors[`gender-${devotee.id}`]
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-slate-300 focus:ring-orange-500'
                          }`}
                      >
                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                      {errors[`gender-${devotee.id}`] && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors[`gender-${devotee.id}`]}
                        </p>
                      )}

                    </div>

                    {/* Aadhaar Number (wider) */}
                    <div className="col-span-3">
                      <label className="block text-sm font-semibold text-slate-700 mb-1">
                        Aadhaar Number *
                      </label>
                      <input
                        type="text"
                        id={`aadhar-${devotee.id}`}
                        value={devotee.aadhar}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 12)
                          updateDevotee(devotee.id, 'aadhar', value)
                        }}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-orange-500"
                        placeholder="12 digits"
                        maxLength="12"
                      />
                      {errors[`aadhar-${devotee.id}`] && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors[`aadhar-${devotee.id}`]}
                        </p>
                      )}
                    </div>

                    {/* Aadhaar Image (compact) */}
                    <div className="col-span-3">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Aadhaar Image *
                      </label>

                      {devotee.aadharImage ? (
                        <div

                          className="flex items-center justify-between px-3 py-2 border-2 rounded border-green-600 bg-green-50">
                          <span className="text-sm font-semibold text-green-700">
                            Aadhaar image uploaded ✔
                          </span>
                          <button

                            onClick={() => updateDevotee(devotee.id, 'aadharImage', null)}
                            className="text-red-600 hover:text-red-800 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      ) : (
                        <label className="flex items-center justify-center px-2 py-1.5 border-2 border-dashed border-slate-300 rounded cursor-pointer hover:border-orange-500 text-xs">
                          <Upload className="w-4 h-4 mr-1 text-slate-500" />
                          Upload
                          <input
                            type="file"
                            id={`aadharImage-${devotee.id}`}
                            accept="image/png,image/jpeg"
                            onChange={(e) =>
                              e.target.files?.[0] &&
                              handleImageUpload(devotee.id, e.target.files[0])
                            }
                            className="hidden"
                          />

                        </label>


                      )}
                      {errors[`aadharImage-${devotee.id}`] && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors[`aadharImage-${devotee.id}`]}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ===== MOBILE / TABLET ===== */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:hidden">
                    {/* Full Name */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={devotee.name}
                        onChange={(e) =>
                          updateDevotee(devotee.id, 'name', e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded focus:ring-2 ${errors[`name-${devotee.id}`]
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-slate-300 focus:ring-orange-500'
                          }`}
                      />

                      {errors[`name-${devotee.id}`] && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors[`name-${devotee.id}`]}
                        </p>
                      )}

                    </div>

                    {/* Age */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">
                        Age *
                      </label>
                      <input
                        type="number"
                        value={devotee.age}
                        onChange={(e) =>
                          updateDevotee(devotee.id, 'age', e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded focus:ring-2 ${errors[`age-${devotee.id}`]
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-slate-300 focus:ring-orange-500'
                          }`}
                      />

                      {errors[`age-${devotee.id}`] && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors[`age-${devotee.id}`]}
                        </p>
                      )}

                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">
                        Gender *
                      </label>
                      <select
                        value={devotee.gender}
                        onChange={(e) =>
                          updateDevotee(devotee.id, 'gender', e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded focus:ring-2 ${errors[`gender-${devotee.id}`]
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-slate-300 focus:ring-orange-500'
                          }`}
                      >

                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                      {errors[`gender-${devotee.id}`] && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors[`gender-${devotee.id}`]}
                        </p>
                      )}

                    </div>

                    {/* Aadhaar Number */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-1">
                        Aadhaar Number *
                      </label>
                      <input
                        type="text"
                        value={devotee.aadhar}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 12)
                          updateDevotee(devotee.id, 'aadhar', value)
                        }}
                        className={`w-full px-3 py-2 border rounded focus:ring-2 ${errors[`aadhar-${devotee.id}`]
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-slate-300 focus:ring-orange-500'
                          }`}
                      />

                      {errors[`aadhar-${devotee.id}`] && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors[`aadhar-${devotee.id}`]}
                        </p>
                      )}

                    </div>

                    {/* Aadhaar Image */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-1">
                        Aadhaar Image *
                      </label>
                      <label
                        className={`flex items-center justify-center px-3 py-2 border-2 border-dashed rounded cursor-pointer ${errors[`aadharImage-${devotee.id}`]
                          ? 'border-red-500 bg-red-50'
                          : 'border-slate-300 hover:border-orange-500'
                          }`}
                      >

                        <Upload className="w-4 h-4 mr-2 text-slate-500" />
                        Upload
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            e.target.files?.[0] &&
                            handleImageUpload(devotee.id, e.target.files[0])
                          }
                        />
                      </label>
                      {errors[`aadharImage-${devotee.id}`] && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors[`aadharImage-${devotee.id}`]}
                        </p>
                      )}

                    </div>
                  </div>

                  {/* Disability */}
                  <div className="mt-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={devotee.disability}
                        onChange={(e) =>
                          updateDevotee(devotee.id, 'disability', e.target.checked)
                        }
                        className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                      />
                      Person with Disability (Free Access)
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>



          {/* CONTACT + DARSHAN WRAPPER */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            {/* ================= CONTACT DETAILS ================= */}
            <div className="bg-slate-50 p-3 sm:p-5 rounded-lg border-2 border-slate-200">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
                Contact Details
              </h2>
              <div className="border-b-2 border-orange-400 mb-4"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Contact Number */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    id="contactNumber"
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setContactNumber(value);
                    }}
                    className={`w-full px-3 py-2 border rounded focus:ring-2
            ${errors.contactNumber
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-300 focus:ring-orange-500'}
          `}
                    placeholder="Enter contact number"
                    maxLength="10"
                  />
                  {errors.contactNumber && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.contactNumber}
                    </p>
                  )}
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    WhatsApp Number *
                  </label>
                  <input
                    id="whatsappNumber"
                    type="tel"
                    value={whatsappNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setWhatsappNumber(value);
                    }}
                    className={`w-full px-3 py-2 border rounded focus:ring-2
            ${errors.whatsappNumber
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-300 focus:ring-orange-500'}
          `}
                    placeholder="Enter WhatsApp number"
                    maxLength="10"
                  />
                  {errors.whatsappNumber && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.whatsappNumber}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows="3"
                    className={`w-full px-3 py-2 border rounded focus:ring-2
            ${errors.address
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-300 focus:ring-orange-500'}
          `}
                    placeholder="Enter your complete address"
                  />
                  {errors.address && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email ID *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-3 py-2 border rounded focus:ring-2
            ${errors.email
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-300 focus:ring-orange-500'}
          `}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ================= DARSHAN DETAILS ================= */}
            <div className="bg-slate-50 p-3 sm:p-5 rounded-lg border-2 border-slate-200">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
                Darshan Details
              </h2>
              <div className="border-b-2 border-orange-400 mb-4"></div>

              <div className="space-y-4">

                {/* Category + Place */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                        setPlace('');
                      }}
                      className={`w-full px-3 py-2 border rounded focus:ring-2
              ${errors.category
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-slate-300 focus:ring-orange-500'}
            `}
                    >
                      <option value="">-- Select Category --</option>
                      {Object.keys(spiritualPlaces).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Spiritual Place *
                    </label>
                    <select
                      id="place"
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                      disabled={!category}
                      className={`w-full px-3 py-2 border rounded focus:ring-2
              ${errors.place
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-slate-300 focus:ring-orange-500'}
            `}
                    >
                      <option value="">Select spiritual destination</option>
                      {category &&
                        spiritualPlaces[category].map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                    {errors.place && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.place}
                      </p>
                    )}
                  </div>
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      id="selectedDate"
                      type="date"
                      value={selectedDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                        const date = e.target.value;
                        if (isWeekend(date)) {
                          setSelectedDate(date);
                          setSelectedTime('');
                        } else {
                          e.target.value = '';
                        }
                      }}
                      className={`w-full px-3 py-2 border rounded focus:ring-2
              ${errors.selectedDate
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-slate-300 focus:ring-orange-500'}
            `}
                    />
                    {errors.selectedDate && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.selectedDate}
                      </p>
                    )}
                  </div>

                  <div id="selectedTime">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Time Slot *
                    </label>
                    <div
                      className={`grid grid-cols-2 gap-3 p-2 rounded${errors.selectedTime ? 'border-2 border-red-500' : ''}`}
                    >
                      {['6-7 PM', '8-9 PM'].map((timeSlot) => {
                        const isDisabled = !isWeekendSelected;
                        const isSelected = selectedTime === timeSlot;

                        return (
                          <button
                            key={timeSlot}
                            type="button"
                            disabled={isDisabled}
                            onClick={() => handleTimeSlotClick(timeSlot)}
                            className={`px-4 py-2 rounded text-sm font-medium transition-all
                                ${isSelected
                                ? 'bg-orange-600 text-white'
                                : isDisabled
                                  ? `
                                        bg-gray-200 text-gray-400 border-2 border-gray-300
                                        cursor-not-allowed opacity-70
                                      `
                                  : `
                                        bg-white text-slate-800 border-2 border-slate-300
                                        hover:bg-orange-50 hover:border-orange-400
                                        cursor-pointer
                                        dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600
                                        dark:hover:bg-slate-700
                                      `
                              }`}
                          >
                            {timeSlot}
                          </button>
                        );
                      })}

                    </div>

                    {errors.selectedTime && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.selectedTime}
                      </p>
                    )}
                    {!isWeekendSelected && (
                      <p className="text-xs text-red-400 dark:text-slate-500 mt-1">
                        Time slots are available only on weekends (Saturday & Sunday)
                      </p>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Charges Summary and Submit */}
          <div className="space-y-4">
            {/* Charges Summary */}
            {devotees.length > 0 && devotees[0].age && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-black mb-2">Charges Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-black">
                    <span>Chargeable Devotees ({charges.chargeableDevotees}):</span>
                    <span className="font-semibold">₹{charges.chargeableDevotees * CHARGE_PER_PERSON}</span>
                  </div>
                  {charges.freeDevotees > 0 && (
                    <div className="flex justify-between text-green-700">
                      <span>Free (Senior/Disabled) ({charges.freeDevotees}):</span>
                      <span className="font-semibold">₹0</span>
                    </div>
                  )}
                  <div className="border-t-2 border-blue-300 pt-2 mt-2 flex justify-between text-base text-black">
                    <span className="font-bold">Total Amount:</span>
                    <span className="font-bold text-lg">₹{charges.totalCharge}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="text-center text-sm text-slate-600">
              By proceeding, you agree to our{' '}
              <button
                onClick={() => setShowTnC(true)}
                className="text-orange-600 hover:text-orange-700 font-semibold underline"
              >
                Terms & Conditions
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={handleProceedToPay}
                disabled={submitting}
                className={`w-full sm:w-auto px-8 sm:px-10 py-3 font-semibold rounded-lg shadow-lg transition-all
        ${submitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 transform hover:scale-105'
                  }`}
              >
                {submitting
                  ? 'Processing...'
                  : `Proceed to Pay ${charges.totalCharge > 0 ? `₹${charges.totalCharge}` : '(Free)'}`}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

