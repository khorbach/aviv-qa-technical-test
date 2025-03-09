import { test, expect } from '@playwright/test';
import loginData from '../testData/login.json';
import messageData from '../testData/messageData.json';
import properties from '../testData/properties.json';
import { LoginPage } from '../pages/loginPage';
import { PropertyPage } from '../pages/PropertyPage';

test.describe('Property Page Tests', () => {
    for (const property of properties.properties) {
        test(`Validate property details and send message tests for: ${property.title}`, async ({ page }) => {
            const propertyPage = new PropertyPage(page);

            // Step 1: Validate Property Details
            await page.goto(property.url);
            await propertyPage.validatePropertyDetails(property);

            // Step 2: Send Message (as non-login)
            await page.context().clearCookies();
            await page.goto(property.url);
            await propertyPage.clickSendMessageButton();
            await propertyPage.fillOutMessageForm(messageData.loggedOutUser);
            await propertyPage.submitMessageForm();
            await expect(page.locator('text=Message Sent!')).toBeVisible();
        });
    }
});
