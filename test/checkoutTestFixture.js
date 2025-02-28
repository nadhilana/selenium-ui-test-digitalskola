const { Builder } = require('selenium-webdriver');
const LoginPage = require('../pages/loginPage');
const AddToCartPage = require('../pages/addToCartPage');
const CheckoutPage = require('../pages/checkoutPage');
const testData = require('../Fixtures/testData.json');
const assert = require('assert');

describe("Checkout Test with Fixture", function () {
  let driver;
  let loginPage;
  let addToCartPage;
  let checkoutPage;

  this.timeout(10000);
  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
    addToCartPage = new AddToCartPage(driver);
    checkoutPage = new CheckoutPage(driver);
    await driver.get("https://saucedemo.com");
  });

  afterEach(async function () {
    await driver.quit();
  });

  it("Complete checkout", async function () {
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
      await checkoutPage.enterCheckoutInformation(testData.checkout.firstName, testData.checkout.lastName, testData.checkout.postalCode);
      await checkoutPage.completeCheckout();

    let confirmationMessage = await checkoutPage.getConfirmationMessage();
    assert.strictEqual(confirmationMessage, "Thank you for your order!");
  });
});
