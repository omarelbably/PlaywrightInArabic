import BasePage from "../../basePage";

export default class GeolocationPage extends BasePage {
  private readonly button = this.page.getByRole('button', { name: 'Where am I?' });
  private readonly lat = this.page.locator('#lat-value');
  private readonly lon = this.page.locator('#long-value');

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/geolocation');
  }

  async requestLocation() {
    await this.button.click();
  }

  async getCoordinates(): Promise<{ lat?: string|null; lon?: string|null }> {
    return { lat: await this.lat.textContent(), lon: await this.lon.textContent() };
  }
}
