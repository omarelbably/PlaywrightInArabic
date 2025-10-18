import BasePage from "../../basePage";

export default class ChallengingDomPage extends BasePage {
  private readonly blue = this.page.locator('.button');
  private readonly red = this.page.locator('.button.alert');
  private readonly green = this.page.locator('.button.success');
  private readonly canvas = this.page.locator('#canvas');
  private readonly tableRows = this.page.locator('table tbody tr');
  private readonly result = this.page.locator('#content');

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/');
    await this.page.getByRole('link', { name: 'Challenging DOM' }).click();
  }

  async clickAllButtonsOnce() {
    await this.blue.click();
    await this.red.click();
    await this.green.click();
  }

  async rowCount(): Promise<number> {
    return this.tableRows.count();
  }
}
