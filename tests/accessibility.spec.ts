import { expect, test } from "../fixtures/fixture";
import { runAxeAndReport } from '../helpers/axeHelper';
import AxeBuilder from '@axe-core/playwright';

test('normal accessibility', async ({ page }, testInfo) => {
  await page.goto('https://www.saucedemo.com/');
  const accessibilityScanResults = await runAxeAndReport(page, testInfo.title);
  expect(accessibilityScanResults.violations).toEqual([]);
});

test('accessibility with tags', async ({ page }, testInfo) => {
  await page.goto('https://www.saucedemo.com/');
  const accessibilityScanResults = await runAxeAndReport(page, testInfo.title, { withTags: ['wcag2aa'] });
  expect(accessibilityScanResults.violations).toEqual([]);
});

test('accessibility with include', async ({ page }, testInfo) => {
  await page.goto('https://www.saucedemo.com/');
  const accessibilityScanResults = await runAxeAndReport(page, testInfo.title, { include: ['[id="login-button"]'] });
  expect(accessibilityScanResults.violations).toEqual([]);
});

test('accessibility with exclude', async ({ page }, testInfo) => {
  await page.goto('https://www.saucedemo.com/');
  const accessibilityScanResults = await runAxeAndReport(page, testInfo.title, { exclude: ['[id="login-button"]'] });
  expect(accessibilityScanResults.violations).toEqual([]);
});