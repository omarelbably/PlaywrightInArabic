import BasePage from "../basePage";
import { expect } from "@playwright/test";

export default class InventoryPage extends BasePage {
  private readonly title = this.page.locator('span.title', { hasText: 'Products' });
  private readonly sortSelect = this.page.getByTestId('product_sort_container');

  async expectLoaded() {
    await expect(this.title).toBeVisible();
  }

  private itemCard(name: string) {
    const card = this.page.locator('.inventory_item').filter({ has: this.page.getByText(name) });
    const add = card.getByRole('button', { name: /add to cart/i });
    const remove = card.getByRole('button', { name: /^remove$/i });
    const link = card.locator('.inventory_item_name, .inventory_item_label a, a[id^="item_"][id$="_title_link"]');
    return { card, add, remove, link };
  }

  async addByName(name: string) {
    const { add } = this.itemCard(name);
    await this.actions.clickOnElement(add);
  }

  async removeByName(name: string) {
    const { remove } = this.itemCard(name);
    await this.actions.clickOnElement(remove);
  }

  async openDetails(name: string) {
    const { link } = this.itemCard(name);
    await this.actions.clickOnElement(link);
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    const valueMap = { az: 'az', za: 'za', lohi: 'lohi', hilo: 'hilo' } as const;
    await this.sortSelect.selectOption(valueMap[option]);
  }

  get itemNames() {
    return this.page.locator('.inventory_item_name');
  }
}
