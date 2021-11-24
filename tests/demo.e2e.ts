import { Browser, Page } from 'playwright'

declare global {
  const browser: Browser;
  const page: Page;
  const browserName: string;
}

describe(`Google Test Case`, () => {
  it("returns successful search", async () => {
    await page.goto("https://www.google.com/");
    // Click input[aria-label="Search"]
    await page.click('input[aria-label="Search"]');
    // Fill input[aria-label="Search"]
    await page.fill('input[aria-label="Search"]', "tesla");
    // Press Enter
    await page.press('input[aria-label="Search"]', "Enter");
    // Close page
    await page.close();
  });
});

// let browser: Browser
// let page: Page

// beforeAll(async () => {
//   browser = await chromium.launch()
//   page = await browser.newPage()
// })

// test('2d context should be exist', async () => {
//   await page.goto("https://www.carlrippon.com/");
//   expect(await page.title()).toBe("All posts | Building SPAs");
//   await expect(browser).not.toBeNull()
//   await expect(true).toBe(true)
// })

// it('Home page should have the correct title', async () => {
//   await page.goto('https://www.carlrippon.com/')
//   expect(await page.title()).toBe('All posts | Building SPAs')
// })

// afterAll(async () => {
//   await browser.close()
// })

// import { test, expect } from '@playwright/test';

// test('basic test', async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//   const title = page.locator('.navbar__inner .navbar__title');
//   await expect(title).toHaveText('Playwright');
// });
