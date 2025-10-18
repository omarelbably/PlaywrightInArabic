import BasePage from "../../basePage";

export default class ShadowDomPage extends BasePage {
  private readonly host = this.page.locator('#content > my-paragraph');
  async navigate() { await this.page.goto('https://the-internet.herokuapp.com/shadowdom'); }
  async getTexts(): Promise<string[]> {
    return await this.host.evaluate((el: any) => {
      const root = el.shadowRoot as ShadowRoot;
      return Array.from(root.querySelectorAll('*')).map(n => (n.textContent || '').trim()).filter(Boolean);
    });
  }
}
