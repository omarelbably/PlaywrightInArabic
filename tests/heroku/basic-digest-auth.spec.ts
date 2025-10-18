import { test } from "../../fixtures/fixture";
import BasicAuthPage from "../pages/heroku/basicAuthPage/basicAuthPage";
import DigestAuthPage from "../pages/heroku/digestAuthPage/digestAuthPage";

test.describe('Auth modules', () => {
	test('Basic auth with valid creds', async ({ browser }) => {
		const page = await browser.newPage();
		const basic = new BasicAuthPage(page);
		await basic.navigateWithCreds('admin', 'admin');
		await basic.assertSuccess();
		await page.close();
	});

	test('Digest auth with valid creds', async ({ browser }) => {
		const page = await browser.newPage();
		const digest = new DigestAuthPage(page);
		await digest.navigateWithCreds('admin', 'admin');
		await digest.assertSuccess();
		await page.close();
	});
});
