const { Builder } = require('selenium-webdriver');
const AddToCartPage = require('../pages/addToCartPage');
const testData = require('../Fixtures/testData.json');
const assert = require('assert');

describe("Add to Cart Test with Fixture", function () {
  let driver;
  let addToCartPage;

  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    addToCartPage = new AddToCartPage(driver);
    await driver.get("https://saucedemo.com");
  });

  afterEach(async function () {
    await driver.quit();
  });

  it("Add valid product to cart", async function () {
    await addToCartPage.addToCart(0);
    let cartCount = await addToCartPage.getCartCount();
    assert.strictEqual(cartCount, "1");
  });
});
