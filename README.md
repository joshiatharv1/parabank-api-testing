 # ParaBank API Testing Framework

 Production API test suite for the ParaBank REST banking API.
 Built with TypeScript, Jest, Axios, and Zod.

 ## Stack
 | Tool    | Purpose                  |
 |---------|--------------------------|
 | Jest    | Test runner              |
 | Axios   | HTTP client              |
 | Zod     | Schema validation        |
 | ts-jest | TypeScript Jest bridge   |
 | GitHub Actions | CI/CD           |

 ## Quick Start
 ```bash
 npm install
 cp .env.example .env
 npm test
 ```

 ## Test Coverage (20 tests)
 - Auth (4): valid login, bad password, unknown user, empty creds
 - Customer (5): get customer, schema check, accounts list, 404, unauthorized
 - Accounts (5): get account, balance type, transactions, invalid id, transfer
 - Bill Pay (2): valid payment, missing amount
 - Loan (2): valid loan schema, zero amount denial
 - Response Time SLA (3): login, customer, accounts all under 3000ms