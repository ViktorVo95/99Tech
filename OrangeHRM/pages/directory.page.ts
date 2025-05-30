import { expect, type Locator, type Page } from '@playwright/test';
import { Search } from '../support/search.page';

export class DirectoryPage {
  readonly page: Page;
  readonly search: Search;

  constructor(page: Page) {
    this.page = page;
    this.search = new Search(this.page);
  }

  async inputInfo(employeeName) {
    employeeName && await this.search.selectTextAndDropdown('Employee Name', employeeName);
  }

  async clickOnSearch() { await this.search.clickOnSearch() };
  async clickOnReset() { await this.search.clickOnReset() };

  //Verify
  async verifyRecordFound(cardName) {
    let expectedRecord = this.page.locator('//p[contains(@class,"directory-card")][contains(.,"' + cardName + '")]');
    expect(await expectedRecord).toBeVisible();
  }
}  