import { test, expect, chromium } from '@playwright/test';
import * as data from '../data/data';
import { LoginPage } from '../pages/login.page';
import { AdminPage } from '../pages/admin.page';
import { NavigatorPage } from '../support/navigator.page';

test.beforeEach(async ({ page }) => {
  await page.goto(data.URL);
  const loginPage = new LoginPage(page);
  await loginPage.inputLoginInfo(data.USERNAME, data.PASSWORD);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('Verify result is returned when users fulfill info @AdminPage006', async ({ page }) => {
  const adminPage = new AdminPage(page);
  const navigator = new NavigatorPage(page);
  await navigator.gotoMenu('Admin');
  await adminPage.inputInfo(data.USERNAME, data.USER_ROLE, data.EMPLOYEE_FIRSTNAME, data.STATUS);
  await adminPage.clickOnSearch();
  // Assertion
  await adminPage.verifyColumnHeaders();
  await adminPage.verifyRecordFound(data.USERNAME, data.USER_ROLE, data.EMPLOYEE_FIRSTNAME, data.STATUS);
});