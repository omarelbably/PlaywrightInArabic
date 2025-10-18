import { test } from "../../fixtures/fixture";
import FileUploadPage from "../pages/heroku/fileUploadPage/fileUploadPage";
import { join } from "node:path";

let page: any;
let upload: FileUploadPage;

test.beforeEach(async ({ browser }) => {
	page = await browser.newPage();
	upload = new FileUploadPage(page);
	await upload.navigate();
});

test.afterEach(async () => { await page.close(); });

test.describe('File Upload', () => {
	test('Upload small text file', async () => {
		const filePath = join(process.cwd(), 'random_data.txt');
		await upload.uploadFile(filePath);
		await upload.assertUploaded('random_data.txt');
	});
});
