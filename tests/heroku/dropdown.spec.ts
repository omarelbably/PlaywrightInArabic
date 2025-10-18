import { expect, test } from "../../fixtures/fixture";
import DropdownPage from "../pages/heroku/dropdownPage/dropdownPage";

let page: any;
let dropdown: DropdownPage;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  dropdown = new DropdownPage(page);
  await dropdown.navigate();
});

test.afterEach(async () => { await page.close(); });

test.describe('Dropdown', () => {
  test('Select both options and verify value', async () => {
    await dropdown.selectByValue('1');
    expect(await dropdown.getValue()).toBe('1');

    await dropdown.selectByValue('2');
    expect(await dropdown.getValue()).toBe('2');
  });
});
