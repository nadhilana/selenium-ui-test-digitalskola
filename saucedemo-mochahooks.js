const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

async function saucedemoTest() {
  describe("Saucedemo Login and Add to Chart Test", function (done) {
    this.timeout(20000); 

    let driver;

  // Setup WebDriver sebelum setiap pengujian
  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://saucedemo.com");
  });

  // Cleanup WebDriver setelah setiap pengujian
  afterEach(async function () {
    await driver.quit();
  });

      // Login success
      it("Login Success", async function () {
        // Melakukan login dengan user yang valid
      await driver.findElement(By.id("user-name")).sendKeys("standard_user");
      await driver
        .findElement(By.xpath("//input[@id='password']"))
        .sendKeys("secret_sauce");
      await driver.findElement(By.name("login-button")).click();

      // Assertion - Memastikan bahwa user berhasil login dan berada di dashboard
      let titleText = await driver.findElement(By.css(".app_logo")).getText();
      assert.strictEqual(
        titleText.includes("Swag Labs"),
        true,
        'Title does not include "Swag Labs"'
      );
      console.log("Login Test Passed!");
  });

    // Login Failed
    it("Login Failed", async function () {
      // Melakukan login dengan password yang salah
      await driver
        .findElement(By.id("user-name"))
        .sendKeys("standard_user");
      await driver
        .findElement(By.xpath("//input[@id='password']"))
        .sendKeys("passwordsalah");
      await driver.findElement(By.name("login-button")).click();

      // Assertion - Memastikan muncul pesan error yang sesuai
      let errorMessage = await driver
        .findElement(By.css(".error-message-container"))
        .getText();
      assert.strictEqual(
        errorMessage.includes("Username and password do not match"),
        true,
        "Error Message does not match"
      );
      console.log("Login Failed Test Passed!");
  });

  // Add Item to Cart
  it("Add Item to Cart", async function () {
      // Melakukan login dengan user yang valid
      await driver.findElement(By.id("user-name")).sendKeys("standard_user");
      await driver
        .findElement(By.xpath("//input[@id='password']"))
        .sendKeys("secret_sauce");
      await driver.findElement(By.name("login-button")).click();

      // Menambahkan item pertama (contoh "Sauce Labs Backpack") ke cart
      await driver
        .findElement(By.xpath("//div[@class='inventory_item'][1]//button"))
        .click();

      // Assertion - Memastikan item telah ditambahkan ke cart
      let cartCount = await driver
        .findElement(By.css(".shopping_cart_badge"))
        .getText();
      assert.strictEqual(cartCount, "1", "Item was not added to the cart successfully");
      console.log("Add to Cart Test Passed!");
  });

  // Validate Item in Cart
  it("Validate Item in Cart", async function () {
      // Melakukan login dengan user yang valid
      await driver.findElement(By.id("user-name")).sendKeys("standard_user");
      await driver
        .findElement(By.xpath("//input[@id='password']"))
        .sendKeys("secret_sauce");
      await driver.findElement(By.name("login-button")).click();

      // Menambahkan item ke cart
      await driver
        .findElement(By.xpath("//div[@class='inventory_item'][1]//button"))
        .click();

      // Klik ikon keranjang untuk melihat isi keranjang
      await driver.findElement(By.className("shopping_cart_link")).click();

      // Validasi item ada di dalam keranjang
      let cartItemText = await driver
        .findElement(By.css(".inventory_item_name"))
        .getText();
      assert.strictEqual(cartItemText.includes("Sauce Labs Backpack"), true, "Item not in the cart");
      console.log("Validate Item in Cart Test Passed!");
  });
});
}
saucedemoTest();