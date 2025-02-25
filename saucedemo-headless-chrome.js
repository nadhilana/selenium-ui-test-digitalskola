const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");

async function saucedemoLoginTest() {
  // Menambahkan Chrome Option
  let options = new chrome.Options();
  options.addArguments("--headless");

  // Membuat koneksi dengan webdriver
  let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();

  // Exception Handling & Conclusion
  try {
    // Buka URL di browser
    await driver.get("https://saucedemo.com");

    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver
      .findElement(By.xpath("//input[@id='password']"))
      .sendKeys("secret_sauce");

    await driver.findElement(By.name("login-button")).click();

    // Assertion - Memastikan user berada di dashboard setelah login
    let titleText = await driver.findElement(By.css(".app_logo")).getText();
    assert.strictEqual(
      titleText.includes("Swag Labs"),
      true,
      'Title does not include "Swag Labs"'
    );

    // Add item to cart
    // Menambahkan item pertama (contohnya "Sauce Labs Backpack") ke cart
    await driver
      .findElement(By.xpath("//div[@class='inventory_item'][1]//button"))
      .click();

    // Validate item successfully added to the cart
    // Memastikan bahwa item berhasil ditambahkan ke keranjang
    let cartCount = await driver
      .findElement(By.css(".shopping_cart_badge"))
      .getText();

    // Assert bahwa jumlah item di keranjang bertambah menjadi 1
    assert.strictEqual(cartCount, "1", "Item was not added to the cart successfully");

    console.log("Testing Success Running Headless in Chrome!");
  } finally {
    // Optionally close the browser after the test is complete
    // await driver.quit();
  }
}

saucedemoLoginTest();
