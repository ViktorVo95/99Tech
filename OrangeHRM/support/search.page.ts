import { expect, type Locator, type Page } from '@playwright/test';

export class Search {
  readonly page: Page;
  readonly reset_button: Locator;
  readonly search_button: Locator;
  readonly view_button: Locator;
  readonly header_table: Locator;
  readonly body_table: Locator;
  readonly cell_table: Locator;

  constructor(page: Page) {
    this.page = page;
    this.reset_button = page.locator('[type=reset]');
    this.search_button = page.locator('[type=submit]');
    this.view_button = page.locator('[type=submit]');
    this.header_table = this.page.locator('//div[@role="columnheader"]');
    this.body_table = page.locator('[class*=table-body] [class*=table-row]');
    this.cell_table = page.locator('//*[@role="cell"]/div');
  }

  //Input text and date
  async inputText(label: string, inputText: string) {
    const textbox_locator = await this.page.locator('//label[text()="' + label + '"]/parent::*/following-sibling::*//input')
    await textbox_locator.fill(inputText);
  }

  async selectDropdown(label: string, option: string) {
    const dropdown_locator = await this.page.locator('//label[text()="' + label + '"]/parent::*/following-sibling::*//i[contains(@class,"arrow")]');
    const option_locator = await this.page.locator('//div[@role="listbox"]//*[text()="' + option + '"]');
    await dropdown_locator.click();
    await option_locator.click();
  }

  async selectTextAndDropdown(label: string, inputText: string) {
    await this.inputText(label, inputText);
    const text_locator = await this.page.locator('//*[@role="listbox"]//span').first();
    await text_locator.isVisible();
    await text_locator.click();
  }

  async toggleButton(label: string) {
    const button_locator = await this.page.locator('//*[text()="' + label + '"]/following-sibling::*//span');
    await button_locator.click();
  }

  async removeChip(chipLabel: string) {
    const chip_locator = await this.page.locator('//span[normalize-space()="' + chipLabel + '"]/i');
    await chip_locator.click();
  }

  async clickOnSearch() {
    await this.search_button.click();
    await this.page.waitForTimeout(2000);
  }

  async clickOnView() {
    await this.view_button.click();
  }

  async clickOnReset() {
    await this.reset_button.click();
  }

  //Verify
  async verifyColumnHeaders(expectedHeaders: string[]): Promise<boolean> {
    if (expectedHeaders) {
      const count = await this.header_table.count();
      const getTextOnly_arr: string[] = [];

      for (let i = 0; i < count; i++) {
        const text = await this.header_table.nth(i).innerText();
        if (text) getTextOnly_arr.push(text.trim());
      }

      return expectedHeaders.every(expected =>
        getTextOnly_arr.some(actual => actual === expected.trim())
      );
    }
    return false;
  }

  async verifyRecordContentFound(expectedContent: string[]): Promise<boolean> {
    if (expectedContent) {
      let rowCount = await this.body_table.count();
      if (rowCount == 0) return false;
      let isFound = true;
      for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < expectedContent.length; j++) {
          const text = await this.body_table.nth(i).locator(this.cell_table).nth(j + 1).innerText();
          isFound &&= text.includes(expectedContent[j]);
        }
        if (isFound) return true;
      }
    }
    return false;
  }
}  