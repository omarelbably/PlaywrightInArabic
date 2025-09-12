# 🎭 PlaywrightInArabic

**PlaywrightInArabic** is an open-source end-to-end automation framework built on [Playwright](https://playwright.dev/) 🌍, with instructions, documentation, and code comments originally in Arabic. This project is designed for QA engineers, testers, and developers—especially native Arabic speakers—who want to master test automation with Playwright.  
✨ **This README is provided in English for wider accessibility!**

---

## 📚 Table of Contents

- [✨ Features](#-features)
- [🔧 Prerequisites](#-prerequisites)
- [🚀 Getting Started](#-getting-started)
- [🗂️ Project Structure](#️-project-structure)
- [📝 Writing Tests](#-writing-tests)
- [🏃‍♂️ Running Tests](#️-running-tests)
- [💡 Best Practices](#-best-practices)
- [🛠️ Troubleshooting](#️-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📬 Contact](#-contact)

---

## ✨ Features

- 🗣️ **Arabic & English Documentation**: Code comments and documentation in both Arabic and English.
- 🎭 **Powered by Playwright**: Reliable, fast, modern cross-browser web automation.
- 🏁 **Easy Setup**: Plug-and-play for both beginners and pros.
- 🧩 **Scalable Structure**: Organize tiny projects or massive test suites with ease.
- 🛠️ **Extensible**: Add your own helpers, configs, and utilities.

---

## 🔧 Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended) 🟩
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) 📦
- Basic knowledge of JavaScript or TypeScript 📖

---

## 🚀 Getting Started

### 1. 🌀 Clone the Repository

```bash
git clone https://github.com/omarelbably/PlaywrightInArabic.git
cd PlaywrightInArabic
```

### 2. 📦 Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. 💻 Open the Project

Open the project in your favorite code editor (e.g., VSCode).

---

## 🗂️ Project Structure

```
PlaywrightInArabic/
├── tests/                  # 🧪 Test files
│   └── example.spec.js     # 📄 Example test
├── helpers/                # 🛠️ Utilities & helpers (optional)
├── configs/                # ⚙️ Config files (optional)
├── package.json            # 📦 Project config & scripts
├── playwright.config.js    # 🎭 Playwright main config
└── README.md               # 📘 This file
```

- **tests/**: All your test cases go here.
- **helpers/**: Reusable helper functions.
- **configs/**: Environment and variable configs.
- **playwright.config.js**: Main Playwright configuration.

---

## 📝 Writing Tests

Write your tests with expressive names and clear comments.  
**Example:**

```js
// tests/example.spec.js

const { test, expect } = require('@playwright/test');

test('should display the correct page title 🏷️', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle('Example Domain');
});
```

- `test`: Defines a test case.
- `expect`: Assertions for validation.

---

## 🏃‍♂️ Running Tests

Run all tests:

```bash
npx playwright test
# or
yarn playwright test
```

Run a specific test file:

```bash
npx playwright test tests/example.spec.js
```

---

## 💡 Best Practices

- 🏷️ Use descriptive test names.
- 💬 Write clear comments in your code.
- 📁 Organize tests by feature or page.
- 🔄 Refactor and update tests regularly.
- 🧹 Keep your helper functions DRY (Don’t Repeat Yourself).

---

## 🛠️ Troubleshooting

- ❓ **Playwright Not Found**
  - 👉 Solution: Install dependencies with `npm install` or `yarn install`.
- 🚫 **Browser Won’t Launch**
  - 👉 Solution: Make sure your system supports Playwright. Update browsers via `npx playwright install`.
- 🕵️ **Debugging**
  - 👉 Use `DEBUG=pw:api` for detailed Playwright logs.

---

## 🤝 Contributing

Contributions are welcome! 🎉  
Feel free to submit a Pull Request or open an Issue for feature requests or bug reports.

---

## 📬 Contact

Need support or have questions?  
Reach out to the maintainer: [omarelbably](https://github.com/omarelbably) or By [Email](omaroelbably@gmail.com).

Youtube playlist to learn Playwright in Arabic -> [Playwright in Arabic]([https://github.com/omarelbably](https://www.youtube.com/playlist?list=PLRhDWHbfIeMYC-Ejg0uRN6Xbwg_uEuOdx))
