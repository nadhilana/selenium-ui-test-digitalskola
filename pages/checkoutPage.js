const { By } = require('selenium-webdriver');

class CheckoutPage {
  constructor(driver) {
    this.driver = driver;
  }

  async enterCheckoutInformation(firstName, lastName, postalCode) {
    await this.driver.findElement(By.id('first-name')).sendKeys(firstName);
    await this.driver.findElement(By.id('last-name')).sendKeys(lastName);
    await this.driver.findElement(By.id('postal-code')).sendKeys(postalCode);
    await this.driver.findElement(By.name('continue')).click();
  }

  async completeCheckout() {
    await this.driver.findElement(By.name('finish')).click();
  }

  async getConfirmationMessage() {
    return await this.driver.findElement(By.css('.complete-header')).getText();
  }
}

module.exports = CheckoutPage;
