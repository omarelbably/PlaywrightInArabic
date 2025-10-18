import { test as baseTest } from '@playwright/test';
import LoginPage from '../tests/pages/loginPage/loginPage';
import ProductPage from '../tests/pages/productPage/productPage';
import Header from '../tests/pages/header/header';
import BurgerMenu from '../tests/pages/burgerMenu/burgerMenu';
import InventoryPage from '../tests/pages/inventoryPage/inventoryPage';
import ProductDetailsPage from '../tests/pages/productDetailsPage/productDetailsPage';
import CartPage from '../tests/pages/cartPage/cartPage';
import CheckoutInfoPage from '../tests/pages/checkoutInfoPage/checkoutInfoPage';
import CheckoutOverviewPage from '../tests/pages/checkoutOverviewPage/checkoutOverviewPage';
import CheckoutCompletePage from '../tests/pages/checkoutCompletePage/checkoutCompletePage';
import Footer from '../tests/pages/footer/footer';

type pages={
    loginPage: LoginPage;
    productPage: ProductPage;
    header: Header;
    burgerMenu: BurgerMenu;
    inventoryPage: InventoryPage;
    productDetailsPage: ProductDetailsPage;
    cartPage: CartPage;
    checkoutInfoPage: CheckoutInfoPage;
    checkoutOverviewPage: CheckoutOverviewPage;
    checkoutCompletePage: CheckoutCompletePage;
    footer: Footer;
}

const testPages = baseTest.extend<pages>({
    loginPage: async({page}, use)=>{
        await use(new LoginPage(page));
    },
    productPage: async({page}, use)=>{
        await use(new ProductPage(page));
    },
    header: async({page}, use)=>{
        await use(new Header(page));
    },
    burgerMenu: async({page}, use)=>{
        await use(new BurgerMenu(page));
    },
    inventoryPage: async({page}, use)=>{
        await use(new InventoryPage(page));
    },
    productDetailsPage: async({page}, use)=>{
        await use(new ProductDetailsPage(page));
    },
    cartPage: async({page}, use)=>{
        await use(new CartPage(page));
    },
    checkoutInfoPage: async({page}, use)=>{
        await use(new CheckoutInfoPage(page));
    },
    checkoutOverviewPage: async({page}, use)=>{
        await use(new CheckoutOverviewPage(page));
    },
    checkoutCompletePage: async({page}, use)=>{
        await use(new CheckoutCompletePage(page));
    },
    footer: async({page}, use)=>{
        await use(new Footer(page));
    },
})

export const test = testPages;
export const expect = testPages.expect;