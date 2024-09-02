import { Browser, Page } from 'playwright';

declare global {
  const browser: Browser;
  const page: Page;
  const browserName: string;
}

describe(`Google Test Case`, () => {
  it('returns successful search', async () => {
    await page.goto('https://www.google.com/', { waitUntil: 'networkidle' });
    // await page.
    // Click input[aria-label="Search"]
    await page.click('input[aria-label="Search"]');
    // Fill input[aria-label="Search"]
    await page.fill('input[aria-label="Search"]', 'tesla');
    // Press Enter
    await page.press('input[aria-label="Search"]', 'Enter');
    // Close page
    await page.close();
  });
});

// let browser: Browser;
// let page: Page;
// let browserName: string;
// beforeAll(async () => {
//   browser = await chromium.launch();
// });
// afterAll(async () => {
//   await browser.close();
// });
// beforeEach(async () => {
//   page = await browser.newPage();
// });
// afterEach(async () => {
//   await page.close();
// });
// it('should work', async () => {
//   await page.goto('https://www.example.com');
//   expect(await page.title()).toBe('Example Domain');
// });
