import { expect, type Locator, type Page } from '@playwright/test';
import { Search } from '../support/search.page';

export class AdminPage {
  readonly page: Page;
  readonly search: Search;
  readonly columnHeader: Locator;
  readonly expectedHeader: string[];

  constructor(page: Page) {
    this.page = page;
    this.search = new Search(this.page);
    this.columnHeader = this.page.locator('[role=columnheader]');
    this.expectedHeader = ['Username', 'User Role', 'Employee Name', 'Status', 'Actions'];
  }

  async inputInfo(username: string, role: string, employeeName: string, status: string) {
    username && await this.search.inputText('Username', username);
    role && await this.search.selectDropdown('User Role', role);
    employeeName && await this.search.selectTextAndDropdown('Employee Name', employeeName);
    status && await this.search.selectDropdown('Status', status);
  }

  async clickOnSearch() { await this.search.clickOnSearch() };
  async clickOnReset() { await this.search.clickOnReset() };

  //Verify
  async verifyColumnHeaders() {
    expect(await this.search.verifyColumnHeaders(this.expectedHeader)).toBeTruthy();
  }

  async verifyRecordFound(username: string, role: string, employeeName: string, status: string) {
    let expectedRecord = [username, role, employeeName, status]
    expect(await this.search.verifyRecordContentFound(expectedRecord)).toBeTruthy();
  }
}