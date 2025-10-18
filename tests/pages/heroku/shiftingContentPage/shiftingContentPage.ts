import BasePage from "../../basePage";

export default class ShiftingContentPage extends BasePage {
  private readonly menu = this.page.locator('#content ul li');
  async navigateMenu() { await this.page.goto('https://the-internet.herokuapp.com/shifting_content/menu'); }
  async menuTexts(): Promise<string[]> {
    const count = await this.menu.count();
    const arr: string[] = [];
    for (let i = 0; i < count; i++) arr.push((await this.menu.nth(i).innerText()).trim());
    return arr;
  }
}
