const fs = require('fs');
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

async function visualTesting() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get('https://saucedemo.com');

    // Melakukan login
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.name('login-button')).click();

    // Tunggu halaman dashboard untuk dimuat
    await driver.wait(until.elementLocated(By.css('.app_logo')), 10000);

    // Screenshot halaman
    let screenshot = await driver.takeScreenshot();
    fs.writeFileSync('Screenshots/login-page.png', screenshot, 'base64');

    console.log("Visual test screenshot saved.");
  } finally {
    await driver.quit();
  }
}

visualTesting();
