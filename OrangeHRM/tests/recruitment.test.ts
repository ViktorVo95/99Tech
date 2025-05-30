import { test, expect, chromium } from '@playwright/test';
import * as data from '../data/data';
import { LoginPage } from '../pages/login.page';
import { RecruitmentPage } from '../pages/recruitment.page';
import { NavigatorPage } from '../support/navigator.page';

test.beforeEach(async ({ page }) => {
  await page.goto(data.URL);
  const loginPage = new LoginPage(page);
  await loginPage.inputLoginInfo(data.USERNAME, data.PASSWORD);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('verify all fields and all the drop-down list @RecruitmentPage012', async ({ page }) => {
  const recruitmentPage = new RecruitmentPage(page);
  const navigator = new NavigatorPage(page);
  await navigator.gotoMenu('Recruitment');
  await recruitmentPage.inputInfo(data.VACANCY, data.RECRUIT_STATUS);
  await recruitmentPage.clickOnSearch();
  // Assertion
  await recruitmentPage.verifyColumnHeaders();
  await recruitmentPage.verifyRecordFound(data.VACANCY,	"Kiara Finley Barrows",	"(Deleted)",	"2025-30-05",	data.RECRUIT_STATUS);
});