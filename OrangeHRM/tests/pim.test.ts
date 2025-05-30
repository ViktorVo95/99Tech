import { test, expect, chromium } from '@playwright/test';
import * as data from '../data/data';
import { LoginPage } from '../pages/login.page';
import { PIMPage } from '../pages/pim.page';
import { NavigatorPage } from '../support/navigator.page';

test.beforeEach(async ({ page }) => {
  await page.goto(data.URL);
  const loginPage = new LoginPage(page);
  await loginPage.inputLoginInfo(data.USERNAME, data.PASSWORD);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('verify all fields and all the drop-down list @PIMpage010', async ({ page }) => {
  const pimPage = new PIMPage(page);
  const navigator = new NavigatorPage(page);
  await navigator.gotoMenu('PIM');
  await pimPage.inputInfo(data.EMPLOYEE_FULLNAME, data.EMPLOYEE_ID, data.EMPLOYEE_STATUS, data.SUPERVISOR, data.JOB_TITLE, data.SUB_UNIT);
  await pimPage.clickOnSearch();
  // Assertion
  await pimPage.verifyColumnHeaders();
  await pimPage.verifyRecordFound(data.EMPLOYEE_ID, data.EMPLOYEE_FIRSTNAME, data.EMPLOYEE_LASTNAME, data.JOB_TITLE, data.EMPLOYEE_STATUS, data.SUB_UNIT, data.SUPERVISOR);
});