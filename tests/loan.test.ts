import { apiClient }          from '../src/client/apiClient';
import { assertResponseTime } from '../src/helpers/responseTime';
import { config }             from '../src/config/env';
import { LoanResponseSchema } from '../src/schemas/transfer.schema';

const CUSTOMER_ID = config.knownCustomerId;
let accountId: number;

beforeAll(async () => {
  const res = await apiClient.get<{ id: number }[]>(`/customers/${CUSTOMER_ID}/accounts`);
  accountId = res.data[0].id;
});

describe('Loan Request', () => {

  test('POST /requestLoan — valid request matches schema', async () => {
    const res = await apiClient.post('/requestLoan', null, {
      customerId:    CUSTOMER_ID,
      amount:        1000,
      downPayment:   100,
      fromAccountId: accountId,
    });

    expect(res.status).toBe(200);
    const parsed = LoanResponseSchema.safeParse(res.data);
    expect(parsed.success).toBe(true);
    assertResponseTime(res);
  });

  test('POST /requestLoan — zero amount returns denial or 4xx', async () => {
    const res = await apiClient.post('/requestLoan', null, {
      customerId:    CUSTOMER_ID,
      amount:        0,
      downPayment:   0,
      fromAccountId: accountId,
    });

    const isRejected =
      res.status >= 400 ||
      (res.data as any)?.approved === false;

    expect(isRejected).toBe(true);
    assertResponseTime(res);
  });

});
