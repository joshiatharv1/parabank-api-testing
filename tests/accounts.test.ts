
import { apiClient }          from '../src/client/apiClient';
import { assertResponseTime } from '../src/helpers/responseTime';
import { CustomerSchema }     from '../src/schemas/customer.schema';
import { config }             from '../src/config/env';

describe('Authentication', () => {

  test('valid login — 200 and returns customer object', async () => {
    const res = await apiClient.get(`/login/${config.username}/${config.password}`);

    expect(res.status).toBe(200);
    // Login returns full customer — id IS the customerId
    const parsed = CustomerSchema.safeParse(res.data);
    expect(parsed.success).toBe(true);
    expect((res.data as any).id).toBeGreaterThan(0);
    assertResponseTime(res);
  });

  test('invalid password — returns 4xx', async () => {
    const res = await apiClient.get(`/login/${config.username}/${config.badPassword}`);

    // ParaBank returns 400 for bad credentials
    expect(res.status).toBeGreaterThanOrEqual(400);
    assertResponseTime(res);
  });

  test('unknown username — returns 4xx', async () => {
    const res = await apiClient.get('/login/ghost_user/any_password');

    expect(res.status).toBeGreaterThanOrEqual(400);
    assertResponseTime(res);
  });

  test('empty credentials — returns 4xx or 5xx', async () => {
    const res = await apiClient.get('/login/%20/%20');

    expect(res.status).toBeGreaterThanOrEqual(400);
    assertResponseTime(res);
  });

});
