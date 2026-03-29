import { apiClient }         from '../src/client/apiClient';
import { login }             from '../src/helpers/auth';
import { CustomerSchema }    from '../src/schemas/customer.schema';
import { AccountListSchema } from '../src/schemas/account.schema';
import { assertResponseTime } from '../src/helpers/responseTime';
import { config }            from '../src/config/env';

// ParaBank has no auth enforcement — use the known hardcoded demo customer
// so tests don't depend on login state carrying over
const CUSTOMER_ID = config.knownCustomerId; // 12212 = john's customer id

describe('Customer endpoints', () => {

  test('GET /customers/{id} — 200 and valid schema', async () => {
    const res = await apiClient.get(`/customers/${CUSTOMER_ID}`);

    expect(res.status).toBe(200);
    const parsed = CustomerSchema.safeParse(res.data);
    expect(parsed.success).toBe(true);
    assertResponseTime(res);
  });

  test('GET /customers/{id} — id matches request', async () => {
    const res = await apiClient.get<{ id: number }>(`/customers/${CUSTOMER_ID}`);

    expect(res.data.id).toBe(CUSTOMER_ID);
  });

  test('GET /customers/{id}/accounts — returns array of accounts', async () => {
    const res = await apiClient.get(`/customers/${CUSTOMER_ID}/accounts`);

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

  test('BOLA note — ParaBank has no auth enforcement (by design)', async () => {
    // ParaBank is intentionally vulnerable — any customerId returns 200
    // This test documents the known vulnerability rather than asserting auth fails
    const res = await apiClient.get('/customers/12212');

    expect(res.status).toBe(200); // expected — ParaBank is auth-free by design
    assertResponseTime(res);
  });

});
