import { expect, test } from "../../fixtures/fixture";
import BrokenImagesPage from "../pages/heroku/brokenImagesPage/brokenImagesPage";

test('Broken Images shows at least one broken and one working image', async ({ browser }) => {
	const page = await browser.newPage();
	const bi = new BrokenImagesPage(page);
	await bi.navigate();
	const widths = await bi.getNaturalWidths();
	expect(widths.some(w => w === 0)).toBeTruthy();
	expect(widths.some(w => w > 0)).toBeTruthy();
	await page.close();
});
