import BasePage from "../../basePage";

export default class NotificationMessagesPage extends BasePage {
  private readonly link = this.page.getByRole('link', { name: 'Click here' });
  private readonly flash = this.page.locator('#flash');

  async navigate() { await this.page.goto('https://the-internet.herokuapp.com/notification_message'); }
  async clickHere() { await this.link.click(); }
  async message(): Promise<string> { return (await this.flash.innerText()).trim(); }
}
