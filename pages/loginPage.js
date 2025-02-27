const { By } = require('selenium-webdriver');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  async login(username, password) {
    await this.driver.findElement(By.id('user-name')).sendKeys(username);
    await this.driver.findElement(By.id('password')).sendKeys(password);
    await this.driver.findElement(By.name('login-button')).click();
  }

  async isLoginSuccessful() {
    let titleText = await this.driver.findElement(By.css('.app_logo')).getText();
    return titleText.includes("Swag Labs");
  }

  async getErrorMessage() {
    return await this.driver.findElement(By.css('.error-message-container')).getText();
  }
}

module.exports = LoginPage;
