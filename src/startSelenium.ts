import { Builder, By, until, WebDriver, WebElement } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import dotenv from 'dotenv';

dotenv.config();

const email = process.env.EMAIL!;
const password = process.env.PASSWORD!;

if (!email || !password) {
    throw new Error('Missing EMAIL or PASSWORD environment variables');
}

let driver: WebDriver | null = null;

export async function startSelenium() {
    if (driver) {
        console.log('A Selenium instance is already running. Stopping it before starting a new one.');
        await stopSelenium();
    }

    const options = new Options();
    options.addArguments('--headless');
    driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        // Open Google login page
        await driver.get('https://accounts.google.com/signin');

        // Enter email
        const emailField: WebElement = await driver.wait(
            until.elementLocated(By.id('identifierId')),
            3000000
        );
        await emailField.sendKeys(email);
        await emailField.sendKeys('\n');
        console.log('Email entered');
        // Enter password
        const passwordField: WebElement = await driver.wait(
            until.elementLocated(By.name('Passwd')),
            3000000
        );
        await passwordField.sendKeys(password);
        await passwordField.sendKeys('\n');
        console.log('Password entered');
        // Wait for login to complete
        await driver.sleep(20000);
        console.log('Successfully logged in');
        // Navigate to Google Colab
        await driver.get('https://colab.research.google.com/drive/1iaWEbuA2TvHe3Gqc-xIMQkVEaEIR2OR5');

        // Interact with shadow DOM elements
        console.log('Redirectd to Google Colab');
        // Locate the shadow host for the run button
        const shadowHost: WebElement = await driver.findElement(By.css(
            "colab-tab-layout-container colab-tab-pane colab-tab colab-shaded-scroller colab-run-button"
        ));

        // Access the shadow root
        const shadowRoot = await driver.executeScript('return arguments[0].shadowRoot', shadowHost) as WebDriver;

        // Locate the run button within the shadow root
        const runButton: WebElement = await shadowRoot.findElement(By.css('#run-button'));

        // Click the run button
        await runButton.click();

        console.log('Clicked the run button');

        console.log('Successfully ran the notebook!');
    } catch (error) {
        console.error('Error during Selenium execution:', error);
    }
}

export async function stopSelenium() {
    if (driver) {
        console.log('Stopping the existing Selenium instance.');
        await driver.quit();
        driver = null;
    } else {
        console.log('No Selenium instance is running.');
    }
}