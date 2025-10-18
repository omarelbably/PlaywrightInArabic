import { test } from "../../fixtures/fixture";
import DynamicLoadingPage from "../pages/heroku/dynamicLoadingPage/dynamicLoadingPage";

let page: any;
let dl: DynamicLoadingPage;

test.beforeEach(async ({ browser }) => {
	page = await browser.newPage();
	dl = new DynamicLoadingPage(page);
});

test.afterEach(async () => { await page.close(); });

test.describe('Dynamic Loading', () => {
	test('Example 1 shows Hello World', async () => {
		await dl.navigate(1);
		await dl.startAndWaitForHello();
	});

	test('Example 2 shows Hello World', async () => {
		await dl.navigate(2);
		await dl.startAndWaitForHello();
	});
});
