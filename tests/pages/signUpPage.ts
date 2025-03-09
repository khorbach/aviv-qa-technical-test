import { Page } from "@playwright/test";

export class SignUpPage {
  readonly page: Page;

  // Locators
  fullNameInput;
  emailInput;
  phoneInput;
  accountTypeSelect;
  passwordInput;
  confirmPasswordInput;
  submitButton;
  successMessage;
  errorMessage;

  constructor(page: Page) {
    this.page = page;

    // Locators initialized
    this.fullNameInput = this.page.locator('input[name="name"]');
    this.emailInput = this.page.locator('input[name="email"]');
    this.phoneInput = this.page.locator('input[name="phone"]');
    this.accountTypeSelect = this.page.locator('select[name="role"]');
    this.passwordInput = this.page.locator('input[name="password"]');
    this.confirmPasswordInput = this.page.locator('input[name="confirmPassword"]');
    this.submitButton = this.page.locator('button[type="submit"]');
    this.errorMessage = this.page.locator("#errorMessage");
  }

  // Navigate to the Sign-Up page
  async navigate() {
    await this.page.goto("http://localhost:5173/register");
  }

  // Fill in the sign-up form
  async fillSignUpForm(
    fullName: string,
    email: string,
    phone: string,
    accountType: string,
    password: string,
    confirmPassword: string
  ) {
    await this.fullNameInput.fill(fullName);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.accountTypeSelect.selectOption(accountType);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  // Submit the sign-up form
  async submitSignUpForm() {
    await this.submitButton.click();
  }

  // Get all error messages for validation failures
  async getAllErrorMessages(): Promise<string[]> {
    const errorMessageLocator = this.page.locator('p.mt-1.text-sm.text-red-600');
    const errorMessages = await errorMessageLocator.allTextContents();
    return errorMessages.filter((msg) => msg.trim() !== ''); // Filter out any empty strings
  }

  // Wait for dashboard and check title for successful sign-ups
  async verifyDashboard() {
    await this.page.waitForURL("http://localhost:5173/dashboard");
    const title = await this.page.locator("h1").textContent();
    return title;
  }
}
