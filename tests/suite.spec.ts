import { Page } from "@playwright/test";
import { expect, test } from "../fixtures/fixture";
import * as testData from "./testData/testData.json";
import LoginPage from "./pages/loginPage/loginPage";
import ProductPage from "./pages/productPage/productPage";

let page:Page;
let loginPage: LoginPage;
let productPage: ProductPage;
test.describe('Suite 1',()=>{
test.beforeEach(async({browser})=>{
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    await page.goto('https://www.saucedemo.com/');
});
test.afterEach(async({})=>{
    await page.close();
});

test('E2E', async({})=>{
    await loginPage.enterUsername(testData.username);
    await loginPage.enterPassword(testData.password);
    await loginPage.actions.takeScreenshot('./tests/screenshots/loginPage.png');
    await loginPage.clickOnLoginButton();
    await productPage.clickOnAddToCartBtn();
    await productPage.actions.takeScreenshot('./tests/screenshots/productPage.png');
    await productPage.clickOnCartBtn();
    await productPage.actions.takeScreenshot('./tests/screenshots/cartPage.png');    
})

test('E2E2', async({})=>{
    await loginPage.enterUsername(testData.username);
    await loginPage.enterPassword(testData.password);
    await loginPage.actions.takeScreenshot('./tests/screenshots/loginPage.png');
    await loginPage.clickOnLoginButton();
    await productPage.clickOnAddToCartBtn();
    await productPage.actions.takeScreenshot('./tests/screenshots/productPage.png');
    await productPage.clickOnCartBtn();
    await productPage.actions.takeScreenshot('./tests/screenshots/cartPage.png');    
})
})

test('alone', async()=>{
    console.log("I'm alone");
})

