"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Camera,
  Upload,
  User,
  Calendar,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Map,
  Briefcase,
  Building2,
} from "lucide-react";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL + "/saarthi";

// ----------------- Validation schema -----------------
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];
const ACCEPTED_DOC_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const SarthiSchema = z.object({
  full_name: z.string().min(3, "Enter your full name (min 3 chars)"),
  dob: z
    .string()
    .refine(
      (val) => {
        const today = new Date();
        const selected = new Date(val);
        return selected <= today;   // 🚨 prevent future dates
      },
      { message: "Date cannot be in the future" }
    ),
  gender: z.enum(["Male", "Female", "Other", "Prefer not to say"]).optional(),
  aadhar_number: z
    .string()
    .refine((val) => /^[0-9]{12}$/.test(val), {
      message: "Aadhar must be exactly 12 digits",
    }),
  email: z.string().email("Invalid email address"),
  mobile: z
    .string()
    .refine((val) => /^[0-9]{10}$/.test(val), { message: "Mobile must be 10 digits" }),
  city: z.string().min(2, "Enter city"),
  state: z.string().min(2, "Enter state"),
  address: z.string().min(10, "Enter a full address"),
  occupation: z.string().min(2, "Enter occupation"),
  organization: z.string().min(2, "Enter college/organization"),
  socialmedia: z.string().optional().nullable(),
  previous_experience: z.string().optional().nullable(),
  roles: z.array(z.string()).min(1, "Select at least one role"),
  motivation: z.string().min(20, "Tell us why — at least 20 characters"),
  // Files validated separately
  aadhar_front: z.any().refine((f) => f, "Aadhar front is required"),
  profile_photo: z.any().refine((f) => f, "Profile photo is required"),

});

const rolesList = [
  "On-Ground Volunteer",
  "Trip Lead",
  "Content Creator",
  "Community Engagement",
  "Operations / Logistics",
];

// ----------------- Helper Components -----------------
const FieldLabel = ({ children, required }) => (
  <label className="block text-sm font-medium text-gray-700 mb-2">
    {children} {required ? <span className="text-red-500">*</span> : null}
  </label>
);

const ErrorText = ({ children }) => (
  <p className="text-sm text-red-600 mt-2">{children}</p>
);

const Input = React.forwardRef(({ icon: Icon, error, className = "", ...props }, ref) => (
  <div>
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />}
      <input
        ref={ref}
        {...props}
        className={`
    w-full pl-12 pr-4 py-3 rounded-xl outline-none text-black
    placeholder-gray-400  /* responsive */
    transition-all
    ${error ? "ring-2 ring-red-300 bg-red-50" : "bg-gray-100 focus:ring-2 focus:ring-orange-400"}
    ${className}
  `}
      />

    </div>
    {error ? <ErrorText>{error.message}</ErrorText> : null}
  </div>
));
Input.displayName = "Input";

const Select = ({ icon: Icon, children, error, ...props }) => (
  <div>
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />}
      <select
        {...props}
        className={`placeholder-gray-400 text-black w-full pl-12 pr-4 py-3 rounded-xl outline-none transition-all ${error ? "ring-2 ring-red-300 bg-red-50" : "bg-gray-100 focus:ring-2 focus:ring-orange-400"
          }`}
      >
        {children}
      </select>
    </div>
    {error ? <ErrorText>{error.message}</ErrorText> : null}
  </div>
);

const TextArea = ({ error, ...props }) => (
  <div>
    <textarea
  {...props}
  className={`
    w-full px-4 py-3 rounded-xl outline-none resize-none
    placeholder-gray-400 text-black
    transition-all
    ${error ? "ring-2 ring-red-300 bg-red-50" : "bg-gray-100 focus:ring-2 focus:ring-orange-400"}
  `}
/>

    {error ? <ErrorText>{error.message}</ErrorText> : null}
  </div>
);

function FileInput({ label, accept, controller, previewUrl, setPreviewUrl, error, required }) {
  // controller: from react-hook-form Controller field
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="flex gap-4 items-start">
        <div className="flex-1">
          <label className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50/30 transition-all block">
            {previewUrl ? (
              <img src={previewUrl} alt="preview" className="mx-auto h-32 object-cover rounded-xl shadow-sm" />
            ) : (
              <div className="py-6">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600"><span className="text-orange-600 font-medium">Upload</span> or drag & drop</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF up to 10MB</p>
              </div>
            )}
            <input
              type="file"
              accept={accept}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                controller.onChange(file ?? null);
                if (!file) return setPreviewUrl(null);

                // client-side validation for file
                if (file.size > MAX_FILE_SIZE) {
                  controller.onChange(null);
                  setPreviewUrl(null);
                  controller.setError?.({ message: "File is larger than 10MB" });
                  return;
                }
                if (!accept.includes(file.type)) {
                  controller.onChange(null);
                  setPreviewUrl(null);
                  controller.setError?.({ message: "Unsupported file type" });
                  return;
                }

                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
              }}
            />
          </label>
          {error ? <ErrorText>{error.message}</ErrorText> : null}
        </div>
      </div>
    </div>
  );
}

// ----------------- Main Component -----------------
export default function SaarthiRegistrationForm() {
  const [aadharPreview, setAadharPreview] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setError,
    setValue
  } = useForm({
    resolver: zodResolver(SarthiSchema),
    defaultValues: {
      roles: [],
    },
  });

  // convert roles toggle to controlled field
  const [selectedRoles, setSelectedRoles] = useState([]);
  useEffect(() => {
    // sync to react-hook-form by setting value in a hidden input via register
    // but we'll rely on manual append when submitting
  }, [selectedRoles]);

  const toggleRole = (role) => {
    setSelectedRoles((prev) => {
      const updated = prev.includes(role)
        ? prev.filter((r) => r !== role)
        : [...prev, role];

      setValue("roles", updated); // <-- THIS FIXES EVERYTHING

      return updated;
    });
  };


  const onSubmit = async (values) => {
    setServerError(null);
    setSuccess("");
    

    values.roles = selectedRoles;
    if (selectedRoles.length === 0) {
      setError("roles", { message: "Select at least one role" });
      return;
    }

    // File validations
    const aadhar = values.aadhar_front || null;
    const photo = values.profile_photo || null;

    if (aadhar) {
      if (aadhar.size > MAX_FILE_SIZE) {
        setError("aadhar_front", { message: "Aadhar file is larger than 10MB" });
        return;
      }
      if (!ACCEPTED_DOC_TYPES.includes(aadhar.type)) {
        setError("aadhar_front", { message: "Unsupported Aadhar file type" });
        return;
      }
    }

    if (photo) {
      if (photo.size > MAX_FILE_SIZE) {
        setError("profile_photo", { message: "Photo is larger than 10MB" });
        return;
      }
      if (!ACCEPTED_IMAGE_TYPES.includes(photo.type)) {
        setError("profile_photo", { message: "Unsupported photo type" });
        return;
      }
    }

    // Convert selected roles → backend expects STRING
    const rolesString = selectedRoles.join(", ");

    // Prepare FormData with CORRECT field names (backend-matched)
    const fd = new FormData();
    fd.append("full_name", values.full_name);
    fd.append("date_of_birthday", values.dob); // rename
    fd.append("gender", values.gender);
    fd.append("aadhar_number", values.aadhar_number);

    if (aadhar) fd.append("aadhar_card_image", aadhar); // rename
    if (photo) fd.append("profile_image", photo);       // rename

    fd.append("email_address", values.email);           // rename
    fd.append("contact_number", values.mobile);         // rename
    fd.append("whatsapp_number", values.mobile);        // required by backend

    fd.append("current_city", values.city);             // rename
    fd.append("state", values.state);
    fd.append("address", values.address);

    fd.append("occupation", values.occupation);
    fd.append("organization_name", values.organization); // rename

    fd.append("job_role", rolesString); // backend wants string
    fd.append("role", rolesString);

    fd.append("work_exp", values.previous_experience || "");
    fd.append("company_id", ""); // backend allows optional
    fd.append("profile_url", values.socialmedia || "");
    fd.append("motive", values.motivation); // rename

    try {
      const res = await fetch(BACKEND, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        let message = `Server Error: ${res.status}`;
        try {
          const json = await res.json();
          if (json?.error) message = json.error;
        } catch (_) { }

        throw new Error(message);
      }

      const data = await res.json();
      // Backend might return success: true OR {message: "..."} OR anything truthy
      if (data?.success || data?.message || data?.status === "success") {
        sessionStorage.setItem("saarthi_success", "true");
        router.push("/Career/Sarthi/Register/success");

        // run resets AFTER navigation safely
        setTimeout(() => {
          reset();
          setSelectedRoles([]);
          setAadharPreview(null);
          setPhotoPreview(null);
        }, 0);
        return;
      }


      // if no known success signal
      throw new Error(data?.message || "Unknown server response");

    } catch (err) {
      console.error(err);
      setServerError(err.message || "Submission failed");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 rounded-2xl mt-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16 animate-header">
          <h1 className="
      text-5xl md:text-6xl font-extrabold tracking-tight 
      bg-gradient-to-r from-orange-400 via-orange-500 to-orange-300 
      text-transparent bg-clip-text drop-shadow-sm
    ">
            Become a Saarthi
          </h1>

          <p className="text-gray-600 mt-4 text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            Join our on-ground team to coordinate trips, lead groups,
            create content, and craft unforgettable experiences.
          </p>

          {/* Decorative underline */}
          <div className="mt-4 flex justify-center">
            <div className="h-[3px] w-24 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-300  rounded-full shadow-sm"></div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-3xl p-8 md:p-10 border border-orange-200/30">


          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <section>
              <h2 className="text-2xl text-black font-bold mb-4">Personal Information</h2>

              <div className="space-y-4">
                <div>
                  <FieldLabel required>Full Name</FieldLabel>
                  <Input {...register("full_name")} icon={User} error={errors.full_name} placeholder="John Doe" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel required>Date of Birth</FieldLabel>
                    <Input type="date" {...register("dob")} icon={Calendar} error={errors.dob} className="text-black placeholder-gray-400"  />
                  </div>

                  <div>
                    <FieldLabel required>Gender</FieldLabel>
                    <Select {...register("gender")} icon={User} error={errors.gender}>
                      <option value="">Select gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                      <option>Prefer not to say</option>
                    </Select>
                  </div>
                </div>

                <div>
                  <FieldLabel required>Aadhar Number</FieldLabel>
                  <Input {...register("aadhar_number")} icon={CreditCard} placeholder="123412341234" error={errors.aadhar_number} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 " >
                  <Controller
                    control={control}
                    name="aadhar_front"
                    render={({ field }) => (
                      <FileInput
                        label="Aadhar Card (Front)"
                        accept={ACCEPTED_DOC_TYPES}
                        controller={{ ...field, setError }}
                        previewUrl={aadharPreview}
                        setPreviewUrl={setAadharPreview}
                        error={errors.aadhar_front}
                        required
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="profile_photo"
                    render={({ field }) => (
                      <FileInput
                        label="Profile Photo"
                        accept={ACCEPTED_IMAGE_TYPES}
                        controller={{ ...field, setError }}
                        previewUrl={photoPreview}
                        setPreviewUrl={setPhotoPreview}
                        error={errors.profile_photo}
                        required
                      />
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel required>Email</FieldLabel>
                    <Input {...register("email")} type="email" icon={Mail} error={errors.email} placeholder="name@example.com" />
                  </div>

                  <div>
                    <FieldLabel required>Mobile</FieldLabel>
                    <Input {...register("mobile")} icon={Phone} error={errors.mobile} placeholder="9876543210" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel required>Current City</FieldLabel>
                    <Input {...register("city")} icon={MapPin} error={errors.city} placeholder="Mumbai" />
                  </div>
                  <div>
                    <FieldLabel required>State</FieldLabel>
                    <Input {...register("state")} icon={Map} error={errors.state} placeholder="Maharashtra" />
                  </div>
                </div>

                <div>
                  <FieldLabel required>Address</FieldLabel>
                  <TextArea {...register("address")} rows={3} error={errors.address} />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">Background Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FieldLabel required>Occupation</FieldLabel>
                  <Select {...register("occupation")} icon={Briefcase} error={errors.occupation}>
                    <option value="">Select occupation</option>
                    <option>Student</option>
                    <option>Professional</option>
                    <option>Freelancer</option>
                    <option>Entrepreneur</option>
                  </Select>
                </div>

                <div>
                  <FieldLabel required>College / Organization</FieldLabel>
                  <Input {...register("organization")} icon={Building2} error={errors.organization} placeholder="Organization name" />
                </div>
              </div>

              <div className="mt-4">
                <FieldLabel>Social Media Handle (optional)</FieldLabel>
                <Input {...register("socialmedia")} icon={User} error={errors.socialmedia} placeholder="@yourhandle" />
              </div>

              <div className="mt-4">
                <FieldLabel>Previous experience (optional)</FieldLabel>
                <Input {...register("previous_experience")} icon={User} error={errors.previous_experience} placeholder="Briefly mention any relevant experience" />
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">Roles & Motivation</h2>

              <div className="mb-4">
                <p className="block text-sm font-medium text-gray-700 mb-3">Roles of Interest <span className="text-red-500">*</span></p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {rolesList.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => toggleRole(r)}
                      className={`px-5 py-3 rounded-xl text-sm font-medium transition-all ${selectedRoles.includes(r)
                        ? "bg-orange-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-orange-50"
                        }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                {errors.roles ? <ErrorText>{errors.roles.message}</ErrorText> : null}
              </div>

              <div>
                <FieldLabel required>Why do you want to become a Saarthi?</FieldLabel>
                <TextArea {...register("motivation")} rows={6} error={errors.motivation} />
              </div>
            </section>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
        {/* {success && (
            <div className="bg-green-100 text-green-800 px-4 py-3 mt-5 rounded-xl mb-6 border border-green-300">{success}</div>
          )}

          {serverError && (
            <div className="bg-red-50 text-red-700 px-4 py-3 mt-5 rounded-xl mb-6 border border-red-200">{serverError}</div>
          )} */}
      </div>

      <style>{`
        .animate-fadeIn { animation: fadeIn .6s ease-out }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </div>
  );
}