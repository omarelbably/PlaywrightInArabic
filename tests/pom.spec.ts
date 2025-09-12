import { expect, test } from "../fixtures/fixture";
import LoginPage from "./pages/loginPage/loginPage";
import ProductPage from "./pages/productPage/productPage";
import * as testData from "./testData/testData.json";

let page;
let loginPage;
let productPage;
test.describe('suite 1', ()=>{
test.beforeEach(async({browser})=>{
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    await page.goto('https://www.saucedemo.com/');
})
test.afterEach(async()=>{
    await page.close();

})

test('E2E', async({})=>{
    await loginPage.enterUsername(testData.username);
    await loginPage.enterPassword(testData.password);
    await loginPage.takeScreenshot('./tests/screenshots/loginPage.png');
    await loginPage.clickOnLoginButton();
    await productPage.clickOnAddToCartBtn();
    await productPage.takeScreenshot('./tests/screenshots/productPage.png');
    await productPage.clickOnCartBtn();
    await productPage.takeScreenshot('./tests/screenshots/cartPage.png');    
})
})

test('outside suite @sanity', async({})=>{
    console.log('outside the suite sanity');
})
test('outside suite @smoke', async({})=>{
    console.log('outside the suite smoke');
})
test('outside suite2 @smoke', async({})=>{
    console.log('outside the suite smoke again');
})



