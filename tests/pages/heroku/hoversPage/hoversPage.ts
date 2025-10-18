import BasePage from "../../basePage";

export default class HoversPage extends BasePage {
  private readonly figures = this.page.locator('.figure');

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/hovers');
  }

  async hoverAndGetCaptionTexts(): Promise<string[]> {
    const texts: string[] = [];
    const count = await this.figures.count();
    for (let i = 0; i < count; i++) {
      const fig = this.figures.nth(i);
      await fig.hover();
      texts.push((await fig.locator('.figcaption').innerText()).trim());
    }
    return texts;
  }
}
