import { expect, test } from "../../fixtures/fixture";
import InventoryPage from "../pages/inventoryPage/inventoryPage";
import Footer from "../pages/footer/footer";

test.describe('Footer and Social Links', () => {
  test('Links have correct destinations', async ({ page, loginPage }) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickOnLoginButton();
    const inventory = new InventoryPage(page);
    await inventory.expectLoaded();

    const footer = new Footer(page);
    await expect(footer.twitter).toHaveAttribute('href', /twitter\.com/i);
    await expect(footer.facebook).toHaveAttribute('href', /facebook\.com/i);
    await expect(footer.linkedin).toHaveAttribute('href', /linkedin\.com/i);
  });
});
