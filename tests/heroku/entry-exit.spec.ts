import { test } from "../../fixtures/fixture";
import EntryAdPage from "../pages/heroku/entryAdPage/entryAdPage";
import ExitIntentPage from "../pages/heroku/exitIntentPage/exitIntentPage";

test('Entry Ad modal behavior', async ({ browser }) => {
	const page = await browser.newPage();
	const entry = new EntryAdPage(page);
	await entry.navigate();
	await entry.closeModal();
	await entry.reEnableAndRefresh();
	await page.close();
});

test('Exit Intent shows modal on mouse leave', async ({ browser }) => {
	const page = await browser.newPage();
	const exit = new ExitIntentPage(page);
	await exit.navigate();
	await exit.triggerExitIntent();
	await exit.closeModal();
	await page.close();
});
