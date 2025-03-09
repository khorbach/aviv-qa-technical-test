import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  emailInput;
  passwordInput;
  rememberMeCheckbox;
  signInButton;
  errorMessage;
  profileImage;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = this.page.locator('input[name="email"]');
    this.passwordInput = this.page.locator('input[name="password"]');
    this.rememberMeCheckbox = this.page.locator('input[name="remember-me"]');
    this.signInButton = this.page.locator('button[type="submit"]');
    this.errorMessage = this.page.locator('p.mt-1.text-sm.text-red-600');
    this.profileImage = this.page.locator('img.h-8.w-8.rounded-full'); 
  }

  // Navigate to the login page
  async navigate() {
    await this.page.goto("http://localhost:5173/login");
  }

  // Fill in the login form
  async fillLoginForm(email: string, password: string, rememberMe: boolean) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    
    // Check "Remember me" checkbox if required
    if (rememberMe) {
      await this.rememberMeCheckbox.check();
    }
  }

  // Submit the login form
  async submitLoginForm() {
    await this.signInButton.click();
  }

  // Get error messages, in case of validation failures
  async getErrorMessage(): Promise<string> {
    const errorMessages = await this.page.locator('p.mt-1.text-sm.text-red-600').allTextContents();
    return errorMessages.join(', ').trim(); // Join all error messages if there are multiple
  }

  // Verify that the profile image is visible based if the login is successful
  async verifyProfileImage(altText: string) {
    const profileImageLocator = this.page.locator(`img[alt="${altText}"]`);
    await profileImageLocator.waitFor({ state: 'visible' });
    return profileImageLocator;
  }

  // Verify URL if login is sucessful
  async verifyDashboardURL() {
    await this.page.waitForURL('http://localhost:5173/dashboard');
  }
}
