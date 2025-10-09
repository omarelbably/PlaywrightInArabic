import BasePage from "../basePage";
import { expect } from '@playwright/test';

export default class FormAuthPage extends BasePage {
    // Login page elements
    private readonly usernameField = this.page.locator('#username');
    private readonly passwordField = this.page.locator('#password');
    private readonly loginButton = this.page.locator('button[type="submit"]');
    
    // Message elements
    private readonly flashMessage = this.page.locator('#flash-messages');
    private readonly errorMessage = this.page.locator('#flash-messages .flash.error');
    private readonly successMessage = this.page.locator('#flash-messages .flash.success');
    
    // Secure area elements (after successful login)
    private readonly secureAreaHeading = this.page.locator('h2');
    private readonly logoutButton = this.page.locator('a[href="/logout"]');

    /**
     * Navigate to the form authentication page
     */
    async navigateToFormAuth() {
        await this.page.goto('https://the-internet.herokuapp.com/');
        await this.page.getByRole('link', { name: 'Form Authentication' }).click();
    }

    /**
     * Enter username into the username field
     * @param username - The username to enter
     */
    async enterUsername(username: string) {
        await this.actions.enterTextToElement(this.usernameField, username);
    }

    /**
     * Enter password into the password field
     * @param password - The password to enter
     */
    async enterPassword(password: string) {
        await this.actions.enterTextToElement(this.passwordField, password);
    }

    /**
     * Click the login button
     */
    async clickLoginButton() {
        await this.actions.clickOnElement(this.loginButton);
    }

    /**
     * Perform complete login flow
     * @param username - The username to login with
     * @param password - The password to login with
     */
    async login(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    /**
     * Get the text content of flash message (success or error)
     * @returns Promise<string | null> - The flash message text
     */
    async getFlashMessageText(): Promise<string | null> {
        return await this.actions.getElementText(this.flashMessage);
    }

    /**
     * Get the text content of error message
     * @returns Promise<string | null> - The error message text
     */
    async getErrorMessageText(): Promise<string | null> {
        return await this.actions.getElementText(this.errorMessage);
    }

    /**
     * Get the text content of success message
     * @returns Promise<string | null> - The success message text
     */
    async getSuccessMessageText(): Promise<string | null> {
        return await this.actions.getElementText(this.successMessage);
    }

    /**
     * Get the secure area heading text
     * @returns Promise<string | null> - The heading text
     */
    async getSecureAreaHeading(): Promise<string | null> {
        return await this.actions.getElementText(this.secureAreaHeading);
    }

    /**
     * Check if user is on the secure area page
     * @returns Promise<boolean> - True if on secure page
     */
    async isOnSecurePage(): Promise<boolean> {
        return this.page.url().includes('/secure');
    }

    /**
     * Check if user is on the login page
     * @returns Promise<boolean> - True if on login page
     */
    async isOnLoginPage(): Promise<boolean> {
        return this.page.url().includes('/login');
    }

    /**
     * Wait for flash message to be visible
     */
    async waitForFlashMessage() {
        await this.flashMessage.waitFor({ state: 'visible', timeout: 5000 });
    }

    /**
     * Assert successful login message
     */
    async assertSuccessfulLogin() {
        await this.waitForFlashMessage();
        const messageText = await this.getFlashMessageText();
        expect(messageText).toContain('You logged into a secure area!');
        expect(await this.isOnSecurePage()).toBe(true);
    }

    /**
     * Assert failed login message
     */
    async assertFailedLogin() {
        await this.waitForFlashMessage();
        const messageText = await this.getFlashMessageText();
        expect(messageText).toContain('invalid');
        expect(await this.isOnLoginPage()).toBe(true);
    }

    /**
     * Logout from the secure area
     */
    async logout() {
        if (await this.isOnSecurePage()) {
            await this.actions.clickOnElement(this.logoutButton);
        }
    }

    /**
     * Check if username field is visible
     * @returns Promise<boolean>
     */
    async isUsernameFieldVisible(): Promise<boolean> {
        return await this.usernameField.isVisible();
    }

    /**
     * Check if password field is visible
     * @returns Promise<boolean>
     */
    async isPasswordFieldVisible(): Promise<boolean> {
        return await this.passwordField.isVisible();
    }

    /**
     * Check if login button is visible
     * @returns Promise<boolean>
     */
    async isLoginButtonVisible(): Promise<boolean> {
        return await this.loginButton.isVisible();
    }

    /**
     * Get the page heading text
     * @returns Promise<string | null>
     */
    async getPageHeading(): Promise<string | null> {
        return await this.actions.getElementText(this.page.locator('h2'));
    }
}