import BasePage from "../../basePage";

export default class FloatingMenuPage extends BasePage {
  private readonly menu = this.page.locator('#menu');

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/floating_menu');
  }

  async isMenuVisible(): Promise<boolean> {
    return this.menu.isVisible();
  }
}
