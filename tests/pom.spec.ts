import { Locator } from "playwright/test";
import { expect, test } from "../fixtures/fixture";
import LoginPage from "./pages/loginPage/loginPage";
import ProductPage from "./pages/productPage/productPage";
import * as testData from "./testData/testData.json";
import { get } from "http";
import path from 'path';
import Actions from "./pages/actions";
import * as dotenv from 'dotenv';
import { log } from "console";
dotenv.config({path: './.env'});

let page:any;
let loginPage: LoginPage;
let productPage: ProductPage;
let actions: Actions;
test.beforeEach(async({browser})=>{
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    actions = new Actions(page);

    await page.goto('https://www.saucedemo.com/');
})
test.afterEach(async()=>{
    await page.close();

})

test('E2E', async({})=>{
    await loginPage.enterUsername(testData.username);
    await loginPage.enterPassword(testData.password);
    await loginPage.actions.takeScreenshot('./tests/screenshots/loginPage.png');
    await loginPage.clickOnLoginButton();
    await productPage.clickOnAddToCartBtn();
    await productPage.actions.takeScreenshot('./tests/screenshots/productPage.png');
    await productPage.clickOnCartBtn();
    await productPage.actions.takeScreenshot('./tests/screenshots/cartPage.png');    
});

test('outside suite @sanity', async({})=>{
    console.log('outside the suite sanity');
})
test('outside suite @smoke', async({})=>{
    console.log('outside the suite smoke');
})
test('outside suite2 @smoke', async({})=>{
    console.log('outside the suite smoke again');
})


test('getText', async()=>{
    await page.goto('https://www.saucedemo.com/');

    const title = page.locator('.login_logo');
    const loginBtn = page.locator('[id="login-button"]');
    // actions.getElementScreenshot(title, path.join(__dirname, '../tests/screenshots/title.png'));
    expect(await page.screenshot()).toMatchSnapshot('loginPage.png');
    expect(page).toHaveScreenshot('page.png');
    expect(await title.screenshot()).toMatchSnapshot('title.png');
    expect(await loginBtn.screenshot()).toMatchSnapshot('loginBtn.png');
    expect(await actions.getElementText(title)).toMatchSnapshot('loginBtnText.txt');
    console.log(await actions.getElementText(title));
    expect(await loginBtn).toHaveCSS('margin-bottom', '15px');
    expect(await loginBtn).toHaveCSS('display','inline-block');
});

test('codegenT', async () => {
  await page.goto(process.env.base_url);
  await expect(page.locator('[data-test="username"]')).toBeVisible();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill(process.env.login_username);
  await expect(page.locator('[data-test="password"]')).toBeVisible();
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill(process.env.login_password);
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toContainText('Products');
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  await page.locator('[data-test="checkout"]').click();
  await expect(page.locator('[data-test="firstName"]')).toBeVisible();
});




test('Visual Testing', async()=> {
    await page.goto('https://www.saucedemo.com/');

    const title = page.locator('.login_logo');
    const loginBtn = page.locator('[id="login-button"]');

    expect(await page.screenshot()).toMatchSnapshot('loginPage.png');
    expect(await title.screenshot()).toMatchSnapshot('title.png');
    expect(await loginBtn.screenshot()).toMatchSnapshot('loginBtn.png');
    expect(await actions.getElementText(title)).toMatchSnapshot('titleText.txt');

    expect(await loginBtn).toHaveCSS('display', 'inline-block');
    expect(await loginBtn).toHaveCSS('margin-bottom', '15px');
});
