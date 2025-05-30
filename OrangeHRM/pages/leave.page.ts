import { expect, type Locator, type Page } from '@playwright/test';
import { Search } from '../support/search.page';

export class LeavePage {
  readonly page: Page;
  readonly search: Search;
  readonly columnHeader: Locator;
  readonly expectedHeader: string[];

  constructor(page: Page) {
    this.page = page;
    this.search = new Search(this.page);
    this.columnHeader = this.page.locator('[role=columnheader]');
    this.expectedHeader = ["Date",	"Employee Name",	"Leave Type",	"Leave Balance (Days)",	"Number of Days",	"Status",	"Comments",	"Actions"];
  }

  async inputInfo(fromDate, toDate, leaveStatus, leaveType) {
    fromDate && await this.search.inputText('From Date', fromDate);
    toDate && await this.search.inputText('To Date', toDate);
    leaveStatus && await this.search.selectDropdown('Show Leave with Status', leaveStatus);
    leaveType && await this.search.selectDropdown('Leave Type', leaveType);
  }

  async clickOnSearch() { await this.search.clickOnSearch() };
  async clickOnReset() { await this.search.clickOnReset() };

  //Verify
  async verifyColumnHeaders() {
    expect(await this.search.verifyColumnHeaders(this.expectedHeader)).toBeTruthy();
  }

  async verifyRecordFound(date, employeeName, leaveType, leaveBalance, numberOfDays, status, comments) {
    let expectedRecord = [date, employeeName, leaveType, leaveBalance, numberOfDays, status, comments]
    expect(await this.search.verifyRecordContentFound(expectedRecord)).toBeTruthy();
  }
}  