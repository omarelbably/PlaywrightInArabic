import { expect, test } from "../../fixtures/fixture";
import JQueryMenusPage from "../pages/heroku/jqueryMenusPage/jqueryMenusPage";
import JavascriptErrorPage from "../pages/heroku/javascriptErrorPage/javascriptErrorPage";
import KeyPressesPage from "../pages/heroku/keyPressesPage/keyPressesPage";
import LargeDomPage from "../pages/heroku/largeDomPage/largeDomPage";

test('jQuery UI Menus navigation', async ({ browser }) => {
	const page = await browser.newPage();
	const jq = new JQueryMenusPage(page);
	await jq.navigate();
	await jq.openDownloads();
	await page.close();
});

test('JavaScript onload error appears in console', async ({ browser }) => {
	const page = await browser.newPage();
	const errors: string[] = [];
	page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
	const je = new JavascriptErrorPage(page);
	await je.navigate();
	await page.waitForTimeout(500);
	expect(errors.length).toBeGreaterThanOrEqual(1);
	await page.close();
});

test('Key presses reflect in result', async ({ browser }) => {
	const page = await browser.newPage();
	const kp = new KeyPressesPage(page);
	await kp.navigate();
	await kp.press('A');
	expect(await kp.text()).toContain('A');
	await page.close();
});

test('Large DOM loads and scroll works', async ({ browser }) => {
	const page = await browser.newPage();
	const large = new LargeDomPage(page);
	await large.navigate();
	await large.scroll();
	await page.close();
});
