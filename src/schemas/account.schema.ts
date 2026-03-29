import { z } from 'zod';

export const AccountSchema = z.object({
  id:          z.number(),
  customerId:  z.number(),
  type:        z.enum(['CHECKING', 'SAVINGS', 'LOAN', 'CREDIT_CARD']),
  balance:     z.number(),
});

export const AccountListSchema = z.array(AccountSchema);

export type Account = z.infer<typeof AccountSchema>;
