import { expect, test } from "../../fixtures/fixture";
import CheckboxesPage from "../pages/heroku/checkboxesPage/checkboxesPage";

let page: any;
let checkboxes: CheckboxesPage;

test.beforeEach(async ({ browser }) => {
	page = await browser.newPage();
	checkboxes = new CheckboxesPage(page);
	await checkboxes.navigate();
});

test.afterEach(async () => { await page.close(); });

test.describe('Checkboxes', () => {
	test('Toggle both checkboxes and via keyboard', async () => {
		const total = await checkboxes.count();
		for (let i = 0; i < total; i++) {
			const before = await checkboxes.isChecked(i);
			await checkboxes.toggle(i);
			expect(await checkboxes.isChecked(i)).toBe(!before);
		}
	});
});
