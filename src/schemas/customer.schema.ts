import { z } from 'zod';

// ParaBank returns: { id, firstName, lastName, address, phoneNumber }
// username and ssn are NOT returned on GET /customers/{id}
export const CustomerSchema = z.object({
  id:        z.number(),
  firstName: z.string().min(1),
  lastName:  z.string().min(1),
  address: z.object({
    street:  z.string(),
    city:    z.string(),
    state:   z.string(),
    zipCode: z.string(),
  }),
  phoneNumber: z.string().optional(),
  ssn:         z.string().optional(),
  username:    z.string().optional(),
});

export type Customer = z.infer<typeof CustomerSchema>;