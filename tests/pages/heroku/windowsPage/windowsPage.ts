import BasePage from "../../basePage";

export default class WindowsPage extends BasePage {
  private readonly clickHere = this.page.getByRole('link', { name: 'Click Here' });

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/');
    await this.page.getByRole('link', { name: 'Multiple Windows' }).click();
  }

  async openNewWindow() {
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.clickHere.click()
    ]);
    return popup;
  }
}
