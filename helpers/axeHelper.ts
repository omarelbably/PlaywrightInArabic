import { Page } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import { createHtmlReport } from 'axe-html-reporter';
import * as fs from 'fs';
import * as path from 'path';

type AttachFn = (name: string, pathOrContent: string, contentType?: string) => Promise<void>;
type AxeRunOptions = {
  withTags?: string[];
  include?: string | string[];
  exclude?: string | string[];
};

// Overloads
export async function runAxeAndReport(page: Page, testName: string, attach?: AttachFn): Promise<any>;
export async function runAxeAndReport(page: Page, testName: string, options?: AxeRunOptions, attach?: AttachFn): Promise<any>;

// Implementation
export async function runAxeAndReport(page: Page, testName: string, optionsOrAttach?: AxeRunOptions | AttachFn, maybeAttach?: AttachFn) {
  const isFn = typeof optionsOrAttach === 'function';
  const options: AxeRunOptions | undefined = isFn ? undefined : optionsOrAttach as AxeRunOptions | undefined;
  const attach: AttachFn | undefined = isFn ? optionsOrAttach as AttachFn : maybeAttach;

  // Build Axe chain
  let builder = new AxeBuilder({ page });
  if (options?.withTags && options.withTags.length > 0) {
    builder = builder.withTags(options.withTags);
  }
  if (options?.include) {
    if (Array.isArray(options.include)) {
      for (const sel of options.include) builder = builder.include(sel);
    } else {
      builder = builder.include(options.include);
    }
  }
  if (options?.exclude) {
    if (Array.isArray(options.exclude)) {
      for (const sel of options.exclude) builder = builder.exclude(sel);
    } else {
      builder = builder.exclude(options.exclude);
    }
  }

  // Run Axe
  const results = await builder.analyze();

  // Create HTML report
  const htmlOutDirRel = 'reports/axe-results/';
  const htmlOutDirAbs = path.resolve(htmlOutDirRel);
  fs.mkdirSync(htmlOutDirAbs, { recursive: true });
  const htmlPath = path.join(htmlOutDirAbs, `${sanitize(testName)}.html`);
  try {
    // Many versions of axe-html-reporter join outputDir with process.cwd(), so keep it relative
    createHtmlReport({
      results,
      options: {
        outputDir: 'reports/axe-results/',
        reportFileName: `${sanitize(testName)}.html`
      }
    });
  } catch (e: any) {
    console.warn('Error happened while trying to save html report.', e?.message || e);
  }

  // Attach to Allure/Playwright if hook provided
  if (attach) {
    if (fs.existsSync(htmlPath)) {
      await attach('axe-report.html', htmlPath, 'text/html');
    }
  }

  return results;
}

function sanitize(str: string) {
  return str.replaceAll(/[^a-z0-9]+/gi, '_').replaceAll(/(?:^_+|_+$)/g, '').toLowerCase();
}
