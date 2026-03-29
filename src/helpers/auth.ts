import { apiClient } from '../client/apiClient';
import { config }    from '../config/env';

export interface LoginResult {
  customerId: number;
  username:   string;
}

/**
 * Logs in and returns customerId + username.
 * ParaBank auth: GET /login/{username}/{password}
 */
export async function login(
  username = config.username,
  password = config.password
): Promise<{ customerId: number; statusCode: number }> {
  const res = await apiClient.get<LoginResult>(
    `/login/${username}/${password}`
  );
  return {
    customerId: res.data?.customerId ?? -1,
    statusCode: res.status,
  };
}
