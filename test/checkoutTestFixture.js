const { Builder } = require('selenium-webdriver');
const CheckoutPage = require('../pages/checkoutPage');
const AddToCartPage = require('../pages/addToCartPage');
const testData = require('../Fixtures/testData.json');
const assert = require('assert');

describe("Checkout Test with Fixture", function () {
  let driver;
  let checkoutPage;
  let addToCartPage;

  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    checkoutPage = new CheckoutPage(driver);
    addToCartPage = new AddToCartPage(driver);
    await driver.get("https://saucedemo.com");
    await addToCartPage.addToCart(0);
  });

  afterEach(async function () {
    await driver.quit();
  });

  it("Complete checkout with fixture data", async function () {
    await checkoutPage.enterCheckoutInformation(testData.checkoutInfo.firstName, testData.checkoutInfo.lastName, testData.checkoutInfo.postalCode);
    await checkoutPage.completeCheckout();

    let confirmationMessage = await checkoutPage.getConfirmationMessage();
    assert.strictEqual(confirmationMessage, "THANK YOU FOR YOUR ORDER");
  });
});
