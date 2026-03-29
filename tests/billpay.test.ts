import { apiClient }          from '../src/client/apiClient';
import { assertResponseTime } from '../src/helpers/responseTime';
import { config }             from '../src/config/env';

const CUSTOMER_ID = config.knownCustomerId;
let accountId: number;

beforeAll(async () => {
  const res = await apiClient.get<{ id: number }[]>(`/customers/${CUSTOMER_ID}/accounts`);
  accountId = res.data[0].id;
});

const payee = {
  name:          'Test Payee',
  address:       { street: '123 Main St', city: 'Boston', state: 'MA', zipCode: '02101' },
  phoneNumber:   '617-555-0100',
  accountNumber: 54321,
  routingNumber: '021000021',
};

describe('Bill Pay', () => {

  test('POST /billpay — valid payment returns 200', async () => {
    const res = await apiClient.post(
      '/billpay',
      payee,
      { accountId, amount: 10 },
    );

    expect(res.status).toBe(200);
    assertResponseTime(res);
  });

  test('POST /billpay — missing payee body returns 4xx or 5xx', async () => {
    const res = await apiClient.post('/billpay', null, { accountId, amount: 10 });

    expect(res.status).toBeGreaterThanOrEqual(400);
    assertResponseTime(res);
  });

});