import { z } from 'zod';

export const TransactionSchema = z.object({
  id:          z.number(),
  accountId:   z.number(),
  type:        z.enum(['Credit', 'Debit']),
  date:        z.number(), // epoch ms
  amount:      z.number(),
  description: z.string(),
});

export const TransactionListSchema = z.array(TransactionSchema);

export type Transaction = z.infer<typeof TransactionSchema>;
