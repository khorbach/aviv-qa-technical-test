import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage'; // Import your page object
import loginData from '../testData/login.json'; // Import the JSON file with the test data

type LoginTestCase = {
  email: string;
  password: string;
  rememberMe: boolean;
  profileAltText?: string; // Include profileAltText in the test data
  expectedError?: string | string[]; // Optional for negative cases
};

test.describe.parallel("Login and Logout Tests", () => {
  const testCases: Record<string, LoginTestCase> = loginData;

  for (const [key, data] of Object.entries(testCases)) {
    test(`Login with: ${key}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      // Navigate to the login page
      await loginPage.navigate();
      await loginPage.fillLoginForm(data.email, data.password, data.rememberMe);
      await loginPage.submitLoginForm();

      if (data.expectedError) {
        // Check error messages
        const errors = await loginPage.getErrorMessage();
        if (Array.isArray(data.expectedError)) {
          for (const err of data.expectedError) {
            expect(errors).toContain(err);
          }
        } else {
          expect(errors).toContain(data.expectedError);
        }
      } else {
        // Handle successful login cases
        await expect(page).toHaveURL('http://localhost:5173/dashboard', { timeout: 60000 });

        // Verify profile image if specified
        if (data.profileAltText) {
          const profileImage = page.locator(`img[alt="${data.profileAltText}"]`);
          await expect(profileImage).toBeVisible();
        }

        // Logout Process
        const profileButton = page.locator('button.flex.items-center.focus\\:outline-none');
        await profileButton.click(); 
        const logoutButton = page.locator('button:has-text("Logout")'); // Logout button
        await logoutButton.click(); 

        // Verify that user is redirected to the login page
        await expect(page).toHaveURL('http://localhost:5173/login', { timeout: 10000 });

        // Verify "Sign in to your account" header is shown
        const signInHeader = page.locator('h2:text("Sign in to your account")');
        await expect(signInHeader).toBeVisible();
      }
    });
  }
});
