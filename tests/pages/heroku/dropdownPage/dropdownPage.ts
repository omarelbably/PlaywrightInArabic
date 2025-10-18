import BasePage from "../../basePage";

export default class DropdownPage extends BasePage {
  private readonly select = this.page.locator('#dropdown');

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/');
    await this.page.getByRole('link', { name: 'Dropdown' }).click();
  }

  async selectByValue(value: string) {
    await this.select.selectOption(value);
  }

  async getValue(): Promise<string> {
    return this.select.inputValue();
  }
}
