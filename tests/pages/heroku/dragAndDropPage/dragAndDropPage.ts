import BasePage from "../../basePage";

export default class DragAndDropPage extends BasePage {
  private readonly columnA = this.page.locator('#column-a');
  private readonly columnB = this.page.locator('#column-b');

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/');
    await this.page.getByRole('link', { name: 'Drag and Drop' }).click();
  }

  async dragAtoB() {
    // Fallback dnd for HTML5
    await this.columnA.dragTo(this.columnB);
  }

  async headers(): Promise<{ a: string; b: string }> {
    const a = (await this.columnA.locator('header').innerText()).trim();
    const b = (await this.columnB.locator('header').innerText()).trim();
    return { a, b };
  }
}
