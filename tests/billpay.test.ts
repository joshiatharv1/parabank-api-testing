import { apiClient }          from '../src/client/apiClient';
import { login }              from '../src/helpers/auth';
import { assertResponseTime } from '../src/helpers/responseTime';

let customerId: number;
let accountId:  number;

beforeAll(async () => {
  const result = await login();
  customerId   = result.customerId;
  const accounts = await apiClient.get<{ id: number }[]>(`/customers/${customerId}/accounts`);
  accountId = accounts.data[0].id;
});

describe('Bill Pay', () => {

  const payee = {
    name:        'Test Payee',
    address:     { street: '123 Main St', city: 'Boston', state: 'MA', zipCode: '02101' },
    phoneNumber: '617-555-0100',
    accountNumber: 54321,
    routingNumber: '021000021',
  };

  test('POST /billpay — valid payment returns 200', async () => {
    const res = await apiClient.post('/billpay', payee, {
      accountId,
      amount: 25,
    });

    expect(res.status).toBe(200);
    assertResponseTime(res);
  });

  test('POST /billpay — missing amount returns 4xx', async () => {
    const res = await apiClient.post('/billpay', payee, { accountId });

    expect(res.status).toBeGreaterThanOrEqual(400);
    assertResponseTime(res);
  });

});

