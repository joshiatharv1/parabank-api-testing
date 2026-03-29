import { apiClient }          from '../src/client/apiClient';
import { login }              from '../src/helpers/auth';
import { CustomerSchema }     from '../src/schemas/customer.schema';
import { AccountListSchema }  from '../src/schemas/account.schema';
import { assertResponseTime } from '../src/helpers/responseTime';

let customerId: number;

beforeAll(async () => {
  const result = await login();
  expect(result.statusCode).toBe(200);
  customerId = result.customerId;
});

describe('Customer endpoints', () => {

  test('GET /customers/{id} — returns valid customer schema', async () => {
    const res = await apiClient.get(`/customers/${customerId}`);

    expect(res.status).toBe(200);
    const parsed = CustomerSchema.safeParse(res.data);
    expect(parsed.success).toBe(true);
    assertResponseTime(res);
  });

  test('GET /customers/{id} — customerId matches login', async () => {
    const res = await apiClient.get<{ id: number }>(`/customers/${customerId}`);

    expect(res.data.id).toBe(customerId);
  });

  test('GET /customers/{id}/accounts — returns array of accounts', async () => {
    const res = await apiClient.get(`/customers/${customerId}/accounts`);

    expect(res.status).toBe(200);
    const parsed = AccountListSchema.safeParse(res.data);
    expect(parsed.success).toBe(true);
    expect((res.data as unknown[]).length).toBeGreaterThan(0);
    assertResponseTime(res);
  });

  test('GET /customers/99999999 — non-existent customer returns 4xx', async () => {
    const res = await apiClient.get('/customers/99999999');

    expect(res.status).toBeGreaterThanOrEqual(400);
    assertResponseTime(res);
  });

  test('Unauthorized: missing auth returns 4xx', async () => {
    // ParaBank uses basic auth embedded in the URL — accessing without
    // prior login session should return 4xx on protected resources
    const res = await apiClient.get('/customers/12212');

    expect(res.status).toBeGreaterThanOrEqual(400);
    assertResponseTime(res);
  });

});
