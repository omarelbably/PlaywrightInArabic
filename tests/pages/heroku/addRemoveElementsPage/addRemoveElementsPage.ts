import BasePage from "../../basePage";

export default class AddRemoveElementsPage extends BasePage {
  private readonly addButton = this.page.getByRole('button', { name: 'Add Element' });
  private readonly deleteButtons = this.page.locator('#elements button, button.added-manually');

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/');
    await this.page.getByRole('link', { name: 'Add/Remove Elements' }).click();
  }

  async addElements(times = 1) {
    for (let i = 0; i < times; i++) {
      await this.actions.clickOnElement(this.addButton);
    }
  }

  async deleteFirst() {
    const count = await this.deleteButtons.count();
    if (count > 0) {
      await this.actions.clickOnElement(this.deleteButtons.first());
    }
  }

  async deleteAll() {
    while (await this.deleteButtons.count()) {
      await this.actions.clickOnElement(this.deleteButtons.first());
    }
  }

  async countDeletes(): Promise<number> {
    return this.deleteButtons.count();
  }
}
