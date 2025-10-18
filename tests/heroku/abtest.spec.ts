import { expect, test } from "../../fixtures/fixture";
import ABTestingPage from "../pages/heroku/abTestingPage/abTestingPage";

test('A/B Testing shows allowed headers', async ({ browser }) => {
	const page = await browser.newPage();
	const ab = new ABTestingPage(page);
	await ab.navigate();
	const header = await ab.headerText();
	expect(["A/B Test Control", "A/B Test Variation 1"]).toContain(header);
	await page.close();
});
