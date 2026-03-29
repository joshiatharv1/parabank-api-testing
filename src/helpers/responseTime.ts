import { config } from '../config/env';
import { TimedResponse } from '../client/apiClient';

export function assertResponseTime(res: TimedResponse, limitMs = config.responseTimeLimit): void {
  expect(res.durationMs).toBeLessThan(limitMs);
}
