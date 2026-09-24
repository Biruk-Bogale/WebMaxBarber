import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),

  email: z.string().email("Please enter a valid email address."),

  phone: z.string().min(7, "Please enter a valid phone number."),

  notes: z.string().max(500).optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email."),

  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const serviceSchema = z.object({
  name: z.string().min(2, "Service name is required."),

  description: z.string().optional(),

  price: z.coerce.number().min(0, "Price cannot be negative."),

  duration: z.coerce.number().min(5, "Duration must be at least 5 minutes."),

  imageUrl: z.string().url().optional().or(z.literal("")),

  isActive: z.boolean(),
});

export const barberSchema = z.object({
  name: z.string().min(2, "Barber name is required."),

  specialty: z.string().optional(),

  bio: z.string().optional(),

  imageUrl: z.string().url().optional().or(z.literal("")),

  isActive: z.boolean(),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;

export type ServiceFormValues = z.infer<typeof serviceSchema>;

export type ServiceFormInput = z.input<typeof serviceSchema>;

export type BarberFormValues = z.infer<typeof barberSchema>;

export type BarberFormInput = z.input<typeof barberSchema>;
