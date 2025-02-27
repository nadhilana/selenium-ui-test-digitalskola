const { Builder } = require('selenium-webdriver');
const InventoryPage = require('../pages/inventoryPage');
const assert = require('assert');
const testData = require('../Fixtures/testData.json');

describe("Inventory Test", function () {
  let driver;
  let inventoryPage;

  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    inventoryPage = new InventoryPage(driver);
    await driver.get("https://saucedemo.com");
  });

  afterEach(async function () {
    await driver.quit();
  });

  it("Add product to cart", async function () {
    await inventoryPage.addProductToCart(0);
    let cartCount = await inventoryPage.getCartCount();
    assert.strictEqual(cartCount, '1');
  });
});
