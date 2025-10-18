import BasePage from "../../basePage";

export default class TablesPage extends BasePage {
  private readonly table = this.page.locator('#table1');
  private headerCell(name: string) {
    return this.table.locator('th').filter({ hasText: name });
  }
  private columnCellsByIndex(index: number) {
    return this.table.locator(`tbody tr td:nth-child(${index})`);
  }

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/');
    await this.page.getByRole('link', { name: 'Sortable Data Tables' }).click();
  }

  async sortBy(columnName: 'Last Name' | 'First Name' | 'Email' | 'Due' | 'Web Site') {
    await this.headerCell(columnName).click();
  }

  async getColumnValues(columnName: 'Last Name' | 'First Name' | 'Email' | 'Due' | 'Web Site'): Promise<string[]> {
    const indexMap = { 'Last Name': 1, 'First Name': 2, 'Email': 3, 'Due': 4, 'Web Site': 5 } as const;
    const idx = indexMap[columnName];
    const count = await this.columnCellsByIndex(idx).count();
    const values: string[] = [];
    for (let i = 0; i < count; i++) {
      values.push((await this.columnCellsByIndex(idx).nth(i).innerText()).trim());
    }
    return values;
  }
}
