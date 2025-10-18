import BasePage from "../../basePage";

export default class InfiniteScrollPage extends BasePage {
  private readonly paragraphs = this.page.locator('.jscroll-added');

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/infinite_scroll');
  }

  async scrollTimes(times: number) {
    for (let i = 0; i < times; i++) {
      await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await this.page.waitForTimeout(500);
    }
  }

  async countParagraphs(): Promise<number> {
    return this.paragraphs.count();
  }
}
