const { By } = require('selenium-webdriver');

class AddToCartPage {
  constructor(driver) {
    this.driver = driver;
  }

  async addToCart(productIndex) {
    await this.driver
      .findElement(By.xpath(`//div[@class='inventory_item'][${productIndex}]//button`))
      .click();
  }

  async getCartCount() {
    return await this.driver.findElement(By.css('.shopping_cart_badge')).getText();
  }
}

module.exports = AddToCartPage;
