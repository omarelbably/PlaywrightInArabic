import BasePage from "../../basePage";

export default class InputsPage extends BasePage {
  private readonly input = this.page.locator('input[type="number"], input');

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/inputs');
  }

  async type(value: string) { await this.input.fill(value); }
  async press(key: string) { await this.page.keyboard.press(key); }
  async value(): Promise<string> { return (await this.input.inputValue()); }
}
