import { z } from 'zod';

// Use passthrough() so unknown fields from ParaBank don't fail validation
// Only assert the fields we know are always present
export const LoanResponseSchema = z.object({
  approved: z.boolean(),
  message:  z.string(),
}).passthrough();

export type LoanResponse = z.infer<typeof LoanResponseSchema>;