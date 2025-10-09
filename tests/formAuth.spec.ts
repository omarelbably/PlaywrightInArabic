import { expect, test } from "../fixtures/fixture";
import FormAuthPage from "./pages/formAuthPage/formAuthPage";

let page: any;
let formAuthPage: FormAuthPage;

// Valid credentials from the application
const VALID_CREDENTIALS = {
    username: 'tomsmith',
    password: 'SuperSecretPassword!'
};

// Invalid credentials for negative testing
const INVALID_CREDENTIALS = {
    username: 'invaliduser',
    password: 'invalidpass'
};

test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    formAuthPage = new FormAuthPage(page);
    
    // Navigate to the form authentication page
    await formAuthPage.navigateToFormAuth();
});

test.afterEach(async () => {
    await page.close();
});

test.describe('Form Authentication Tests', () => {
    
    test('Successful login with valid credentials', async () => {
        test.setTimeout(30000); // Increase timeout for 10-second wait
        
        // Perform login with valid credentials
        await formAuthPage.login(VALID_CREDENTIALS.username, VALID_CREDENTIALS.password);
        
        // Assert successful login
        await formAuthPage.assertSuccessfulLogin();
        
        // Take screenshot for evidence
        await formAuthPage.actions.takeScreenshot('./tests/screenshots/successful-login.png');
        
        // Wait for 10 seconds as requested
        await page.waitForTimeout(10000);
        
        // Additional verification: Check secure area heading
        const heading = await formAuthPage.getSecureAreaHeading();
        expect(heading).toContain('Secure Area');
    });

    test('Failed login with invalid username', async () => {
        test.setTimeout(30000); // Increase timeout for 10-second wait
        
        // Perform login with invalid username
        await formAuthPage.login(INVALID_CREDENTIALS.username, VALID_CREDENTIALS.password);
        
        // Assert failed login
        await formAuthPage.assertFailedLogin();
        
        // Take screenshot for evidence
        await formAuthPage.actions.takeScreenshot('./tests/screenshots/failed-login-invalid-username.png');
        
        // Wait for 10 seconds as requested
        await page.waitForTimeout(10000);
        
        // Verify specific error message
        const errorMessage = await formAuthPage.getFlashMessageText();
        expect(errorMessage).toContain('Your username is invalid!');
    });

    test('Failed login with invalid password', async () => {
        test.setTimeout(30000); // Increase timeout for 10-second wait
        
        // Perform login with invalid password
        await formAuthPage.login(VALID_CREDENTIALS.username, INVALID_CREDENTIALS.password);
        
        // Assert failed login
        await formAuthPage.assertFailedLogin();
        
        // Take screenshot for evidence
        await formAuthPage.actions.takeScreenshot('./tests/screenshots/failed-login-invalid-password.png');
        
        // Wait for 10 seconds as requested
        await page.waitForTimeout(10000);
        
        // Verify specific error message (could be password invalid or username invalid depending on validation order)
        const errorMessage = await formAuthPage.getFlashMessageText();
        expect(errorMessage).toContain('invalid');
    });

    test('Failed login with both invalid credentials', async () => {
        test.setTimeout(30000); // Increase timeout for 10-second wait
        
        // Perform login with both invalid credentials
        await formAuthPage.login(INVALID_CREDENTIALS.username, INVALID_CREDENTIALS.password);
        
        // Assert failed login
        await formAuthPage.assertFailedLogin();
        
        // Take screenshot for evidence
        await formAuthPage.actions.takeScreenshot('./tests/screenshots/failed-login-both-invalid.png');
        
        // Wait for 10 seconds as requested
        await page.waitForTimeout(10000);
        
        // Verify error message appears
        const errorMessage = await formAuthPage.getFlashMessageText();
        expect(errorMessage).toContain('invalid');
    });

    test('Login and logout flow', async () => {
        test.setTimeout(30000); // Increase timeout for 10-second wait
        
        // Step 1: Login with valid credentials
        await formAuthPage.login(VALID_CREDENTIALS.username, VALID_CREDENTIALS.password);
        await formAuthPage.assertSuccessfulLogin();
        
        // Take screenshot of successful login
        await formAuthPage.actions.takeScreenshot('./tests/screenshots/login-logout-success.png');
        
        // Step 2: Wait for 5 seconds
        await page.waitForTimeout(5000);
        
        // Step 3: Logout
        await formAuthPage.logout();
        
        // Step 4: Verify back on login page
        expect(await formAuthPage.isOnLoginPage()).toBe(true);
        
        // Take screenshot of logout
        await formAuthPage.actions.takeScreenshot('./tests/screenshots/login-logout-after-logout.png');
        
        // Wait for remaining 5 seconds to complete 10 seconds total
        await page.waitForTimeout(5000);
    });

    test('Verify page elements are present', async () => {
        test.setTimeout(30000); // Increase timeout for 10-second wait
        
        // Verify all necessary elements are present on the login page
        expect(await formAuthPage.isUsernameFieldVisible()).toBe(true);
        expect(await formAuthPage.isPasswordFieldVisible()).toBe(true);
        expect(await formAuthPage.isLoginButtonVisible()).toBe(true);
        
        // Verify page heading
        const pageHeading = await formAuthPage.getPageHeading();
        expect(pageHeading).toBe('Login Page');
        
        // Take screenshot for documentation
        await formAuthPage.actions.takeScreenshot('./tests/screenshots/login-page-elements.png');
        
        // Wait for 10 seconds as requested
        await page.waitForTimeout(10000);
    });
});

// Additional test outside the describe block (following the existing pattern)
test('Form Auth - Quick Smoke Test @smoke', async () => {
    test.setTimeout(30000); // Increase timeout for 10-second wait
    
    // Quick smoke test - just verify navigation and basic elements
    expect(await formAuthPage.isUsernameFieldVisible()).toBe(true);
    expect(await formAuthPage.isPasswordFieldVisible()).toBe(true);
    expect(await formAuthPage.isLoginButtonVisible()).toBe(true);
    
    console.log('Form Authentication smoke test completed');
    
    // Wait for 10 seconds as requested
    await page.waitForTimeout(10000);
});