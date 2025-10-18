import { test } from "../../fixtures/fixture";
import InventoryPage from "../pages/inventoryPage/inventoryPage";
import ProductDetailsPage from "../pages/productDetailsPage/productDetailsPage";
import CartPage from "../pages/cartPage/cartPage";
import Header from "../pages/header/header";

test.describe('Cart', () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickOnLoginButton();
  });

  test('Add from details then verify in cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const details = new ProductDetailsPage(page);
    const cart = new CartPage(page);
    const header = new Header(page);

    await inventory.openDetails('Sauce Labs Backpack');
    await details.expectLoadedWith('Sauce Labs Backpack');
    await details.addToCart();
    await header.expectCartCount(1);

    await header.openCart();
    await cart.expectLoaded();
    await cart.expectItemsPresent(['Sauce Labs Backpack']);
  });

  test('Remove item from cart updates badge', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const header = new Header(page);

    await inventory.addByName('Sauce Labs Backpack');
    await inventory.addByName('Sauce Labs Bolt T-Shirt');
    await header.expectCartCount(2);

    await header.openCart();
    await cart.expectLoaded();
    await cart.remove('Sauce Labs Bolt T-Shirt');
    await header.expectCartCount(1);
  });

  test('Cart persists across navigation and refresh', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const header = new Header(page);

    await inventory.addByName('Sauce Labs Backpack');
    await inventory.addByName('Sauce Labs Onesie');
    await header.expectCartCount(2);

    await inventory.openDetails('Sauce Labs Onesie');
    await page.goBack();
    await header.openCart();
    await page.reload();

    await header.expectCartCount(2);
  });
});
