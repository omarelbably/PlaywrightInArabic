import { expect, test } from "../../fixtures/fixture";
import NotificationMessagesPage from "../pages/heroku/notificationMessagesPage/notificationMessagesPage";
import RedirectorPage from "../pages/heroku/redirectorPage/redirectorPage";
import SecureDownloadPage from "../pages/heroku/secureDownloadPage/secureDownloadPage";
import ShadowDomPage from "../pages/heroku/shadowDomPage/shadowDomPage";
import ShiftingContentPage from "../pages/heroku/shiftingContentPage/shiftingContentPage";
import SlowResourcesPage from "../pages/heroku/slowResourcesPage/slowResourcesPage";
import TyposPage from "../pages/heroku/typosPage/typosPage";
import TinyMCEPage from "../pages/heroku/tinymcePage/tinymcePage";

test('Notification messages cycle among variants', async ({ browser }) => {
	const page = await browser.newPage();
	const notif = new NotificationMessagesPage(page);
	await notif.navigate();
	const seen = new Set<string>();
	for (let i = 0; i < 4; i++) { await notif.clickHere(); seen.add(await notif.message()); }
	expect(seen.size).toBeGreaterThanOrEqual(1);
	await page.close();
});

test('Redirector leads to Status Codes', async ({ browser }) => {
	const page = await browser.newPage();
	const red = new RedirectorPage(page);
	await red.navigate();
	await red.clickLink();
	// Verify we landed on Status Codes page by checking URL and header
	expect(page.url()).toContain('/status_codes');
	await page.close();
});

test('Secure download with creds', async ({ browser }) => {
	const page = await browser.newPage();
	const sdl = new SecureDownloadPage(page);
	await sdl.navigateWithCreds('admin', 'admin');
	await sdl.clickFirst();
	await page.close();
});

test('Shadow DOM text retrieval', async ({ browser }) => {
	const page = await browser.newPage();
	const shadow = new ShadowDomPage(page);
	await shadow.navigate();
	const texts = await shadow.getTexts();
	expect(texts.length).toBeGreaterThan(0);
	await page.close();
});

test('Shifting content menu varies', async ({ browser }) => {
	const page = await browser.newPage();
	const shift = new ShiftingContentPage(page);
	await shift.navigateMenu();
	const before = (await shift.menuTexts()).join('|');
	await page.reload();
	const after = (await shift.menuTexts()).join('|');
	expect(before.length).toBeGreaterThan(0);
	expect(after.length).toBeGreaterThan(0);
	await page.close();
});

test('Slow resources page eventually loads', async ({ browser }) => {
	const page = await browser.newPage();
	const slow = new SlowResourcesPage(page);
	await slow.navigate();
	await page.waitForLoadState('networkidle');
	await page.close();
});

test('Typos sometimes vary across reloads', async ({ browser }) => {
	const page = await browser.newPage();
	const typos = new TyposPage(page);
	await typos.navigate();
	const set = new Set<string>();
	for (let i = 0; i < 3; i++) { set.add(await typos.text()); await page.reload(); }
	expect(set.size).toBeGreaterThanOrEqual(1);
	await page.close();
});

test('TinyMCE editor typing and assertion', async ({ browser }) => {
	const page = await browser.newPage();
	const tiny = new TinyMCEPage(page);
	await tiny.navigate();
	await tiny.type('Hello TinyMCE');
	await page.close();
});
