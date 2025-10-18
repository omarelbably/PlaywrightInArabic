import { expect, test } from "../../fixtures/fixture";
import ContextMenuPage from "../pages/heroku/contextMenuPage/contextMenuPage";

test('Context Menu triggers alert and can be dismissed', async ({ browser }) => {
	const page = await browser.newPage();
	const ctx = new ContextMenuPage(page);
	await ctx.navigate();
	const dialog = await ctx.triggerContextMenu();
	expect(dialog.message()).toContain('You selected a context menu');
	await dialog.accept();
	await page.close();
});
