import BasePage from "../../basePage";

export default class KeyPressesPage extends BasePage {
  private readonly result = this.page.locator('#result');

  async navigate() { await this.page.goto('https://the-internet.herokuapp.com/key_presses'); }
  async press(key: string) { await this.page.keyboard.press(key); }
  async text(): Promise<string | null> { return this.result.textContent(); }
}
