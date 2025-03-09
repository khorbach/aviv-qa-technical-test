import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';
import { AddPropertyPage } from '../pages/addPropertyPage';
import testData from '../testData/addProperty.json';

const propertyData = testData.validProperty;

test('Verify users can list a property with valid details and images', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const addPropertyPage = new AddPropertyPage(page);

    // Login
    await loginPage.navigate();
    await loginPage.fillLoginForm('agent@example.com', 'Test123!', false);
    await loginPage.submitLoginForm();
    await loginPage.verifyDashboardURL();
    
    // Add property
    await dashboardPage.clickAddProperty();
    await addPropertyPage.fillPropertyForm(propertyData);
    await addPropertyPage.uploadImage(propertyData.imagePath);
    await addPropertyPage.submitForm();

    // Extract property details dynamically from the JSON
    const propertyName = propertyData.title;
    const propertyPrice = `€${propertyData.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`; // Adding the Euro symbol and formatting the price with commas

    // Verify that the property name is visible
    await expect(page.locator(`h3:has-text("${propertyName}")`)).toBeVisible();

    // Verify the property price is visible and formatted correctly with the Euro symbol
    await expect(page.locator(`p.text-2xl.font-bold.text-blue-600.mb-4:has-text("${propertyPrice}")`)).toBeVisible();
});
