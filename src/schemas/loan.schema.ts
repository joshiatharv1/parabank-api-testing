import { z } from 'zod';

// Actual ParaBank response: { loanProviderName, approved, message, accountId?, loanAmount?, downPayment? }
export const LoanResponseSchema = z.object({
  loanProviderName: z.string().optional(),
  approved:         z.boolean(),
  message:          z.string(),
  accountId:        z.number().optional(),
  loanAmount:       z.number().optional(),
  downPayment:      z.number().optional(),
});

export type LoanResponse = z.infer<typeof LoanResponseSchema>;