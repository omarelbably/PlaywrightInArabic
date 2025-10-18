import { expect, test } from "../../fixtures/fixture";
import InventoryPage from "../pages/inventoryPage/inventoryPage";
import ProductDetailsPage from "../pages/productDetailsPage/productDetailsPage";
import Header from "../pages/header/header";

test.describe('Inventory', () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickOnLoginButton();
  });

  test('Sorting reorders items correctly', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.expectLoaded();

    await expect(inventory.itemNames.first()).toHaveText('Sauce Labs Backpack');
    await expect(inventory.itemNames.last()).toHaveText('Test.allTheThings() T-Shirt (Red)');

    await inventory.sortBy('za');
    await expect(inventory.itemNames.first()).toHaveText('Test.allTheThings() T-Shirt (Red)');
    await expect(inventory.itemNames.last()).toHaveText('Sauce Labs Backpack');

    await inventory.sortBy('lohi');
    await expect(inventory.itemNames.first()).toHaveText('Sauce Labs Onesie');
    await expect(inventory.itemNames.last()).toHaveText('Sauce Labs Fleece Jacket');

    await inventory.sortBy('hilo');
    await expect(inventory.itemNames.first()).toHaveText('Sauce Labs Fleece Jacket');
    await expect(inventory.itemNames.last()).toHaveText('Sauce Labs Onesie');
  });

  test('Product tile to details and back preserves state', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const details = new ProductDetailsPage(page);
    await inventory.expectLoaded();

    await inventory.openDetails('Sauce Labs Backpack');
    await details.expectLoadedWith('Sauce Labs Backpack');

    await details.backToProducts();
    await inventory.expectLoaded();
  });

  test('Add/Remove from inventory updates cart badge', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const header = new Header(page);
    await inventory.expectLoaded();

    await inventory.addByName('Sauce Labs Backpack');
    await inventory.addByName('Sauce Labs Bike Light');
    await header.expectCartCount(2);

    await inventory.removeByName('Sauce Labs Bike Light');
    await header.expectCartCount(1);
  });
});
