import { test as baseTest } from '@playwright/test';
import LoginPage from '../tests/pages/loginPage/loginPage';
import ProductPage from '../tests/pages/productPage/productPage';

type pages={
    loginPage:LoginPage;
    productPage:ProductPage;
}

const testPages = baseTest.extend<pages>({
    loginPage: async({page}, use)=>{
        await use(new LoginPage(page))
    },
    productPage: async({page}, use)=>{
        await use(new ProductPage(page))
    }
})

export const test = testPages;
export const expect = testPages.expect;