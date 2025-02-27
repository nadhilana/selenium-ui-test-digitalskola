const { By } = require("selenium-webdriver");

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
  }

  async getProductList() {
    return await this.driver.findElements(By.css('.inventory_item'));
  }

  async addProductToCart(productIndex) {
    const products = await this.getProductList();
    await products[productIndex]
      .findElement(By.tagName('button'))
      .click();
  }

  async getCartCount() {
    return await this.driver.findElement(By.css('.shopping_cart_badge')).getText();
  }
}

module.exports = InventoryPage;