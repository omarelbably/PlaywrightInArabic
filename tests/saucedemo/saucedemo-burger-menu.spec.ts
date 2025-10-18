import { expect, test } from "../../fixtures/fixture";
import InventoryPage from "../pages/inventoryPage/inventoryPage";
import BurgerMenu from "../pages/burgerMenu/burgerMenu";
import Header from "../pages/header/header";

test.describe('Burger Menu', () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickOnLoginButton();
    const inventory = new InventoryPage(page);
    await inventory.expectLoaded();
  });

  test('All Items, About, Reset App State, Logout', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const menu = new BurgerMenu(page);
    const header = new Header(page);

    await menu.clickAllItems();
    await inventory.expectLoaded();

    await inventory.addByName('Sauce Labs Bike Light');
    await header.expectCartCount(1);
    await menu.resetAppState();
    await header.expectCartCount(0);

    await menu.clickAbout();
    await expect(page).toHaveURL(/saucelabs\.com/i);

    await page.goto('https://www.saucedemo.com/');
    // login again to test logout
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await inventory.expectLoaded();

    await menu.clickLogout();
    await expect(page.locator('[id="login-button"]')).toBeVisible();
  });
});
