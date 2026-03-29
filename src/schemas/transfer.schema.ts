import { z } from 'zod';

export const LoanResponseSchema = z.object({
  approved:    z.boolean(),
  message:     z.string(),
  accountId:   z.number().optional(),
  loanAmount:  z.number().optional(),
  downPayment: z.number().optional(),
});

export type LoanResponse = z.infer<typeof LoanResponseSchema>;
