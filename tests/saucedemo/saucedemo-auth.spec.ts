import { expect, test } from "../../fixtures/fixture";
import InventoryPage from "../pages/inventoryPage/inventoryPage";
import BurgerMenu from "../pages/burgerMenu/burgerMenu";

test.describe('Authentication', () => {
  test('Standard Login and Logout', async ({ page, loginPage }) => {
    const inventory = new InventoryPage(page);
    const menu = new BurgerMenu(page);

    await page.goto('https://www.saucedemo.com/');
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickOnLoginButton();
    await inventory.expectLoaded();

    await menu.clickLogout();
    await expect(page.locator('[id="login-button"]')).toBeVisible();
  });

  test('Locked out user shows error and remains on login', async ({ page, loginPage }) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.enterUsername('locked_out_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickOnLoginButton();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[id="login-button"]')).toBeVisible();
  });

  test('Invalid credentials show error', async ({ page, loginPage }) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.enterUsername('foo');
    await loginPage.enterPassword('bar');
    await loginPage.clickOnLoginButton();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[id="login-button"]')).toBeVisible();
  });

  test('Empty fields validation', async ({ page, loginPage }) => {
    await page.goto('https://www.saucedemo.com/');
    // both empty
    await loginPage.enterUsername('');
    await loginPage.enterPassword('');
    await loginPage.clickOnLoginButton();
    await expect(page.locator('[data-test="error"]')).toBeVisible();

    // only username
    await page.reload();
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('');
    await loginPage.clickOnLoginButton();
    await expect(page.locator('[data-test="error"]')).toBeVisible();

    // only password
    await page.reload();
    await loginPage.enterUsername('');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickOnLoginButton();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});
