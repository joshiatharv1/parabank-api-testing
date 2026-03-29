import { apiClient }          from '../src/client/apiClient';
import { login }              from '../src/helpers/auth';
import { LoanResponseSchema } from '../src/schemas/transfer.schema';
import { assertResponseTime } from '../src/helpers/responseTime';

let customerId: number;
let accountId:  number;

beforeAll(async () => {
  const result = await login();
  customerId   = result.customerId;
  const accounts = await apiClient.get<{ id: number }[]>(`/customers/${customerId}/accounts`);
  accountId = accounts.data[0].id;
});

describe('Loan Request', () => {

  test('POST /requestLoan — valid request matches schema', async () => {
    const res = await apiClient.post('/requestLoan', null, {
      customerId,
      amount:      1000,
      downPayment: 100,
      fromAccountId: accountId,
    });

    expect(res.status).toBe(200);
    const parsed = LoanResponseSchema.safeParse(res.data);
    expect(parsed.success).toBe(true);
    assertResponseTime(res);
  });

  test('POST /requestLoan — zero amount returns denial or 4xx', async () => {
    const res = await apiClient.post('/requestLoan', null, {
      customerId,
      amount:      0,
      downPayment: 0,
      fromAccountId: accountId,
    });

    const isRejected =
      res.status >= 400 ||
      (res.data as any)?.approved === false;

    expect(isRejected).toBe(true);
    assertResponseTime(res);
  });

});
