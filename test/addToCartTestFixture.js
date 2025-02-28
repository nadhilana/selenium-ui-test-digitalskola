const { Builder } = require('selenium-webdriver');
const LoginPage = require('../pages/loginPage');
const AddToCartPage = require('../pages/addToCartPage');
const testData = require('../Fixtures/testData.json');
const assert = require('assert');

describe("Add to Cart Test with Fixture", function () {
  let driver;
  let loginPage;
  let addToCartPage;

  this.timeout(10000);
  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
    addToCartPage = new AddToCartPage(driver);
    await driver.get("https://saucedemo.com");
  });

  afterEach(async function () {
    await driver.quit();
  });

  it("Adding product to cart", async function () {
      // Login
      await loginPage.login('standard_user', 'secret_sauce');
  
      // Verifikasi Login Berhasil
      const isLoginSuccessful = await loginPage.isLoginSuccessful();
      if (!isLoginSuccessful) {
        throw new Error('Login was not successful!');
      }
  
      // Tambah produk ke cart
      await addToCartPage.addToCart(1);  // tambah produk pertama
  
      // Validasi cart count
      let cartCount = await addToCartPage.getCartCount();
      console.log(`Cart count: ${cartCount}`); 
  });
});
