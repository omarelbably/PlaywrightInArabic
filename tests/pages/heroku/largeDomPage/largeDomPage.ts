import BasePage from "../../basePage";

export default class LargeDomPage extends BasePage {
  async navigate() { await this.page.goto('https://the-internet.herokuapp.com/large'); }
  async scroll() { await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); }
}
