/** @type {import('jest').Config} */
module.exports = {
  preset:          'ts-jest',
  testEnvironment: 'node',
  testMatch:       ['**/tests/**/*.test.ts'],
  verbose:         true,
  testTimeout:     15000,
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle:         'ParaBank API Test Report',
      outputPath:        'reports/report.html',
      includeFailureMsg: true,
    }]
  ],
  collectCoverageFrom: ['src/**/*.ts'],
};
