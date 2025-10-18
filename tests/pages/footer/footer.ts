import BasePage from "../basePage";

export default class Footer extends BasePage {
  readonly twitter = this.page.locator('a[href*="twitter.com"]');
  readonly facebook = this.page.locator('a[href*="facebook.com"]');
  readonly linkedin = this.page.locator('a[href*="linkedin.com"]');
}
