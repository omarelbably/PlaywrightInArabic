import BasePage from "../../basePage";

export default class ForgotPasswordPage extends BasePage {
  private readonly email = this.page.locator('#email');
  private readonly retrieve = this.page.getByRole('button', { name: 'Retrieve password' });
  private readonly content = this.page.locator('#content');

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/forgot_password');
  }

  async submit(email: string) {
    await this.email.fill(email);
    await this.retrieve.click();
  }

  async contentText(): Promise<string> {
    return (await this.content.innerText()).trim();
  }
}
