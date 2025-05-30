import { expect, type Locator, type Page } from '@playwright/test';
import { Search } from '../support/search.page';

export class RecruitmentPage {
  readonly page: Page;
  readonly search: Search;
  readonly columnHeader: Locator;
  readonly expectedHeader: string[];

  constructor(page: Page) {
    this.page = page;
    this.search = new Search(this.page);
    this.columnHeader = this.page.locator('[role=columnheader]');
    this.expectedHeader = ["Vacancy",	"Candidate",	"Hiring Manager",	"Date of Application",	"Status",	"Actions"];
  }

  async inputInfo(vacancy, recruitment_status) {
    vacancy && await this.search.selectDropdown('Vacancy', vacancy);
    recruitment_status && await this.search.selectDropdown('Status', recruitment_status);
  }

  async clickOnSearch() { await this.search.clickOnSearch() };
  async clickOnReset() { await this.search.clickOnReset() };

  //Verify
  async verifyColumnHeaders() {
    expect(await this.search.verifyColumnHeaders(this.expectedHeader)).toBeTruthy();
  }

  async verifyRecordFound(vacancy, candidate, hiringManager, date, status) {
    let expectedRecord = [vacancy, candidate, hiringManager, date, status]
    expect(await this.search.verifyRecordContentFound(expectedRecord)).toBeTruthy();
  }
}  