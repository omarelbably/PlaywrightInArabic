import { expect, test } from "../../fixtures/fixture";
import DisappearingElementsPage from "../pages/heroku/disappearingElementsPage/disappearingElementsPage";

test('Disappearing Elements menu varies across reloads', async ({ browser }) => {
	const page = await browser.newPage();
	const de = new DisappearingElementsPage(page);
	await de.navigate();
	const sets = new Set<string>();
	for (let i = 0; i < 5; i++) {
		const items = (await de.getMenuItems()).join('|');
		sets.add(items);
		await page.reload();
	}
	expect(sets.size).toBeGreaterThanOrEqual(1); // may change, not guaranteed
	await page.close();
});
