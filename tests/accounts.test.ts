import { apiClient }          from '../src/client/apiClient';
import { login }              from '../src/helpers/auth';
import { AccountSchema }      from '../src/schemas/account.schema';
import { TransactionListSchema } from '../src/schemas/transaction.schema';
import { assertResponseTime } from '../src/helpers/responseTime';

let customerId: number;
let accountId:  number;

beforeAll(async () => {
  const result = await login();
  customerId   = result.customerId;

  const accounts = await apiClient.get<{ id: number }[]>(`/customers/${customerId}/accounts`);
  accountId = accounts.data[0].id;
});

describe('Account endpoints', () => {

  test('GET /accounts/{id} — valid schema', async () => {
    const res = await apiClient.get(`/accounts/${accountId}`);

    expect(res.status).toBe(200);
    const parsed = AccountSchema.safeParse(res.data);
    expect(parsed.success).toBe(true);
    assertResponseTime(res);
  });

  test('GET /accounts/{id} — balance is a number', async () => {
    const res = await apiClient.get<{ balance: number }>(`/accounts/${accountId}`);

    expect(typeof res.data.balance).toBe('number');
  });

  test('GET /accounts/{id}/transactions — returns transaction list', async () => {
    const res = await apiClient.get(`/accounts/${accountId}/transactions`);

    expect(res.status).toBe(200);
    const parsed = TransactionListSchema.safeParse(res.data);
    expect(parsed.success).toBe(true);
    assertResponseTime(res);
  });

  test('GET /accounts/00000 — invalid account returns 4xx', async () => {
    const res = await apiClient.get('/accounts/00000');

    expect(res.status).toBeGreaterThanOrEqual(400);
    assertResponseTime(res);
  });

  test('POST /transfer — moves funds between accounts', async () => {
    const accounts = await apiClient.get<{ id: number }[]>(`/customers/${customerId}/accounts`);
    const [fromId, toId] = [accounts.data[0].id, accounts.data[1]?.id ?? accounts.data[0].id];

    const res = await apiClient.post('/transfer', null, {
      fromAccountId: fromId,
      toAccountId:   toId,
      amount:        10,
    });

    // ParaBank returns 200 with plain text "Successfully transferred..."
    expect(res.status).toBe(200);
    assertResponseTime(res);
  });

});

