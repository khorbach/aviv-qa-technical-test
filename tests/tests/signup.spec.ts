import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pages/signUpPage';
import signUpData from '../testData/signUp.json';

type SignUpTestCase = {
  fullName: string;
  email: string;
  phone: string;
  accountType: string;
  password: string;
  confirmPassword: string;
  expectedErrorMessages?: string[];
};

test.describe.parallel("Sign-Up Page Tests", () => {
  const testCases: Record<string, SignUpTestCase> = signUpData;

  for (const [key, userData] of Object.entries(testCases)) {
    test(`Sign-up with: ${key}`, async ({ page }) => {
      const signUpPage = new SignUpPage(page);
      await signUpPage.navigate();

      console.log(`Running test case: ${key}`);

      // Fill in Registration form
      await signUpPage.fillSignUpForm(
        userData.fullName,
        userData.email,
        userData.phone,
        userData.accountType,
        userData.password,
        userData.confirmPassword
      );

      // Submit the form
      await signUpPage.submitSignUpForm();

      if (userData.expectedErrorMessages) {
        // Handle validation errors
        const errorMessages = await signUpPage.getAllErrorMessages();
        userData.expectedErrorMessages.forEach(expectedMessage => {
          expect(errorMessages).toContain(expectedMessage);
        });
      } else {
        // Verify navigation to Dashboard page for successful registration
        await expect(page).toHaveURL('http://localhost:5173/dashboard', { timeout: 60000 });

        // Verify correct dashboard title
        const dashboardTitle = await signUpPage.verifyDashboard();
        expect(dashboardTitle).toBe(userData.accountType === 'agent' ? "Agent Dashboard" : "My Dashboard");
      }
    });
  }
});
