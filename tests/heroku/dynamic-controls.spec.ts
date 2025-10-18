import { test } from "../../fixtures/fixture";
import DynamicControlsPage from "../pages/heroku/dynamicControlsPage/dynamicControlsPage";

let page: any;
let dc: DynamicControlsPage;

test.beforeEach(async ({ browser }) => {
	page = await browser.newPage();
	dc = new DynamicControlsPage(page);
	await dc.navigate();
});

test.afterEach(async () => { await page.close(); });

test.describe('Dynamic Controls', () => {
	test('Remove and add checkbox', async () => {
		await dc.removeCheckbox();
		await dc.addCheckbox();
	});

	test('Enable, type, and disable input', async () => {
		await dc.enableInput();
		await dc.typeInInput('Hello dynamic');
		await dc.disableInput();
	});
});
