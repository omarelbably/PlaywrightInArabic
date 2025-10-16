import { expect, test } from "../fixtures/fixture";
import { AxeBuilder } from '@axe-core/playwright';

test('normal accessibility', async ({ page }, testInfo) => {
  await page.goto('https://www.saucedemo.com/');
  const accessibilityScanResults = await new AxeBuilder({page}).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});

test('accessibility with tags', async ({ page }, testInfo) => {
  await page.goto('https://www.saucedemo.com/');
  const accessibilityScanResults = await new AxeBuilder({page}).withTags(['wcag2aa']).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});

test('accessibility with include', async ({ page }, testInfo) => {
  await page.goto('https://www.saucedemo.com/');
  const accessibilityScanResults = await new AxeBuilder({page}).include('[id="login-button"]').analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});

test('accessibility with exclude', async ({ page }, testInfo) => {
  await page.goto('https://www.saucedemo.com/');
  const accessibilityScanResults = await new AxeBuilder({page}).exclude('[id="login-button"]').analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});