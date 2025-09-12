
# PlaywrightInArabic 🎭🌍

Welcome to **PlaywrightInArabic**! This project is a comprehensive end-to-end (E2E) testing framework built with [Playwright](https://playwright.dev/) and designed to help you write, run, and report on automated browser tests with ease. The framework is structured for clarity, scalability, and best practices, with a focus on accessibility for Arabic-speaking testers and developers.

---

## 🚀 Features

- **Modern E2E Testing** with Playwright
- **Allure Reporting** for beautiful, interactive test reports
- **Fixtures & Test Data** for reusable, maintainable tests
- **Page Object Model (POM)** structure for scalable automation
- **CI/CD Integration** via GitHub Actions
- **Screenshots, Traces, and Attachments** for debugging
- **Comprehensive Examples** to get you started

---

## 📁 Project Structure

```
PlaywrightInArabic/
├── allure-report/         # Allure HTML reports
├── allure-results/        # Allure raw results (JSON, attachments)
├── fixtures/              # Custom Playwright fixtures
│   └── fixture.ts
├── playwright-report/     # Playwright's default HTML reports
├── test-results/          # Test run artifacts (traces, screenshots)
├── tests/                 # Main test suite
│   ├── actions.spec.ts
│   ├── api.spec.ts
│   ├── ...
│   ├── pages/             # Page Object Model classes
│   ├── screenshots/       # Screenshots from test runs
│   └── testData/          # Test data files
├── tests-examples/        # Example tests for learning
├── random_data.txt        # Sample data for tests
├── package.json           # Project dependencies & scripts
├── playwright.config.ts   # Playwright configuration
└── .github/workflows/     # GitHub Actions CI/CD config
```

---

## 🛠️ Getting Started

### 1. **Clone the Repository**

```bash
git clone https://github.com/omarelbably/PlaywrightInArabic.git
cd PlaywrightInArabic
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Run Tests**

```bash
npx playwright test
```

### 4. **View Playwright Report**

```bash
npx playwright show-report
```

### 5. **Generate Allure Report**

```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---

## 🧩 Key Concepts

### 🏗️ **Page Object Model (POM)**
- Organize your UI interactions in `tests/pages/`.
- Each page/component gets its own class for maintainability.

### 🧪 **Fixtures**
- Reusable setup/teardown logic in `fixtures/fixture.ts`.
- Use for authentication, test data, or browser context setup.

### 🗂️ **Test Data**
- Store static or dynamic data in `tests/testData/` or `random_data.txt`.

### 📸 **Screenshots & Traces**
- Automatically captured on test failure for easy debugging.
- Find them in `tests/screenshots/` and `test-results/`.

### 📊 **Allure Reporting**
- Rich, interactive reports with history, trends, and attachments.
- Open `allure-report/index.html` after generating the report.

### 🤖 **CI/CD with GitHub Actions**
- Automated test runs on every push/PR via `.github/workflows/playwright.yml`.
- Ensures code quality and reliability.

---

## 📜 Example Test

```typescript
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
```

---

## 📝 Scripts

| Script                        | Description                       |
|-------------------------------|-----------------------------------|
| `npx playwright test`         | Run all tests                     |
| `npx playwright show-report`  | Open Playwright HTML report        |
| `npx allure generate ...`     | Generate Allure report             |
| `npx allure open ...`         | Open Allure HTML report            |

---

## 🧑‍💻 Contributing

1. Fork the repo 🍴
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request 🚀

---

## ❓ FAQ

- **How do I add a new test?**
  - Create a new `.spec.ts` file in `tests/` and follow the Playwright test structure.
- **How do I add a new page object?**
  - Add a new class in `tests/pages/` and use it in your tests.
- **How do I run tests in CI?**
  - Push your changes; GitHub Actions will run tests automatically.
- **Where are test artifacts stored?**
  - See `test-results/`, `allure-results/`, and `playwright-report/`.

---

## 🌐 Resources

- [Playwright Docs](https://playwright.dev/)
- [Allure Docs](https://docs.qameta.io/allure/)
- [Playwright Test Examples](https://github.com/microsoft/playwright-test)

---

## 🏆 Credits

Made with ❤️ by [Omar Elbably](https://github.com/omarelbably) and contributors.

---

## 📬 Contact

Need support or have questions?  
Reach out to the maintainer: [omarelbably](https://github.com/omarelbably) or By [Email](omaroelbably@gmail.com).

Youtube playlist to learn Playwright in Arabic -> [Playwright in Arabic](https://www.youtube.com/playlist?list=PLRhDWHbfIeMYC-Ejg0uRN6Xbwg_uEuOdx)
