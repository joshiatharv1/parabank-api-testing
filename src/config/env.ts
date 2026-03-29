export const config = {
  baseUrl:      process.env.BASE_URL      ?? 'https://parabank.parasoft.com/parabank/services/bank',
  username:     process.env.VALID_USER    ?? 'john',
  password:     process.env.PASSWORD      ?? 'demo',
  badPassword:  process.env.BAD_PASSWORD  ?? 'wrongpassword',
  responseTimeLimit: parseInt(process.env.RESPONSE_TIME_MS ?? '3000', 10),
};
