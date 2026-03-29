import { apiClient } from '../client/apiClient';
import { config }    from '../config/env';

// Login returns the full Customer object — id field IS the customerId
export interface CustomerResponse {
  id:          number;
  firstName:   string;
  lastName:    string;
  username:    string;
}

/**
 * GET /login/{username}/{password}
 * Returns the customer object; customer.id is the customerId.
 */
export async function login(
  username = config.username,
  password = config.password,
): Promise<{ customerId: number; statusCode: number }> {
  const res = await apiClient.get<CustomerResponse>(`/login/${username}/${password}`);
  return {
    customerId: res.data?.id ?? -1,
    statusCode: res.status,
  };
}
