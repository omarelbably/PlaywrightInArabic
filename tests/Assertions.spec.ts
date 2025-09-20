import {expect, test} from '@playwright/test';

test('to be hidden', async({page}) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
    
    await expect(page.locator('[id="finish"]')).toBeVisible();

    await page.close();
});

test('to be present', async({page}) => {

    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    await expect(page.locator('[class="added-manually"]')).not.toHaveCount(1);
    await page.locator('[onclick="addElement()"]').click();
    await expect(page.locator('[class="added-manually"]')).toHaveCount(1);
    await page.close();
});

test('to be enabled', async({page}) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    await expect(page.locator('//*[@id="input-example"]/input')).toBeDisabled();
    await page.locator('//*[@id="input-example"]/button').click();
    await expect(page.locator('//*[@id="input-example"]/input')).toBeEnabled();
    await page.close();
});

test('to have text', async({page}) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    await expect(page.locator('//*[@id="input-example"]/button')).toHaveText('Enable');
    await expect(page.locator('//*[@id="input-example"]/button')).not.toHaveText('Enabled');
    

    await page.close();
});

test('to have attribute', async({page}) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    await expect(page.locator('//*[@id="input-example"]/button')).toHaveAttribute('autocomplete', 'on');
    

    await page.close();
});

test('to have url', async({page}) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    // full url
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/dynamic_controls');
    // partial url
    await expect(page).toHaveURL(/the-internet.herokuapp/);


    await page.close();
});

test('to have title', async({page}) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    // full url
    await expect(page).toHaveTitle('The Internet');
    // partial url
    await expect(page).toHaveTitle(/.*The Internet/);


    await page.close();
});

test('to have ss', async({page}) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    await expect(page).toHaveScreenshot();


    await page.close();
});