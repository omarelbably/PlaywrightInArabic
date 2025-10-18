import { expect, test } from "../../fixtures/fixture";
import DragAndDropPage from "../pages/heroku/dragAndDropPage/dragAndDropPage";

test('Drag and Drop swaps headers', async ({ browser }) => {
	const page = await browser.newPage();
	const dnd = new DragAndDropPage(page);
	await dnd.navigate();
	const before = await dnd.headers();
	await dnd.dragAtoB();
	const after = await dnd.headers();
	expect(before.a).not.toBe(after.a); // swapped
	await page.close();
});
