const { Builder } = require('selenium-webdriver');
const LoginPage = require('../pages/loginPage');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe("Login Test Screenshot", function () {
  let driver;
  let loginPage;

  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
    await driver.get("https://saucedemo.com");
  });

  afterEach(async function () {
    await driver.quit();
  });

  it("Capture screenshot on login success", async function () {
    await loginPage.login("standard_user", "secret_sauce");

    // Tunggu halaman dashboard
    let isSuccess = await loginPage.isLoginSuccessful();
    assert.strictEqual(isSuccess, true);

    // Ambil screenshot dan simpan
    let screenshot = await driver.takeScreenshot();
    fs.writeFileSync(path.join(__dirname, '../Screenshots/login-success.png'), screenshot, 'base64');
    console.log("Login screenshot captured.");
  });
});
