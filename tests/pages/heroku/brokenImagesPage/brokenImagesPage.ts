import BasePage from "../../basePage";

export default class BrokenImagesPage extends BasePage {
  private readonly images = this.page.locator('img');

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/');
    await this.page.getByRole('link', { name: 'Broken Images' }).click();
  }

  async getNaturalWidths(): Promise<number[]> {
    const count = await this.images.count();
    const widths: number[] = [];
    for (let i = 0; i < count; i++) {
      const w = await this.images.nth(i).evaluate(img => (img as HTMLImageElement).naturalWidth);
      widths.push(w ?? 0);
    }
    return widths;
  }
}
