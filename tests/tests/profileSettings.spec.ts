import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';
import { SettingsPage } from '../pages/settingsPage';
import profileData from '../testData/profileData.json';

test.describe('Profile Settings Management', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let settingsPage: SettingsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    settingsPage = new SettingsPage(page);
    await loginPage.navigate();
  });

  async function loginAndNavigateToSettings(user: any) {
    await loginPage.fillLoginForm(user.email, user.password, user.rememberMe);
    await loginPage.submitLoginForm();

    // Verify user is redirected to the dashboard and the profile image is visible
    await expect(dashboardPage.verifyDashboardURL(user.profileAltText)).toBeTruthy();

    // Click the profile image to open the menu
    await dashboardPage.clickProfileImage(user.profileAltText);

    // Click the Settings button in the dropdown menu
    await dashboardPage.clickSettingsButton();
    const currentURL = await dashboardPage.getCurrentURL();
    await expect(currentURL).toBe('http://localhost:5173/settings');
  }

  // Positive test scenario: Update profile with valid data
  test('Verify profile settings for valid user', async ({ page }) => {
    const user = profileData.validUser;
    const updatedData = profileData.updatedProfileData;

    await loginAndNavigateToSettings(user);
    await settingsPage.verifySettingsPage();
    
    await settingsPage.updateProfile({ ...updatedData, currentPassword: user.password });
    await settingsPage.saveChanges();
    await settingsPage.verifySuccessMessage();
    await settingsPage.verifyUpdatedDetails(updatedData);
  });

  // Negative test scenario: Short name validation error
  test('Verify validation error for short name', async ({ page }) => {
    const user = profileData.validUser;
    const invalidData = profileData.invalid.shortName;

    await loginAndNavigateToSettings(user);
    await settingsPage.verifySettingsPage();
    
    await settingsPage.updateProfile({ ...invalidData, currentPassword: user.password });
    await settingsPage.saveChanges();
    await settingsPage.verifyNameValidationError();
  });

  // Negative test scenario: Invalid email format
  test('Verify validation error for invalid email', async ({ page }) => {
    const user = profileData.validUser;
    const invalidData = profileData.invalid.invalidEmail;

    await loginAndNavigateToSettings(user);
    await settingsPage.verifySettingsPage();
    
    await settingsPage.updateProfile({ ...invalidData, currentPassword: user.password });
    await settingsPage.saveChanges();
    await settingsPage.verifyEmailValidationError();
  });

  // Negative test scenario: Invalid phone number
  test('Verify validation error for invalid phone number', async ({ page }) => {
    const user = profileData.validUser;
    const invalidData = profileData.invalid.invalidPhone;

    await loginAndNavigateToSettings(user);
    await settingsPage.verifySettingsPage();
    
    await settingsPage.updateProfile({ ...invalidData, currentPassword: user.password });
    await settingsPage.saveChanges();
    await settingsPage.verifyPhoneValidationError();
  });
});
