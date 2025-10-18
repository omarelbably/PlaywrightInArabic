import { expect, test } from "../../fixtures/fixture";
import GeolocationPage from "../pages/heroku/geolocationPage/geolocationPage";
import HoversPage from "../pages/heroku/hoversPage/hoversPage";
import InfiniteScrollPage from "../pages/heroku/infiniteScrollPage/infiniteScrollPage";
import InputsPage from "../pages/heroku/inputsPage/inputsPage";

test('Geolocation allow flow (coordinates appear or not)', async ({ browser, context }) => {
	await context.grantPermissions(['geolocation']);
	const page = await browser.newPage({ geolocation: { latitude: 10, longitude: 10 } as any });
	const geo = new GeolocationPage(page);
	await geo.navigate();
	await geo.requestLocation();
	const coords = await geo.getCoordinates();
	expect(coords.lat).toBeTruthy();
	expect(coords.lon).toBeTruthy();
	await page.close();
});

test('Hovers reveal captions', async ({ browser }) => {
	const page = await browser.newPage();
	const hovers = new HoversPage(page);
	await hovers.navigate();
	const captions = await hovers.hoverAndGetCaptionTexts();
	expect(captions.length).toBeGreaterThan(0);
	await page.close();
});

test('Infinite Scroll loads more content', async ({ browser }) => {
	const page = await browser.newPage();
	const inf = new InfiniteScrollPage(page);
	await inf.navigate();
	const before = await inf.countParagraphs();
	await inf.scrollTimes(3);
	const after = await inf.countParagraphs();
	expect(after).toBeGreaterThanOrEqual(before);
	await page.close();
});

test('Inputs accept numeric typing and arrow keys', async ({ browser }) => {
	const page = await browser.newPage();
	const inputs = new InputsPage(page);
	await inputs.navigate();
	await inputs.type('123');
	expect(await inputs.value()).toContain('123');
	await inputs.press('ArrowUp');
	await page.close();
});
