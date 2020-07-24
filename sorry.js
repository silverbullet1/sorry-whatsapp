const puppeteer = require('puppeteer');
const config = require ('./config');

async function sorry() {

    const browser = await puppeteer.launch({
        headless: false
    });

    const page = await browser.newPage();
    await page.goto("https://web.whatsapp.com/");
    
    await page.waitForNavigation();

    const xpath = `//*[@id="pane-side"]//span/span[(text() = '${config.NAME}')]`;
    const element = await page.$x(xpath);
    await element[0].click();

    const TYPE_AREA_XPATH = '//*[@id="main"]/footer//div[contains(text(), "Type a message")]';
    const typeElement = await page.$x(TYPE_AREA_XPATH);
    await typeElement[0].click();

    for (let i = 0; i < config.REPEAT; i++) {
    	let index = Math.floor((Math.random() * config.msg.length));
        await typeElement[0].type(config.msg[index]);
        await typeElement[0].type(String.fromCharCode(13));
    }
}

sorry();