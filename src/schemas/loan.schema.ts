import { z } from 'zod';

// ParaBank returns: { "loanProviderName": "...", "approved": true, "message": "..." }
export const LoanResponseSchema = z.object({
  loanProviderName: z.string().optional(),
  approved:         z.boolean(),
  message:          z.string(),
  accountId:        z.number().optional(),
  loanAmount:       z.number().optional(),
  downPayment:      z.number().optional(),
});

export type LoanResponse = z.infer<typeof LoanResponseSchema>;
