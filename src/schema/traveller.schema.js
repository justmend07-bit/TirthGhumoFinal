import { z } from "zod";

export const TravellerSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Select a valid gender" }),
  }),
  age: z
    .number({ invalid_type_error: "Age is required" })
    .int()
    .min(1)
    .max(120),

  email: z.string().email("Invalid email address"),

  contact_number: z
    .string()
    .min(10, "Contact number must be 10 digits"),

  whatsapp_number: z
    .string()
    .min(10, "WhatsApp number must be 10 digits"),

  emergency_contact: z
    .string()
    .min(10, "Emergency contact must be 10 digits"),

  college_name: z.string().min(2, "College name is required"),

  transport_mode: z.string().min(1, "Select transport mode"),

  id_proof_type: z.string().min(1, "Select ID proof type"),

  id_proof_number: z.string().min(3, "Enter valid ID number"),

  id_proof_image_url: z.string().url().optional(),

  medical_details: z.string().optional(),

  special_request: z.string().optional(),

  terms_accepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept terms & conditions" }),
  }),
});
