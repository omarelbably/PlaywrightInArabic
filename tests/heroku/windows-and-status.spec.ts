import { expect, test } from "../../fixtures/fixture";
import WindowsPage from "../pages/heroku/windowsPage/windowsPage";
import StatusCodesPage from "../pages/heroku/statusCodesPage/statusCodesPage";

let page: any;

test.describe('Multiple Windows and Status Codes', () => {
	test('Open new window and verify header', async ({ browser }) => {
		page = await browser.newPage();
		const windows = new WindowsPage(page);
		await windows.navigate();
		const popup = await windows.openNewWindow();
		await popup.waitForLoadState('domcontentloaded');
		await expect(popup.getByRole('heading', { name: 'New Window' })).toBeVisible();
		await popup.close();
		await page.close();
	});

	test('Status codes pages contain code text', async ({ browser }) => {
		page = await browser.newPage();
		const status = new StatusCodesPage(page);
		await status.navigate();

		for (const code of ['200', '301', '404', '500'] as const) {
			await status.openCode(code);
			const text = await status.contentText();
			expect(text).toContain(code);
			await page.goBack();
		}

		await page.close();
	});
});
