import { type Locator, type Page } from '@playwright/test';

export class NavigatorPage {
  readonly page: Page;
  readonly menu_item: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menu_item = page.locator('ul[class*=main-menu] a');
  }

  async gotoMenu(menuItem: string) {
    await this.menu_item.getByText(menuItem).click();
  }
}  