import BasePage from "../basePage";

export default class BurgerMenu extends BasePage {
  private readonly openButton = this.page.getByRole('button', { name: /open menu/i });
  private readonly allItems = this.page.getByRole('link', { name: /^all items$/i });
  private readonly about = this.page.getByRole('link', { name: /^about$/i });
  private readonly logout = this.page.getByRole('link', { name: /^logout$/i });
  private readonly reset = this.page.getByRole('link', { name: /^reset app state$/i });

  async open() {
    await this.actions.clickOnElement(this.openButton);
  }

  async clickAllItems() {
    await this.open();
    await this.actions.clickOnElement(this.allItems);
  }

  async clickAbout() {
    await this.open();
    await this.actions.clickOnElement(this.about);
  }

  async clickLogout() {
    await this.open();
    await this.actions.clickOnElement(this.logout);
  }

  async resetAppState() {
    await this.open();
    await this.actions.clickOnElement(this.reset);
  }
}
