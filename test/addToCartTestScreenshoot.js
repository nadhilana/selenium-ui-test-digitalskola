const { Builder } = require('selenium-webdriver');
const AddToCartPage = require('../pages/addToCartPage');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe("Add to Cart Test Screenshot", function () {
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

  it("Capture screenshot after adding product to cart", async function () {
    await addToCartPage.addToCart(0);

    // Ambil screenshot dan simpan
    let screenshot = await driver.takeScreenshot();
    fs.writeFileSync(path.join(__dirname, '../Screenshots/add-to-cart-success.png'), screenshot, 'base64');
    console.log("Add to cart screenshot captured.");
  });
});
