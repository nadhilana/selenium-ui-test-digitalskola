const { Builder } = require('selenium-webdriver');
const LoginPage = require('../pages/loginPage');
const AddToCartPage = require('../pages/addToCartPage'); 
const fs = require('fs');
const path = require('path');

describe("Login and Add to Cart Test Screenshot", function () {
  let driver;
  let loginPage;
  let addToCartPage;

  this.timeout(10000);  
  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
    addToCartPage = new AddToCartPage(driver);
    await driver.get("https://www.saucedemo.com");
  });

  afterEach(async function () {
    await driver.quit();
  });

  it("Login and Capture Screenshot after adding product to cart", async function () {
    // Login
    await loginPage.login('standard_user', 'secret_sauce');

    // Verifikasi Login Berhasil
    const isLoginSuccessful = await loginPage.isLoginSuccessful();
    if (!isLoginSuccessful) {
      throw new Error('Login was not successful!');
    }

    // Tambah produk ke cart
    await addToCartPage.addToCart(1);  // tambah produk pertama

    // Screenshoot setelah tambah produk
    let screenshot = await driver.takeScreenshot();
    fs.writeFileSync(path.join(__dirname, '../Screenshoots/add-to-cart-success.png'), screenshot, 'base64');
    console.log("Add to cart screenshot captured.");

    // Validasi cart count
    let cartCount = await addToCartPage.getCartCount();
    console.log(`Cart count: ${cartCount}`); 
  });
});
