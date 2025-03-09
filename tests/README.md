# Playwright Test Automation Project by Katsiaryna Horbach

This repository contains Playwright test automation scripts for UI testing. The tests are executed using Playwright, with Allure integration for test reporting. The tests are written in TypeScript and can be executed both locally and through CI (GitHub Actions).

## Requirements

- Node.js v18 or higher
- NPM or Yarn
- Allure Command Line (for test reporting)

## Setup Instructions

### Installation

1. Clone the repository
```bash
git clone https://github.com/Aviv-public/aviv-qa-technical-test.git
cd aviv-qa-technical-test
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Clone the repository with tests
```bash
git clone https://github.com/khorbach/aviv-qa-technical-test.git
cd aviv-qa-technical-test
cd tests
```
   
5. Install Allure Command Line (local installation)
```bash
npm install allure-commandline --save-dev
```

6. Run the Tests Locally
```bash
npx playwright test
```

7. Generate the Allure report:
```bash
allure generate allure-results --clean -o allure-report
```

8. Open the Allure report:
```bash
allure open allure-report
```

## Running Tests on CI (GitHub Actions)
This project includes a GitHub Actions configuration to run the tests automatically on CI. You can find the CI configuration in .github/workflows/ci.yml. It is configured to:

1. Run tests on every push to the repository.
2. Run tests nightly at 00:00 (midnight).
