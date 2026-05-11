# ERP Playwright Showcase

This repository serves as a professional demonstration of Software Quality Assurance and Test Automation skills. It features an automated testing suite for a Vue.js-based ERP system (MaxonErp).

## 🚀 Project Focus

- **Test Framework:** Playwright (JavaScript)
- **Documentation Standard:** ISTQB (International Software Testing Qualifications Board)
- **Key Challenge:** Since this is a frontend-centric showcase, a primary focus is placed on **API Mocking**. This allows for testing complex ERP workflows (Dashboard, Sales, Purchase) without requiring a live backend.

## 📄 Test Documentation

The testing process is structured according to industry standards:

- [ISTQB Test Plan](./TESTPLAN.md) - Strategic approach, scope, and acceptance criteria.

## 🛠 Setup & Installation

### Start the Application (Requires Node 16)

```bash
nvm use 16
yarn install
yarn dev
```

### Execute Tests (Requires Node 20+)

```bash
nvm use 20
npx playwright test
```
