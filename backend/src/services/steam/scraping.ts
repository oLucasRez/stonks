import puppeteer, { Page } from 'puppeteer';

export async function testPuppeteer(url: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url);

  const elements = await page.$$('.game_purchase_price');

  const pricePromises = elements.map(async (element) => {
    const property = await element.getProperty('textContent');

    return await property.jsonValue();
  });

  const pricePromise = Promise.all(pricePromises);

  const prices = (await pricePromise) as string[];

  // Sometimes the price have escape characters in it
  const price = prices[0].replace(/\r?\n?\t|\r/g, '');

  console.log(price);
}
