import { expect, test } from "../../fixtures/fixture";
import InventoryPage from "../pages/inventoryPage/inventoryPage";
import CartPage from "../pages/cartPage/cartPage";
import CheckoutInfoPage from "../pages/checkoutInfoPage/checkoutInfoPage";
import CheckoutOverviewPage from "../pages/checkoutOverviewPage/checkoutOverviewPage";
import CheckoutCompletePage from "../pages/checkoutCompletePage/checkoutCompletePage";
import Header from "../pages/header/header";

test.describe('Checkout', () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickOnLoginButton();
  });

  test('Your Information validation for missing fields', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const info = new CheckoutInfoPage(page);
    const header = new Header(page);

    await inventory.addByName('Sauce Labs Backpack');
    await header.expectCartCount(1);

    await header.openCart();
    await cart.expectLoaded();
    await cart.checkout();
    await info.expectLoaded();

    await info.continue();
    await expect(info.error).toBeVisible();

    await info.fill('John', '', '');
    await info.continue();
    await expect(info.error).toBeVisible();

    await page.reload();
    await info.fill('John', 'Doe', '');
    await info.continue();
    await expect(info.error).toBeVisible();
  });

  test('Finish order and Back Home resets cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const info = new CheckoutInfoPage(page);
    const overview = new CheckoutOverviewPage(page);
    const complete = new CheckoutCompletePage(page);
    const header = new Header(page);

    await inventory.addByName('Sauce Labs Backpack');
    await inventory.addByName('Sauce Labs Bolt T-Shirt');
    await header.expectCartCount(2);
    await header.openCart();
    await cart.expectLoaded();

    await cart.checkout();
    await info.expectLoaded();
    await info.fill('John', 'Doe', '90210');
    await info.continue();

    const overviewPage = overview; // alias
    await overviewPage.expectLoaded();
    await overviewPage.expectTotalsVisible();
    await overviewPage.finish();

    await complete.expectLoaded();
    await complete.backToInventory();
    await inventory.expectLoaded();
    await header.expectCartCount(0);
  });

  test('Cancel during checkout returns to Cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const info = new CheckoutInfoPage(page);
    const overview = new CheckoutOverviewPage(page);
    const header = new Header(page);

    await inventory.addByName('Sauce Labs Onesie');
    await header.openCart();
    await cart.checkout();
    await info.expectLoaded();

    await info.cancel();
    await cart.expectLoaded();

    await cart.checkout();
    await info.fill('John', 'Doe', '90210');
    await info.continue();
    await overview.expectLoaded();
    await overview.cancel();
    await cart.expectLoaded();
  });
});
