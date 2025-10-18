import BasePage from "../../basePage";

export default class StatusCodesPage extends BasePage {
  private codeLink(code: '200' | '301' | '404' | '500') {
    return this.page.getByRole('link', { name: code });
  }
  private readonly content = this.page.locator('div.example p');

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/');
    await this.page.getByRole('link', { name: 'Status Codes' }).click();
  }

  async openCode(code: '200' | '301' | '404' | '500') {
    await this.codeLink(code).click();
  }

  async contentText(): Promise<string> {
    return (await this.content.innerText()).trim();
  }
}
