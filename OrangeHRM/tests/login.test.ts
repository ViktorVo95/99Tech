import { test, expect, chromium } from '@playwright/test';
import * as data from '../data/data';
import { LoginPage } from '../pages/login.page';

test.beforeEach(async ({ page }) => {
  await page.goto(data.URL);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('Verify successfully login @Testcase001', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.inputLoginInfo(data.USERNAME, data.PASSWORD);
  // Assertion
  await loginPage.verifyLoginSuccess();
});

test('Verify unsuccessfully login when input incorrect Username and incorrect Password @Testcase004', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.inputLoginInfo(data.INCORRECT_USERNAME, data.INCORRECT_PASSWORD);
  // Assertion
  await loginPage.verifyLoginFail('Invalid credentials');
});

test('Verify unsuccessfully login when not input Username and Password @Testcase007', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.inputLoginInfo('', '');
  // Assertion
  await loginPage.verifyInlineErrorMsg();
});