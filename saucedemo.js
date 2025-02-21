const {Builder, By, Key, until } = require("selenium-webdriver");
const assert = require('assert')

async function saucedemoLoginTest() {
  
    let driver = await new Builder().forBrowser("chrome").build();
    try {
    
        await driver.get("https://saucedemo.com");

        await driver.findElement(By.id('user-name')).sendKeys('standard_user')
        await driver.findElement(By.xpath("//input[@id='password']")).sendKeys("secret_sauce")

        await driver.findElement(By.name("login-button")).click();
        let titleText = await driver.findElement(By.css(".app_logo")).getText();
        assert.strictEqual(
            titleText.includes("Swag Lab"), true, 'Title does not include "Swag Lab"');
            let addToCartButton = await driver.findElement(By.id("add-to-cart-sauce-labs-backpack"));
            await addToCartButton.click();
        
        let cartBadge = await driver.findElement(By.className("shopping_cart_badge"));
        let cartItemCount = await cartBadge.getText();
        assert.strictEqual(
            cartItemCount, "1", "Item was not added to the cart");

    } finally {
        // await driver.quit();
    }
}

saucedemoLoginTest();