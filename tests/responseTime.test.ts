import { apiClient }          from '../src/client/apiClient';
import { login }              from '../src/helpers/auth';
import { config }             from '../src/config/env';

let customerId: number;

beforeAll(async () => {
  const result = await login();
  customerId   = result.customerId;
});

describe('Response time SLA checks', () => {
  const SLA = config.responseTimeLimit;

  const endpoints: [string, string][] = [
    ['GET /customers/{id}',          `/customers/${0}`],    // placeholder, replaced below
    ['GET /accounts',                ''],                   // placeholder
  ];

  test(`login < ${SLA}ms`, async () => {
    const res = await apiClient.post(`/login/${config.username}/${config.password}`);
    expect(res.durationMs).toBeLessThan(SLA);
  });

  test(`GET /customers/{id} < ${SLA}ms`, async () => {
    const res = await apiClient.get(`/customers/${customerId}`);
    expect(res.durationMs).toBeLessThan(SLA);
  });

  test(`GET /customers/{id}/accounts < ${SLA}ms`, async () => {
    const res = await apiClient.get(`/customers/${customerId}/accounts`);
    expect(res.durationMs).toBeLessThan(SLA);
  });
});
