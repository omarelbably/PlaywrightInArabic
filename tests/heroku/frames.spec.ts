import { expect, test } from "../../fixtures/fixture";
import FramesPage from "../pages/heroku/framesPage/framesPage";

let page: any;
let frames: FramesPage;

test.beforeEach(async ({ browser }) => {
	page = await browser.newPage();
	frames = new FramesPage(page);
	await frames.navigate();
});

test.afterEach(async () => { await page.close(); });

test.describe('Frames', () => {
	test('iFrame editing basic typing', async () => {
		await frames.openIFrame();
		await frames.typeInEditor('Hello TinyMCE');
	});

	test('Nested frames text presence', async () => {
		await frames.openNestedFrames();
		expect(await frames.getNestedFrameText('LEFT')).toContain('LEFT');
		expect(await frames.getNestedFrameText('MIDDLE')).toContain('MIDDLE');
		expect(await frames.getNestedFrameText('RIGHT')).toContain('RIGHT');
		expect(await frames.getNestedFrameText('BOTTOM')).toContain('BOTTOM');
	});
});
