import { Locator, Page } from '@playwright/test';

export default class Actions{
    protected readonly page:Page;
    constructor(page:Page){
        this.page = page;
    }

    public async clickOnElement(element: Locator){
        await element.click();
    }

    public async enterTextToElement(element: Locator, text: string){
        await element.fill(text);
    }
    public async takeScreenshot(filePath: string){
        await this.page.screenshot({path:filePath});
    }
    public async getElementScreenshot(element: Locator, path:string): Promise<void> {
    await element.screenshot({path:path});
    }
    public  async  getElementText(element: Locator): Promise<string | null> {
        return await element.textContent();
    }
}