'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X, Calendar, Upload, Trash2 } from 'lucide-react';

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
  "Ramayana & Krishna Circuit": [
    "ORCHHA RAM VIVAH",
    "AYODHYA (DEEPOTSAV)",
    "RAAM MANDIR AYODHYA",
    "CHITRAKOOT",
    "BANKE BIHARI",
    "RADHA RAMAN JI TEMPLE",
    "SHREE GOPAL MANDIR"
  ],
  "Hanuman Temples": [
    "SHRI HANUMAN ART",
    "BADE HANUMAN JI"
  ],
  "Other Prominent Temples": [
    "SHRI CHINTAMAN GANESH MANDIR",
    "SHRI BHARTRIHARI GUFA",
    "SHRI BAGESHWAR DHAM",
    "GANPATI PULE",
    "SHRI KHADHARANA GANESH MANDIR",
    "SHRI CHHIND DHAM MANDIR",
    "SHRI MANGALNATH MANDIR",
    "SHRI KAALBHAIRAV"
  ],
  "Ashrams & Spiritual Sites": [
    "SHRI SANDIPANI ASHRAM",
    "RAMGHAT",
    "SPIRITUAL JOURNEY OF NARMADA"
  ],
  "Festivals & Events": [
    "MAHA KUMBH MELA 2025",
    "SHREE JAGANNATH RATH YATRA"
  ]
};



const DevoteeRegistration = () => {

  const Backend = process.env.NEXT_PUBLIC_BACKEND_URL + '/vr-darshan/booking';

  const [submitting, setSubmitting] = useState(false);

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

  const router = useRouter();

  const [bookedSlots, setBookedSlots] = useState({});
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (!selectedDate || !place) return;

    const fetchBookedSlots = async () => {
      try {
        setLoadingSlots(true);

        const res = await fetch(
          `/api/booked-slots?place=${place}&date=${selectedDate}`
        );

        if (!res.ok) throw new Error("Failed to fetch slots");

        const data = await res.json();
        setBookedSlots(data);
      } catch (err) {
        console.error("Error fetching booked slots:", err);
        setBookedSlots({});
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchBookedSlots();
  }, [selectedDate, place]);


  const CHARGE_PER_PERSON = 39; // ₹39 per person

  const addDevotee = () => {
    setDevotees([
      ...devotees,
      { id: Date.now(), name: '', age: '', gender: '', aadhar: '', aadharImage: null }
    ]);
  };

  const removeDevotee = (id) => {
    if (devotees.length > 1) {
      setDevotees(devotees.filter(d => d.id !== id));
    }
  };

  const updateDevotee = (id, field, value) => {
    setDevotees(devotees.map(d =>
      d.id === id ? { ...d, [field]: value } : d
    ));
  };

  const handleImageUpload = (id, file) => {
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File size should be less than 10MB');
      return;
    }

    // ✅ STORE FILE DIRECTLY
    updateDevotee(id, 'aadharImage', file);
  };


  const isWeekend = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isSlotBooked = (date, timeSlot) => {
    return bookedSlots[date]?.includes(timeSlot) || false;
  };

  const handleTimeSlotClick = (timeSlot) => {
    if (!selectedDate) {
      alert('Please select a date first');
      return;
    }
    if (isSlotBooked(selectedDate, timeSlot)) {
      return;
    }
    setSelectedTime(timeSlot);
  };

  // Calculate charges based on age and disability
  const calculateCharges = () => {
    let chargeableDevotees = 0;
    let freeDevotees = 0;

    devotees.forEach(devotee => {
      const age = parseInt(devotee.age);
      const isSenior = age >= 60;
      const isDisabled = devotee.disability;

      // Free if senior citizen (60+) OR disabled
      if (isSenior || isDisabled) {
        freeDevotees++;
      } else {
        chargeableDevotees++;
      }
    });

    return {
      chargeableDevotees,
      freeDevotees,
      totalCharge: chargeableDevotees * CHARGE_PER_PERSON
    };
  };

  const charges = calculateCharges();

  const checkSlotAvailability = async () => {
    const res = await fetch(
      `/api/booked-slots?place=${place}&date=${selectedDate}`
    );
    const data = await res.json();

    return !data[selectedDate]?.includes(selectedTime);
  };


  const handleSubmit = async () => {
  if (submitting) return;
  setSubmitting(true);

  try {
    // ---------- VALIDATION ----------
    for (const d of devotees) {
      if (!d.name || !d.age || !d.gender || !d.aadhar || !d.aadharImage) {
        alert('Fill all devotee details including Aadhar image');
        setSubmitting(false);
        return;
      }
    }

    if (!contactNumber || contactNumber.length !== 10) {
      alert('Invalid contact number');
      setSubmitting(false);
      return;
    }

    if (!email || !place || !selectedDate || !selectedTime) {
      alert('Missing required fields');
      setSubmitting(false);
      return;
    }

    // ---------- FORMDATA ----------
    const formData = new FormData();

    formData.append('contact_number', contactNumber);
    formData.append('whatsapp_number', whatsappNumber);
    formData.append('email_address', email);

    formData.append('spiritual_place', place);
    formData.append('preferred_date', selectedDate);
    formData.append('time_slot', selectedTime);
    formData.append('special_request', specialRequest || '');

    const devoteesPayload = devotees.map(d => ({
      name: d.name,
      age: d.age,
      gender: d.gender,
      aadhar: d.aadhar,
      disability: d.disability
    }));

    formData.append('devotees', JSON.stringify(devoteesPayload));

    devotees.forEach(d => {
      formData.append('aadhar_images', d.aadharImage); // ✅ File object
    });

    const response = await fetch(Backend, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Backend error:', err);
      alert(err);
      return;
    }

    const data = await response.json();

    if (!data.success) {
      alert(data.message || 'Booking failed');
      return;
    }

    sessionStorage.setItem('paymentSuccess', 'true');

    if (!data.paymentRequired || data.totalAmount === 0) {
      router.push(`/vr-darshan/success?bookingId=${data.bookingId}`);
    } else {
      router.push(`/vr-darshan/payment?orderId=${data.orderId}`);
    }

  } catch (err) {
    console.error('Submit error:', err);
    alert('Unexpected error');
  } finally {
    setSubmitting(false);
  }
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
                <p>• Only the first darshan/visit is included in the registration.</p>
                <p>• Additional visits require separate registration and payment.</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">2. Saarthi (Guide) Arrangements</h3>
                <p>• Travel expenses for the assigned Saarthi (guide) will be borne by the devotee/user.</p>
                <p>• Accommodation costs for the Saarthi, if required, will be the responsibility of the devotee/user.</p>
                <p>• Food and other personal expenses of the Saarthi are to be covered by the devotee/user.</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">3. Charges & Payment</h3>
                <p>• Registration fee: ₹39 per person.</p>
                <p>• Senior citizens (60+ years) and persons with disabilities are eligible for free registration.</p>
                <p>• Payment is non-refundable once confirmed.</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">4. Booking & Cancellation</h3>
                <p>• Time slots are subject to availability on a first-come, first-served basis.</p>
                <p>• Cancellations must be made at least 48 hours in advance.</p>
                <p>• No-shows will not be eligible for refunds or rescheduling.</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">5. General Terms</h3>
                <p>• Valid government-issued ID (Aadhaar) is mandatory for all devotees.</p>
                <p>• Management reserves the right to modify or cancel bookings in case of unforeseen circumstances.</p>
                <p>• Devotees must follow all temple rules and guidelines during the visit.</p>
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
                        type="text"
                        value={devotee.name}
                        onChange={(e) =>
                          updateDevotee(devotee.id, 'name', e.target.value)
                        }
                        className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-orange-500"
                        placeholder="Full name"
                      />
                    </div>

                    {/* Age (tight) */}
                    <div className="col-span-1">
                      <label className="block text-sm font-semibold text-slate-700 mb-1">
                        Age *
                      </label>
                      <input
                        type="number"
                        value={devotee.age}
                        onChange={(e) =>
                          updateDevotee(devotee.id, 'age', e.target.value)
                        }
                        className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-orange-500"
                        min="1"
                        max="120"
                      />
                    </div>

                    {/* Gender */}
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-1">
                        Gender *
                      </label>
                      <select
                        value={devotee.gender}
                        onChange={(e) =>
                          updateDevotee(devotee.id, 'gender', e.target.value)
                        }
                        className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>

                    {/* Aadhaar Number (wider) */}
                    <div className="col-span-3">
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
                        className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-orange-500"
                        placeholder="12 digits"
                        maxLength="12"
                      />
                    </div>

                    {/* Aadhaar Image (compact) */}
                    <div className="col-span-3">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Aadhaar Image *
                      </label>

                      {devotee.aadharImage ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-green-600 truncate flex-1">
                            Image uploaded
                          </span>
                          <button
                            onClick={() =>
                              updateDevotee(devotee.id, 'aadharImage', null)
                            }
                            className="text-red-600 hover:text-red-800"
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
                            accept="image/png,image/jpeg"
                            onChange={(e) =>
                              e.target.files?.[0] &&
                              handleImageUpload(devotee.id, e.target.files[0])
                            }
                            className="hidden"
                          />
                        </label>
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
                        className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-orange-500"
                      />
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
                        className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-orange-500"
                      />
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
                        className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
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
                        className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    {/* Aadhaar Image */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-1">
                        Aadhaar Image *
                      </label>
                      <label className="flex items-center justify-center px-3 py-2 border-2 border-dashed border-slate-300 rounded cursor-pointer hover:border-orange-500">
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
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                      setContactNumber(value)
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter contact number"
                    maxLength="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    value={whatsappNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                      setWhatsappNumber(value)
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter WhatsApp number"
                    maxLength="10"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter your complete address"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email ID *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-orange-500"
                    placeholder="your.email@example.com"
                  />
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
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value)
                        setPlace('')
                      }}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">-- Select Category --</option>
                      {Object.keys(spiritualPlaces).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Spiritual Place *
                    </label>
                    <select
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                      disabled={!category}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select spiritual destination</option>
                      {category &&
                        spiritualPlaces[category].map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* Date + Time Slot */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Preferred Date * (Weekends Only)
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                        const date = e.target.value
                        if (isWeekend(date)) {
                          setSelectedDate(date)
                          setSelectedTime('')
                        } else {
                          alert('Please select a weekend date (Saturday or Sunday)')
                          e.target.value = ''
                        }
                      }}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Time Slot *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['6-7 PM', '8-9 PM'].map((timeSlot) => {
                        const booked = isSlotBooked(selectedDate, timeSlot)
                        return (
                          <button
                            key={timeSlot}
                            type="button"
                            disabled={booked || !selectedDate}
                            onClick={() => handleTimeSlotClick(timeSlot)}
                            className={`
                    px-4 py-2 rounded text-sm font-medium transition-all
                    ${booked
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : selectedTime === timeSlot
                                  ? 'bg-orange-600 text-white shadow-lg'
                                  : 'bg-white border-2 border-slate-300 text-slate-700 hover:border-orange-500'}
                    ${!selectedDate ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                          >
                            {timeSlot}
                            {booked && ' (Booked)'}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Special Request */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Special Request (Optional)
                  </label>
                  <textarea
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-orange-500"
                    placeholder="Any special requirements or requests..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Charges Summary and Submit */}
          <div className="space-y-4">
            {/* Charges Summary */}
            {devotees.length > 0 && devotees[0].age && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-2">Charges Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Chargeable Devotees ({charges.chargeableDevotees}):</span>
                    <span className="font-semibold">₹{charges.chargeableDevotees * CHARGE_PER_PERSON}</span>
                  </div>
                  {charges.freeDevotees > 0 && (
                    <div className="flex justify-between text-green-700">
                      <span>Free (Senior/Disabled) ({charges.freeDevotees}):</span>
                      <span className="font-semibold">₹0</span>
                    </div>
                  )}
                  <div className="border-t-2 border-blue-300 pt-2 mt-2 flex justify-between text-base">
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
                onClick={handleSubmit}
                disabled={submitting}
                className={`w-full sm:w-auto px-8 sm:px-10 py-3 font-semibold rounded-lg shadow-lg transition-all
      ${submitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 transform hover:scale-105'
                  }
    `}
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

export default DevoteeRegistration;