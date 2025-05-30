import { test, expect, chromium } from '@playwright/test';
import * as data from '../data/data';
import { LoginPage } from '../pages/login.page';
import { DirectoryPage } from '../pages/directory.page';
import { NavigatorPage } from '../support/navigator.page';

test.beforeEach(async ({ page }) => {
  await page.goto(data.URL);
  const loginPage = new LoginPage(page);
  await loginPage.inputLoginInfo(data.USERNAME, data.PASSWORD);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('verify all fields and all the drop-down list @DirectoryPage006', async ({ page }) => {
  const directoryPage = new DirectoryPage(page);
  const navigator = new NavigatorPage(page);
  await navigator.gotoMenu('Directory');
  await directoryPage.inputInfo(data.EMPLOYEE_FIRSTNAME);
  await directoryPage.clickOnSearch();
  // Assertion
  await directoryPage.verifyRecordFound(data.EMPLOYEE_FIRSTNAME);
});