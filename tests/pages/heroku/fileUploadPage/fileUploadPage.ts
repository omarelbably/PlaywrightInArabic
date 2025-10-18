import BasePage from "../../basePage";
import { expect } from "@playwright/test";

export default class FileUploadPage extends BasePage {
  private readonly fileInput = this.page.locator('#file-upload');
  private readonly uploadButton = this.page.locator('#file-submit');
  private readonly uploadedFiles = this.page.locator('#uploaded-files');
  private readonly header = this.page.getByRole('heading', { name: 'File Uploaded!' });

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/');
    await this.page.getByRole('link', { name: 'File Upload' }).click();
  }

  async uploadFile(absolutePath: string) {
    await this.fileInput.setInputFiles(absolutePath);
    await this.actions.clickOnElement(this.uploadButton);
  }

  async assertUploaded(fileName: string) {
    await this.header.waitFor();
    await expect(this.uploadedFiles).toHaveText(fileName);
  }
}
