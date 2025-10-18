import BasePage from "../../basePage";

export default class JavascriptAlertsPage extends BasePage {
  private readonly alertButton = this.page.getByRole('button', { name: 'Click for JS Alert' });
  private readonly confirmButton = this.page.getByRole('button', { name: 'Click for JS Confirm' });
  private readonly promptButton = this.page.getByRole('button', { name: 'Click for JS Prompt' });
  private readonly result = this.page.locator('#result');

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/');
    await this.page.getByRole('link', { name: 'JavaScript Alerts' }).click();
  }

  async clickAlertAndAccept() {
    this.page.once('dialog', async d => await d.accept());
    await this.actions.clickOnElement(this.alertButton);
  }

  async clickConfirm(accept: boolean) {
    this.page.once('dialog', async d => (accept ? d.accept() : d.dismiss()));
    await this.actions.clickOnElement(this.confirmButton);
  }

  async clickPromptAndRespond(text: string, accept = true) {
    this.page.once('dialog', async d => (accept ? d.accept(text) : d.dismiss()));
    await this.actions.clickOnElement(this.promptButton);
  }

  async getResultText(): Promise<string | null> {
    return this.actions.getElementText(this.result);
  }
}
