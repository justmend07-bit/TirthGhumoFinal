import { useState } from 'react';
import { X, Upload, Check } from 'lucide-react';

const positions = [
  'Next.js Developer',
  'Flutter Developer',
  'Android Developer',
  'Frontend Developer',
  'UI/UX Designer',
  'Business Development Consultant',
  'Google Ads Manager',
  'Meta Ads Manager',
  'Backend Developer (FastAPI / Node.js)',
  'Content Creator / Social Media Manager',
];

const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
const idProofTypes = ['Aadhaar Card', 'PAN Card', 'Passport', 'Driving License', 'Voter ID'];

export default function ApplicationForm({ isOpen = true, onClose = () => { }, selectedPosition = '' }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [idProofFile, setIdProofFile] = useState(null);

  const HiringBackendURL = process.env.NEXT_PUBLIC_BACKEND_URL + '/hiring/apply';

  const [formData, setFormData] = useState({
    // Personal Info
    full_name: '',
    email_address: '',
    phone_number: '',
    date_of_birth: '',
    gender: '',
    current_city: '',
    education_qualification: '',
    college_name: '',
    school_name: '',

    // Position
    position_applied: selectedPosition || '',
    why_this_role: '',

    // Experience
    worked_in_travel_company: false,
    previous_travel_role: '',
    travel_expertise_rating: '',
    managed_group_trips: false,
    comfortable_24x7: false,
    why_should_we_hire_you: '',
    referral_source: '',
    agreement_confirmed: false,
    linkedin_profile: '',
    portfolio_url: '',

    // Multi-value fields
    key_skills: '',
    work_proof_link: '',

    // ID Proof
    id_proof_type: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (!resumeFile) {
        throw new Error('Please upload your resume');
      }
      if (!idProofFile) {
        throw new Error('Please upload your ID proof');
      }
      if (!formData.agreement_confirmed) {
        throw new Error('Please confirm the agreement');
      }

      const formDataToSend = new FormData();

      // Personal Info
      formDataToSend.append('full_name', formData.full_name.trim());
      formDataToSend.append('email_address', formData.email_address.trim());
      formDataToSend.append('phone_number', formData.phone_number.trim());
      formDataToSend.append(
        'date_of_birth',
        new Date(formData.date_of_birth).toISOString().split('T')[0]
      );
      formDataToSend.append('current_city', formData.current_city.trim());
      formDataToSend.append('position_applied', formData.position_applied);
      formDataToSend.append('why_this_role', formData.why_this_role.trim());
      formDataToSend.append('why_should_we_hire_you', formData.why_should_we_hire_you.trim());
      formDataToSend.append('key_skills', formData.key_skills.trim());

      const bool = (v) => (v ? "true" : "false");

      formDataToSend.append('worked_in_travel_company', bool(formData.worked_in_travel_company));
      formDataToSend.append('managed_group_trips', bool(formData.managed_group_trips));
      formDataToSend.append('comfortable_24x7', bool(formData.comfortable_24x7));
      formDataToSend.append('agreement_confirmed', bool(formData.agreement_confirmed));

      if (formData.travel_expertise_rating) {
        formDataToSend.append(
          'travel_expertise_rating',
          String(formData.travel_expertise_rating)
        );
      }

      const formattedWorkProofs = formData.work_proof_link
        ? formData.work_proof_link.split(',').map(v => v.trim()).join('\n')
        : '';

      formDataToSend.append('work_proof_link', formattedWorkProofs);
      // Optional personal info
      if (formData.gender) {
        formDataToSend.append('gender', formData.gender);
      }

      if (formData.education_qualification) {
        formDataToSend.append('education_qualification', formData.education_qualification.trim());
      }

      if (formData.college_name) {
        formDataToSend.append('college_name', formData.college_name.trim());
      }

      if (formData.school_name) {
        formDataToSend.append('school_name', formData.school_name.trim());
      }

      if (formData.referral_source) {
        formDataToSend.append('referral_source', formData.referral_source.trim());
      }

      // Optional links
      if (formData.linkedin_profile) {
        formDataToSend.append('linkedin_profile', formData.linkedin_profile.trim());
      }

      if (formData.portfolio_url) {
        formDataToSend.append('portfolio_url', formData.portfolio_url.trim());
      }



      // Files
      formDataToSend.append('resume_file', resumeFile);
      formDataToSend.append('id_proof_type', formData.id_proof_type);
      formDataToSend.append('id_proof_file', idProofFile);

      const response = await fetch(HiringBackendURL, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to submit application');
      }

      setIsSuccess(true);

    } catch (err) {
      setError(err?.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8 sticky top-0 bg-white z-10 pb-4">
            <h2 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                Apply Now
              </span>
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Application Submitted!
              </h3>

              <p className="text-gray-600 mb-8">
                We'll review your application and get back to you soon.
              </p>

              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();

                  // reset form here if you want
                  setFormData({
                    full_name: '',
                    email_address: '',
                    phone_number: '',
                    date_of_birth: '',
                    gender: '',
                    current_city: '',
                    education_qualification: '',
                    college_name: '',
                    school_name: '',
                    position_applied: '',
                    why_this_role: '',
                    worked_in_travel_company: false,
                    previous_travel_role: '',
                    travel_expertise_rating: '',
                    managed_group_trips: false,
                    comfortable_24x7: false,
                    why_should_we_hire_you: '',
                    referral_source: '',
                    agreement_confirmed: false,
                    linkedin_profile: '',
                    portfolio_url: '',
                    key_skills: '',
                    work_proof_link: '',
                    id_proof_type: '',
                  });

                  setResumeFile(null);
                  setIdProofFile(null);
                }}
                className="px-8 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-orange-200">
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email_address}
                      onChange={(e) => setFormData({ ...formData, email_address: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone_number}
                      onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date_of_birth}
                      onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                    >
                      <option value="">Select gender</option>
                      {genderOptions.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.current_city}
                      onChange={(e) => setFormData({ ...formData, current_city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                      placeholder="Mumbai"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Education Qualification
                    </label>
                    <input
                      type="text"
                      value={formData.education_qualification}
                      onChange={(e) => setFormData({ ...formData, education_qualification: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                      placeholder="Bachelor's in Computer Science"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      College Name
                    </label>
                    <input
                      type="text"
                      value={formData.college_name}
                      onChange={(e) => setFormData({ ...formData, college_name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                      placeholder="Your college name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      School Name
                    </label>
                    <input
                      type="text"
                      value={formData.school_name}
                      onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                      placeholder="Your school name"
                    />
                  </div>
                </div>
              </div>

              {/* Position Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-orange-200">
                  Position Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Position Applied For *
                    </label>
                    <select
                      required
                      value={formData.position_applied}
                      onChange={(e) => setFormData({ ...formData, position_applied: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                    >
                      <option value="">Select a position</option>
                      {positions.map((pos) => (
                        <option key={pos} value={pos}>{pos}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Why This Role? *
                    </label>
                    <textarea
                      required
                      value={formData.why_this_role}
                      onChange={(e) => setFormData({ ...formData, why_this_role: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none resize-none"
                      placeholder="What interests you about this role?"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Key Skills * (comma-separated)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.key_skills}
                      onChange={(e) => setFormData({ ...formData, key_skills: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                      placeholder="React, Node.js, TypeScript, Python"
                    />
                  </div>
                </div>
              </div>

              {/* Experience Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-orange-200">
                  Experience
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="worked_in_travel"
                      checked={formData.worked_in_travel_company}
                      onChange={(e) => setFormData({ ...formData, worked_in_travel_company: e.target.checked })}
                      className="w-5 h-5  accent-orange-600 border-2 border-gray-400  bg-white rounded focus:ring-2 focus:ring-orange-400"

                    />
                    <label htmlFor="worked_in_travel" className="text-sm font-semibold text-gray-700">
                      Have you worked in a travel company before?
                    </label>
                  </div>

                  {formData.worked_in_travel_company && (
                    <div className="grid md:grid-cols-2 gap-6 pl-8">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Previous Travel Role
                        </label>
                        <input
                          type="text"
                          value={formData.previous_travel_role}
                          onChange={(e) => setFormData({ ...formData, previous_travel_role: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                          placeholder="Travel Consultant"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Travel Expertise Rating (1-10)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={formData.travel_expertise_rating}
                          onChange={(e) => setFormData({ ...formData, travel_expertise_rating: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                          placeholder="7"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="managed_trips"
                      checked={formData.managed_group_trips}
                      onChange={(e) => setFormData({ ...formData, managed_group_trips: e.target.checked })}
                      className="w-5 h-5  accent-orange-600 border-2 border-gray-400  bg-white rounded focus:ring-2 focus:ring-orange-400"
                    />
                    <label htmlFor="managed_trips" className="text-sm font-semibold text-gray-700">
                      Have you managed group trips?
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="comfortable_24x7"
                      checked={formData.comfortable_24x7}
                      onChange={(e) => setFormData({ ...formData, comfortable_24x7: e.target.checked })}
                      className="w-5 h-5  accent-orange-600 border-2 border-gray-400  bg-white rounded focus:ring-2 focus:ring-orange-400"
                    />
                    <label htmlFor="comfortable_24x7" className="text-sm font-semibold text-gray-700">
                      Are you comfortable with 24x7 availability?
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Why Should We Hire You? *
                    </label>
                    <textarea
                      required
                      value={formData.why_should_we_hire_you}
                      onChange={(e) => setFormData({ ...formData, why_should_we_hire_you: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none resize-none"
                      placeholder="Tell us what makes you a great fit..."
                    />
                  </div>
                </div>
              </div>

              {/* Additional Info Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-orange-200">
                  Additional Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      value={formData.linkedin_profile}
                      onChange={(e) => setFormData({ ...formData, linkedin_profile: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Portfolio URL
                    </label>
                    <input
                      type="url"
                      value={formData.portfolio_url}
                      onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Work Proof Links (comma-separated URLs)
                    </label>
                    <input
                      type="text"
                      value={formData.work_proof_link}
                      onChange={(e) => setFormData({ ...formData, work_proof_link: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                      placeholder="https://project1.com, https://project2.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      How did you hear about us?
                    </label>
                    <input
                      type="text"
                      value={formData.referral_source}
                      onChange={(e) => setFormData({ ...formData, referral_source: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                      placeholder="LinkedIn, Friend, Job Portal, etc."
                    />
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-orange-200">
                  Documents
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Resume (PDF) *
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      required
                      onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="flex items-center justify-center gap-3 w-full px-4 py-6 rounded-xl border-2 border-dashed border-gray-300 hover:border-orange-500 transition-all cursor-pointer bg-gray-50 hover:bg-orange-50"
                    >
                      <Upload className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">
                        {resumeFile ? resumeFile.name : 'Click to upload resume (PDF)'}
                      </span>
                    </label>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ID Proof Type *
                      </label>
                      <select
                        required
                        value={formData.id_proof_type}
                        onChange={(e) => setFormData({ ...formData, id_proof_type: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                      >
                        <option value="">Select ID proof type</option>
                        {idProofTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ID Proof Document *
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        required
                        onChange={(e) => setIdProofFile(e.target.files?.[0] || null)}
                        className="hidden"
                        id="id-proof-upload"
                      />
                      <label
                        htmlFor="id-proof-upload"
                        className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 hover:border-orange-500 transition-all cursor-pointer bg-gray-50 hover:bg-orange-50"
                      >
                        <Upload className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600 text-sm">
                          {idProofFile ? idProofFile.name : 'Upload ID proof'}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agreement */}
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
                <input
                  type="checkbox"
                  id="agreement"
                  required
                  checked={formData.agreement_confirmed}
                  onChange={(e) => setFormData({ ...formData, agreement_confirmed: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500 mt-0.5"
                />
                <label htmlFor="agreement" className="text-sm text-gray-700">
                  I confirm that all information provided is accurate and I agree to the terms and conditions *
                </label>
              </div>

              {/* Error message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-4 sticky bottom-0 bg-white pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}