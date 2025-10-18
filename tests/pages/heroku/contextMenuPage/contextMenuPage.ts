import BasePage from "../../basePage";

export default class ContextMenuPage extends BasePage {
  private readonly hotspot = this.page.locator('#hot-spot');

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/');
    await this.page.getByRole('link', { name: 'Context Menu' }).click();
  }

  async triggerContextMenu() {
    // Try native right-click first
    const dialogPromise = this.page.waitForEvent('dialog', { timeout: 3000 }).catch(() => null);
    await this.hotspot.click({ button: 'right' });
    const dlg = await dialogPromise;
    if (dlg) return dlg;
    // Fallback: dispatch a contextmenu event programmatically
    const fallbackPromise = this.page.waitForEvent('dialog');
    await this.hotspot.evaluate((el: HTMLElement) => {
      el.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, button: 2 }));
    });
    return await fallbackPromise;
  }
}
