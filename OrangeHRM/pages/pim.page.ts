import { expect, type Locator, type Page } from '@playwright/test';
import { Search } from '../support/search.page';

export class PIMPage {
  readonly page: Page;
  readonly search: Search;
  readonly columnHeader: Locator;
  readonly expectedHeader: string[];

  constructor(page: Page) {
    this.page = page;
    this.search = new Search(this.page);
    this.columnHeader = this.page.locator('[role=columnheader]');
    this.expectedHeader = ['Id', 'First (& Middle) Name', 'Last Name', 'Job Title', 'Employment Status', 'Sub Unit','Supervisor', 'Actions'];
  }

  async inputInfo(employeeName: string, employeeId: string, employeeStatus: string, supervisor: string, jobTitle: string, subUnit: string) {
    employeeName && await this.search.inputText('Employee Name', employeeName);
    employeeId && await this.search.inputText('Employee Id', employeeId);
    employeeStatus && await this.search.selectDropdown('Employment Status', employeeStatus);
    supervisor && await this.search.inputText('Supervisor Name', supervisor);
    jobTitle && await this.search.selectDropdown('Job Title', jobTitle);
    subUnit && await this.search.selectDropdown('Sub Unit', subUnit);
  }

  async clickOnSearch() { await this.search.clickOnSearch() };
  async clickOnReset() { await this.search.clickOnReset() };

  //Verify
  async verifyColumnHeaders() {
    expect(await this.search.verifyColumnHeaders(this.expectedHeader)).toBeTruthy();
  }

  async verifyRecordFound(employeeId, employeeFirstName, employeeLastName, jobTitle, employeeStatus, subUnit, supervisor) {
    let expectedRecord = [employeeId, employeeFirstName, employeeLastName, jobTitle, employeeStatus, subUnit, supervisor]
    expect(await this.search.verifyRecordContentFound(expectedRecord)).toBeTruthy();
  }
}  