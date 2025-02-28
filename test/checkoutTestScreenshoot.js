const { Builder } = require('selenium-webdriver');
const CheckoutPage = require('../pages/checkoutPage');
const AddToCartPage = require('../pages/addToCartPage');
const LoginPage = require('../pages/loginPage'); 
const testData = require('../Fixtures/testData.json');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe("Checkout Test Screenshot", function () {
  let driver;
  let checkoutPage;
  let addToCartPage;
  let loginPage;

  this.timeout(10000); 

  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    checkoutPage = new CheckoutPage(driver);
    addToCartPage = new AddToCartPage(driver);
    loginPage = new LoginPage(driver);  // Inisialisasi Login Page
    await driver.get("https://www.saucedemo.com");

    // Login
    await loginPage.login('standard_user', 'secret_sauce');

    // Verifikasi login berhasil
    const isLoginSuccessful = await loginPage.isLoginSuccessful();
    if (!isLoginSuccessful) {
      throw new Error('Login was not successful!');
    }

    // Tambah produk ke cart
    await addToCartPage.addToCart(1);  // tambah produk pertama
  });

  afterEach(async function () {
    await driver.quit();
  });



  it("Checkout and capture screenshot", async function () {

    // Proceed with the checkout process
    await checkoutPage.enterCheckoutInformation(testData.checkout.firstName, testData.checkout.lastName, testData.checkout.postalCode);
    await checkoutPage.completeCheckout();

    // Validasi selesai checkout
    let confirmationMessage = await checkoutPage.getConfirmationMessage();
    // assert.strictEqual(confirmationMessage, "THANK YOU FOR YOUR ORDER");
    assert.strictEqual(confirmationMessage, "Thank you for your order!");

    // Screenshoot setelah checkout berhasil
    let screenshot = await driver.takeScreenshot();
    fs.writeFileSync(path.join(__dirname, '../Screenshoots/checkout-success.png'), screenshot, 'base64');
    console.log("Checkout screenshot captured.");
  });
});
