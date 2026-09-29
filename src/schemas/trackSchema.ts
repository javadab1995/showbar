import z from "zod";

export const trackSchema = z.object({
  identifierType: z.enum(["PLATE", "TRANSIT"]),
  nationalCode: z.string().optional(),
  phone: z.string().optional(),
  plate: z.string().optional(),
  transitCode: z.string().optional(),
  trackingCode: z.string().optional(),
});

export type TrackFormData = z.infer<typeof trackSchema>;