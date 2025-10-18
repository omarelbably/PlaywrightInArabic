import BasePage from "../../basePage";
import { expect } from "@playwright/test";

export default class FramesPage extends BasePage {
  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/');
    await this.page.getByRole('link', { name: 'Frames', exact: true }).click();
  }

  async openIFrame() {
    await this.page.getByRole('link', { name: 'iFrame' }).click();
  }

  async typeInEditor(text: string) {
    const editorBody = this.page.frameLocator('#mce_0_ifr').locator('body#tinymce');
    // Clear existing content in TinyMCE body
    await editorBody.evaluate((el: HTMLElement) => (el.innerHTML = ''));
    await editorBody.click();
    // Use fill instead of deprecated type signature
    await editorBody.fill(text);
    await expect(editorBody).toContainText(text);
  }

  async openNestedFrames() {
    await this.page.getByRole('link', { name: 'Nested Frames' }).click();
  }

  async getNestedFrameText(position: 'LEFT' | 'RIGHT' | 'MIDDLE' | 'BOTTOM'): Promise<string> {
    const top = this.page.frame({ name: 'frame-top' });
    if (position === 'BOTTOM') {
      const bottom = this.page.frame({ name: 'frame-bottom' });
      return (await bottom?.locator('body').innerText())?.trim() ?? '';
    }
    if (!top) return '';
    let targetName: string;
    if (position === 'LEFT') {
      targetName = 'frame-left';
    } else if (position === 'RIGHT') {
      targetName = 'frame-right';
    } else {
      targetName = 'frame-middle';
    }
    const children = top.childFrames();
    const target = children.find(f => f.name() === targetName);
    return (await target?.locator('body').innerText())?.trim() ?? '';
  }
}
