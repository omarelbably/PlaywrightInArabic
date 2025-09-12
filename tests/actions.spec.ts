import {test,expect} from '@playwright/test';
import path from 'path';

test('textbox', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.locator('[id="username"]').fill('tomsmith');
    await page.locator('[id="password"]').pressSequentially('SuperSecretPassword!', {delay:200});
    await page.locator('[id="password"]').press('Enter');

    await page.close();

});

test('click', async({page})=>{
    await page.goto('https://play1.automationcamp.ir/mouse_events.html');
    await page.locator('[id="click_area"]').click();
    await expect(page.locator('[id="click_type"]')).toHaveText('Click');
    await page.locator('[id="click_area"]').dblclick();
    await expect(page.locator('[id="click_type"]')).toHaveText('Double-Click');
    await page.locator('[id="click_area"]').click({button: 'right'});
    await expect(page.locator('[id="click_type"]')).toHaveText('Right-Click');

    await page.close();

});

test('radio', async({page})=>{
    await page.goto('http://test.rubywatir.com/radios.php');
    await page.locator('[class="radioclass"]').check();
    await expect(page.locator('[id="radioId"]')).not.toBeChecked();
    await page.locator('[id="radioId"]').uncheck();
    await expect(page.locator('[id="radioId"]')).toBeChecked();


});

test('checkbox', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    await page.locator('(//*[@type="checkbox"])[1]').uncheck();
    await expect(page.locator('(//*[@type="checkbox"])[1]')).not.toBeChecked();
    await page.locator('(//*[@type="checkbox"])[1]').check();
    await expect(page.locator('(//*[@type="checkbox"])[1]').isChecked).toBeTruthy();

});

test('dropdown', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    await page.selectOption('[id="dropdown"]', {
        value:"1"
    })
    await page.pause();
    await page.selectOption('[id="dropdown"]', {
        label:"Option 2"
    })
    await page.pause();
    await page.selectOption('[id="dropdown"]', {
        index: 2
    })
    await page.pause();
});

test('multiselect', async({page})=>{
    await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');
    await page.selectOption('[id="multi-select"]', [
        {value:"California"},
        {value:"New Jersey"},
        {value:"Florida"}
    ]
        )

    await page.pause();
});

test('dynamic', async({page})=>{
    await page.goto('https://demo.automationtesting.in/Register.html');
    await page.locator('[role="combobox"]').click();
    await page.locator('//li[text()="India"]').click();
    await page.pause();
});

test('alert', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.on("dialog", async(alert)=>{
        const alertMessage = alert.message();
        expect(alertMessage).toEqual('I am a JS Alert');
        await alert.accept();
        await expect(page.locator('[id="result"]')).toHaveText('You successfully clicked an alert');

    })
    await page.locator('[onclick="jsAlert()"]').click();
});

test('confirmation ok', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.on("dialog", async(alert)=>{
        const alertMessage = alert.message();
        expect(alertMessage).toEqual('I am a JS Confirm');
        await alert.accept();
        await expect(page.locator('[id="result"]')).toHaveText('You clicked: Ok');

    })
    await page.locator('[onclick="jsConfirm()"]').click();
});

test('cancel', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.on("dialog", async(alert)=>{
        const alertMessage = alert.message();
        expect(alertMessage).toEqual('I am a JS Confirm');
        await alert.dismiss();
        await expect(page.locator('[id="result"]')).toHaveText('You clicked: Cancel');

    })
    await page.locator('[onclick="jsConfirm()"]').click();
});


test('promptalertok', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.on("dialog", async(alert)=>{
        const alertMessage = alert.message();
        expect(alertMessage).toEqual('I am a JS prompt');
        await alert.accept("Omar");
        await expect(page.locator('[id="result"]')).toHaveText('You entered: Omar');

    })
    await page.locator('[onclick="jsPrompt()"]').click();
});

test('cancelpromptalert', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.on("dialog", async(alert)=>{
        const alertMessage = alert.message();
        expect(alertMessage).toEqual('I am a JS prompt');
        await alert.dismiss();
        await expect(page.locator('[id="result"]')).toHaveText('You entered: null');

    })
    await page.locator('[onclick="jsPrompt()"]').click();
});

test('frames', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/nested_frames');
    let framesCount = page.frames().length;
    console.log(`The frames count is ${framesCount}`);
    let bottomFrame = page.frameLocator('[src="/frame_bottom"]').locator('//body[contains(text(),"BOTTOM")]');
    await expect(bottomFrame).toHaveText('BOTTOM');
    // let topFrame = page.frame('frame-top');
    let topFrame = page.frame({url: "https://the-internet.herokuapp.com/frame_top"});
    let topFrameChilds = topFrame?.childFrames();
    let middleFrame = topFrameChilds[1];
    await expect(middleFrame.locator('[id="content"]')).toHaveText('MIDDLE');

    let leftFrame = topFrameChilds[0];
    await expect(leftFrame.locator('[id="content"]')).toHaveText('LEFT');
});

test('tabs', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/windows');

    const [browserTabs] = await Promise.all([
        page.waitForEvent('popup'), await page.locator('[href="/windows/new"]').click()
    ])

    await browserTabs.waitForLoadState();
    const pages = browserTabs.context().pages();
    const defaultTab = pages[0];
    await expect(defaultTab.locator('//h3')).toContainText('Opening a new window');
    const latestTab = pages[pages.length-1];
    await expect(latestTab.locator('//h3')).toContainText('New Window');

    defaultTab.close();
    latestTab.close();

});


test('windows', async({page})=>{
    await page.goto('https://demo.automationtesting.in/Windows.html');
    await page.locator('[href="#Seperate"]').click();

    const [newTab] = await Promise.all([
        page.context().waitForEvent('page'), await page.locator('[onclick="newwindow()"]').click()
    ])

    await newTab.waitForLoadState();
    await newTab.locator('[href="/downloads"]').click();
    await expect(newTab.locator('[class="d-1"]')).toContainText('Downloads');
    
    await page.locator('[href="Index.html"]').click();
    await expect(page.locator('[id="btn1"]')).toHaveText('Sign In');

    await page.close();
    await newTab.close();

    const boxA = page.locator('[id="column-a"]');
    const boxB = page.locator('[id="column-b"]');
    await boxA.hover();
    await page.mouse.down();
    await boxB.hover();
    await page.mouse.up();

});
test('dragAndDrop', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    const boxA = page.locator('[id="column-a"]');
    const boxB = page.locator('[id="column-b"]');

    await boxA.hover();
    await page.mouse.down();
    await boxB.hover();
    await page.mouse.up();

    await page.waitForTimeout(2000);

    await boxB.dragTo(boxA);
    await page.waitForTimeout(2000);

    page.close();
});


test('download', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/download');

    const download = await Promise.all(
        [
            page.waitForEvent('download'), await page.locator('[href="download/random_data.txt"]').click()
        ]
    )

    const downloadedFile = download[0];
    const downloadedFilePath = await downloadedFile.path();
    const downloadedFileName = downloadedFile.suggestedFilename();
    await downloadedFile.saveAs("omar");
    console.log(`the downloaded file path is ${downloadedFilePath}`);

    page.close();
});

test('upload', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/upload');

    const fileUpload = await Promise.all(
        [
            page.waitForEvent('filechooser'), await page.locator('[id="file-upload"]').click()
        ]
    )
    await fileUpload[0].setFiles('./random_data.txt');
    await page.locator('[id="file-submit"]').click();
    await page.waitForTimeout(2000);


    await page.close();
});
