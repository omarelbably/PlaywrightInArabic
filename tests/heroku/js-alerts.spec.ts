import { expect, test } from "../../fixtures/fixture";
import JavascriptAlertsPage from "../pages/heroku/javascriptAlertsPage/javascriptAlertsPage";

let page: any;
let alerts: JavascriptAlertsPage;

test.beforeEach(async ({ browser }) => {
	page = await browser.newPage();
	alerts = new JavascriptAlertsPage(page);
	await alerts.navigate();
});

test.afterEach(async () => { await page.close(); });

test.describe('JavaScript Alerts', () => {
	test('JS Alert accept', async () => {
		await alerts.clickAlertAndAccept();
		expect(await alerts.getResultText()).toContain('You successfully clicked an alert');
	});

	test('JS Confirm accept and dismiss', async () => {
		await alerts.clickConfirm(true);
		expect(await alerts.getResultText()).toContain('You clicked: Ok');

		await alerts.clickConfirm(false);
		expect(await alerts.getResultText()).toContain('You clicked: Cancel');
	});

	test('JS Prompt input and dismiss', async () => {
		await alerts.clickPromptAndRespond('Hello', true);
		expect(await alerts.getResultText()).toContain('You entered: Hello');

		await alerts.clickPromptAndRespond('', false);
		expect(await alerts.getResultText()).toContain('You entered: null');
	});
});
