import { expect, test } from "../../fixtures/fixture";
import ChallengingDomPage from "../pages/heroku/challengingDomPage/challengingDomPage";

test.describe('Challenging DOM', () => {
	test('Click action buttons and verify table exists', async ({ browser }) => {
		const page = await browser.newPage();
		const cdom = new ChallengingDomPage(page);
		await cdom.navigate();
		await cdom.clickAllButtonsOnce();
		expect(await cdom.rowCount()).toBeGreaterThan(0);
		await page.close();
	});
});
