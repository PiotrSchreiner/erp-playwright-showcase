# Test Plan: MaxonErp Test Automation

**Version:** 1.0  
**Status:** Draft  
**Reference:** ISTQB-Standard (Test Planning)  
**Author:** Piotr Schreiner

## 1. Introduction

This test plan defines the strategy for verifying the core functionalities of the MaxonErp system. The primary objective is to ensure UI stability, navigation integrity, and correct data rendering through automated End-to-End (E2E) testing.

## 2. Test Items

- **Dashboard:** Visual validation of Key Performance Indicators (KPIs) like Purchase and Sales.
- **Purchase Orders:** Verification of procurement order listings and creation flows.
- **Sales Orders:** Management and display of customer sales transactions.
- **Master Data:** Management of Customers, Suppliers, and Inventory modules.

## 3. Scope of Testing

### 3.1 Features to be Tested

- **User Authentication:** Login flow and session handling.
- **Data Rendering:** Accuracy of data tables and KPI cards (via API Mocking).
- **Form Validation:** Input handling for Master Data (adding Customers/Suppliers).
- **Navigation:** Module switching and state persistence across the ERP sidebar.

### 3.2 Features not to be Tested

- **Backend Database:** Real-time database persistence (replaced by Playwright Mocks).
- **Performance:** Load and stress testing are currently out of scope.
- **Security:** Penetration testing and advanced authorization checks.

## 4. Test Strategy

- **Test Types:** Functional Testing, Regression Testing, Smoke Testing.
- **Approach:** Black-Box testing focused on User Interface interactions.
- **Tools:** Playwright (JavaScript) for cross-browser automation.
- **Data Management:** Due to the absence of a live backend, all API responses are intercepted using `page.route()` and fulfilled with predefined JSON fixtures to simulate a stable environment.

## 5. Acceptance Criteria (Pass/Fail)

- **Pass:** All assertions (e.g., element visibility, text matching, URL changes) are met within defined timeouts.
- **Fail:** Functional defects are identified, or the UI fails to respond to automated interactions within 30 seconds.

## 6. Test Environment

- **Browsers:** Chromium, Firefox, WebKit (Safari).
- **Runtime:** Node.js v20+ for Playwright execution.
- **Environment:** Localhost:3000 (Nuxt.js Development Server).

## 7. Risks & Dependencies

- **Legacy Stack:** The application requires Node.js v16, which is incompatible with modern Playwright versions. -> **Mitigation:** Utilizing NVM to manage separate runtimes for App and Tests.
- **Unstable Selectors:** Legacy UI frameworks (Element-UI) may lack dedicated test IDs. -> **Mitigation:** Implementing robust locators such as `getByRole`, `getByText`, and ARIA labels.
