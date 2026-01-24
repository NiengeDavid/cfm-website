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
      },
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
    },
  );

export type SomaRegistrationFormData = z.infer<typeof somaRegistrationSchema>;

export const ncbiRegistrationSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    firstName: z.string().min(2, "First name is required"),
    surName: z.string().min(2, "Surname is required"),
    otherName: z.string().optional(),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    whatsapp: z.string().min(1, "WhatsApp number is required"),
    occupation: z.string().min(1, "Occupation is required"),
    gender: z.enum(["Male", "Female"], {
      errorMap: () => ({ message: "Please select a gender" }),
    }),
    maritalStatus: z.enum(
      ["Single", "Engaged", "Married", "Divorced/Separated"],
      {
        errorMap: () => ({ message: "Please select a marital status" }),
      },
    ),
    address: z.string().min(5, "Address is required"),
    cfcCentre: z.string().min(2, "Centre is required"),
    cfcCommunityChurch: z.string().min(2, "Community Church (C3) is required"),
    serviceTeam: z.enum(
      [
        "Ushering",
        "IT and Internet",
        "Social media",
        "Sentry",
        "Protocol",
        "Host",
        "Children Church",
        "Walfare",
        "Sound and Technical",
        "Projection",
        "Livestream and Television",
        "Arts and Asthetics",
        "Prayer and Counseling",
        "Face to Face",
        "Voice of Creation",
        "Reception",
        "Other",
      ],
      {
        errorMap: () => ({ message: "Please select a service team" }),
      },
    ), // I'll infer some options or just make it string if the image shows a dropdown but I can't see options. The image shows "None" selected, so it's a select. I'll make it string for now to be safe or try to guess. Wait, image shows "--None--" so it is a select.
    growthTrack: z.enum(["Yes", "No"], {
      errorMap: () => ({
        message: "Please indicate if you have gone through the growth track",
      }),
    }),
    growthTrackYear: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.growthTrack === "Yes" && !data.growthTrackYear) {
        return false;
      }
      return true;
    },
    {
      message: "Year is required if you have gone through the growth track",
      path: ["growthTrackYear"],
    },
  );

export type NcbiRegistrationFormData = z.infer<typeof ncbiRegistrationSchema>;
