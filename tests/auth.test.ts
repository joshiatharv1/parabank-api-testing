import { apiClient }        from '../src/client/apiClient';
import { assertResponseTime } from '../src/helpers/responseTime';
import { config }           from '../src/config/env';

describe('Authentication', () => {

  test('valid login returns 200 and a customerId', async () => {
    const res = await apiClient.post(`/login/${config.username}/${config.password}`);

    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('customerId');
    expect(typeof (res.data as any).customerId).toBe('number');
    assertResponseTime(res);
  });

  test('invalid password returns 401 or 500', async () => {
    const res = await apiClient.post(`/login/${config.username}/${config.badPassword}`);

    expect([401, 500]).toContain(res.status);
    assertResponseTime(res);
  });

  test('unknown username returns 401 or 500', async () => {
    const res = await apiClient.post('/login/ghost_user/any_password');

    expect([401, 500]).toContain(res.status);
    assertResponseTime(res);
  });

  test('empty credentials returns 4xx or 5xx', async () => {
    const res = await apiClient.post('/login/ / ');

    expect(res.status).toBeGreaterThanOrEqual(400);
    assertResponseTime(res);
  });

});
