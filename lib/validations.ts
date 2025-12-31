import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^\+234\d{10}$/, "Phone must be in format +234XXXXXXXXXX"),
  title: z.string().min(2, "Title is required"),
  ministry: z.string().min(2, "Ministry/Center name is required"),
  arrivalDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid arrival date",
  }),
  departureDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid departure date",
  }),
  accommodation: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Please select accommodation preference" }),
  }),
  feeding: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Please select feeding preference" }),
  }),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export const somaRegistrationSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    surName: z.string().min(2, "Surname must be at least 2 characters"),
    phone: z.string().min(11, "Phone number must be valid"),
    email: z.string().email("Invalid email address"),
    centre: z.string().min(2, "Centre is required"),
    maritalStatus: z.enum(
      ["Single", "Engaged", "Married", "Divorced/Separated"],
      {
        errorMap: () => ({ message: "Please select a marital status" }),
      }
    ),
    attendWithSpouse: z.enum(["Yes", "No"], {
      errorMap: () => ({
        message: "Please indicate if you will attend with your spouse",
      }),
    }),
    spouseName: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.attendWithSpouse === "Yes" && !data.spouseName) {
        return false;
      }
      return true;
    },
    {
      message: "Spouse name is required if attending with spouse",
      path: ["spouseName"],
    }
  );

export type SomaRegistrationFormData = z.infer<typeof somaRegistrationSchema>;
