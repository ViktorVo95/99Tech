import { test, expect, chromium } from '@playwright/test';
import * as data from '../data/data';
import { LoginPage } from '../pages/login.page';
import { LeavePage } from '../pages/leave.page';
import { NavigatorPage } from '../support/navigator.page';

test.beforeEach(async ({ page }) => {
  await page.goto(data.URL);
  const loginPage = new LoginPage(page);
  await loginPage.inputLoginInfo(data.USERNAME, data.PASSWORD);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('verify all fields and all the drop-down list @LeavePage008', async ({ page }) => {
  const leavePage = new LeavePage(page);
  const navigator = new NavigatorPage(page);
  await navigator.gotoMenu('Leave');
  await leavePage.inputInfo(data.FROM_DATE, data.TO_DATE, data.LEAVE_STATUS, data.LEAVE_TYPE);
  await leavePage.clickOnSearch();
  // Assertion
  await leavePage.verifyColumnHeaders();
  await leavePage.verifyRecordFound('2024-07-02', 'Ranga Akunuri', data.LEAVE_TYPE, "-1.00", "1.00", data.LEAVE_STATUS, "");
});