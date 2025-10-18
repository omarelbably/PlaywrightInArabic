import BasePage from "../../basePage";

export default class DisappearingElementsPage extends BasePage {
  private readonly menu = this.page.locator('ul li a');

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/');
    await this.page.getByRole('link', { name: 'Disappearing Elements' }).click();
  }

  async getMenuItems(): Promise<string[]> {
    const count = await this.menu.count();
    const items: string[] = [];
    for (let i = 0; i < count; i++) {
      items.push((await this.menu.nth(i).innerText()).trim());
    }
    return items;
  }
}
