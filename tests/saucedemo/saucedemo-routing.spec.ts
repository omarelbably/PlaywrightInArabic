import { test } from "../../fixtures/fixture";
import InventoryPage from "../pages/inventoryPage/inventoryPage";

test.describe('Routing and Guards', () => {
  test('Unauthenticated guarded routes redirect to login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await page.waitForURL('**/');
    await page.locator('[id="login-button"]').isVisible();

    await page.goto('https://www.saucedemo.com/cart.html');
    await page.waitForURL('**/');
    await page.locator('[id="login-button"]').isVisible();
  });

  test('Deep link product after login opens correctly', async ({ page, loginPage }) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickOnLoginButton();
    const inventory = new InventoryPage(page);
    await inventory.expectLoaded();

    await page.goto('https://www.saucedemo.com/inventory-item.html?id=4');
    await page.locator('.inventory_details_name_large').isVisible();
  });

  test('Post-logout navigating to guarded routes returns to login', async ({ page, loginPage }) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickOnLoginButton();
    const inventory = new InventoryPage(page);
    await inventory.expectLoaded();

    await page.getByRole('button', { name: /open menu/i }).click();
    await page.getByRole('link', { name: /^logout$/i }).click();
    await page.locator('[id="login-button"]').isVisible();

    await page.goto('https://www.saucedemo.com/inventory.html');
    await page.waitForURL('**/');
    await page.locator('[id="login-button"]').isVisible();
  });
});
