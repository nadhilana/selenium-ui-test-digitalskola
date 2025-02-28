const { Builder } = require('selenium-webdriver');
const LoginPage = require('../pages/loginPage');
const testData = require('../Fixtures/testData.json');
const assert = require('assert');

describe("Login Test with Fixture", function () {
  let driver;
  let loginPage;

  this.timeout(10000);
  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
    await driver.get("https://saucedemo.com");
  });

  afterEach(async function () {
    await driver.quit();
  });

  it("Login with valid user", async function () {
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    let isSuccess = await loginPage.isLoginSuccessful();
    assert.strictEqual(isSuccess, true);
  });

  it("Login with invalid user", async function () {
    await loginPage.login(testData.invalidUser.username, testData.invalidUser.password);
    let errorMessage = await loginPage.getErrorMessage();
    assert.strictEqual(errorMessage.includes("Username and password do not match"), true);
  });
});
