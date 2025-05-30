import { chromium, expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username_textbox: Locator;
  readonly password_textbox: Locator;
  readonly login_button: Locator;
  readonly userprofile_dropdown: Locator;
  readonly inlineError_msg: Locator;
  readonly logout_text: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username_textbox = page.locator('[name="username"]');
    this.password_textbox = page.locator('[name="password"]');
    this.login_button = page.locator('[type="submit"]');
    //Validation
    this.userprofile_dropdown = page.locator('p[class*=userdropdown]');
    this.inlineError_msg = page.locator('//*[contains(@class,"input-field-error-message")][text()="Required"]');
    //Logout
    this.logout_text = page.locator('//a[text()="Logout"]');
  }

  async goto(page, url) {
    const browser = await chromium.launch();
    page = await browser.newPage();
    await this.page.goto(url);
  }

  async inputLoginInfo(username: string, password: string) {
    await this.username_textbox.fill(username);
    await this.password_textbox.fill(password);
    await this.login_button.click();
  }

  async logout() {
    await this.userprofile_dropdown.click();
    await this.logout_text.click();
  }

  //Verify
  async verifyLoginSuccess() {
    await expect(this.userprofile_dropdown).toBeVisible();
  }

  async verifyLoginFail(message: string) {
    let msg = this.page.locator('//p[contains(@class,"alert-content")][normalize-space()="' + message + '"]');
    await expect(msg).toBeVisible();
  }

  async verifyInlineErrorMsg() {
    await expect(this.inlineError_msg.nth(0)).toBeVisible();
    await expect(this.inlineError_msg.nth(1)).toBeVisible();
  }
}  