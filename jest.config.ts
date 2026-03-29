import type { Config } from 'jest';

const config: Config = {
  preset:              'ts-jest',
  testEnvironment:     'node',
  testMatch:           ['**/tests/**/*.test.ts'],
  verbose:             true,
  testTimeout:         15000,
  setupFilesAfterFramework: ['./src/setup/jest.setup.ts'],
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle:  'ParaBank API Test Report',
      outputPath: 'reports/report.html',
      includeFailureMsg: true,
    }]
  ],
  collectCoverageFrom: ['src/**/*.ts'],
};

export default config;
