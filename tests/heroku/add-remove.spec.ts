import { expect, test } from "../../fixtures/fixture";
import AddRemoveElementsPage from "../pages/heroku/addRemoveElementsPage/addRemoveElementsPage";

let page: any;
let addRemove: AddRemoveElementsPage;

test.beforeEach(async ({ browser }) => {
	page = await browser.newPage();
	addRemove = new AddRemoveElementsPage(page);
	await addRemove.navigate();
});

test.afterEach(async () => { await page.close(); });

test.describe('Add/Remove Elements', () => {
	test('Add and remove elements per plan', async () => {
		await addRemove.addElements(1);
		expect(await addRemove.countDeletes()).toBe(1);

		await addRemove.addElements(4);
		expect(await addRemove.countDeletes()).toBe(5);

		await addRemove.deleteAll();
		expect(await addRemove.countDeletes()).toBe(0);
	});
});
