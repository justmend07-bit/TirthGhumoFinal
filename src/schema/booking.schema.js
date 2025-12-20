import { z } from "zod";

export const TravellerSchema = z.object({
  full_name: z.string().min(2),
  gender: z.string(),
  age: z.number().int().min(1),
  email: z.string().email(),
  contact_number: z.string(),
  whatsapp_number: z.string(),
  emergency_contact: z.string(),
  college_name: z.string(),
  transport_mode: z.string(),
  id_proof_type: z.string(),
  id_proof_number: z.string(),
  id_proof_image_url: z.string().optional(),
});

export const BookingSchema = z.object({
  tour_name: z.string(),
  departure_batch: z.string(),
  travellers: z.array(TravellerSchema),
  total_amount: z.number(),
});
