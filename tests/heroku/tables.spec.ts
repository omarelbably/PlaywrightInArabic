import { expect, test } from "../../fixtures/fixture";
import TablesPage from "../pages/heroku/tablesPage/tablesPage";

let page: any;
let tables: TablesPage;

test.beforeEach(async ({ browser }) => {
	page = await browser.newPage();
	tables = new TablesPage(page);
	await tables.navigate();
});

test.afterEach(async () => { await page.close(); });

function isSortedAsc(arr: string[]) {
	const a = arr.slice();
	a.sort((x, y) => x.localeCompare(y));
	return a.every((v, i) => v === arr[i]);
}
function isSortedDesc(arr: string[]) {
	const a = arr.slice();
	a.sort((x, y) => x.localeCompare(y));
	a.reverse();
	return a.every((v, i) => v === arr[i]);
}

test.describe('Sortable Data Tables', () => {
	test('Sort by Last Name asc/desc', async () => {
		await tables.sortBy('Last Name');
		const ascValues = await tables.getColumnValues('Last Name');
		expect(isSortedAsc(ascValues)).toBeTruthy();

		await tables.sortBy('Last Name');
		const descValues = await tables.getColumnValues('Last Name');
		expect(isSortedDesc(descValues)).toBeTruthy();
	});
});
