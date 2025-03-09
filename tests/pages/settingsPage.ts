import { Page, Locator } from '@playwright/test';

export class SettingsPage {
    private page: Page;
    private nameField: Locator;
    private emailField: Locator;
    private phoneField: Locator;
    private currentPasswordField: Locator;
    private newPasswordField: Locator;
    private saveChangesButton: Locator;
    private successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameField = page.locator('input[name="name"]');
        this.emailField = page.locator('input[name="email"]');
        this.phoneField = page.locator('input[name="phone"]');
        this.currentPasswordField = page.locator('input[name="currentPassword"]');
        this.newPasswordField = page.locator('input[name="newPassword"]');
        this.saveChangesButton = page.locator('button[type="submit"]');
        this.successMessage = page.locator('text="Settings updated successfully"');
    }

    async verifySettingsPage() {
        await this.page.waitForURL('http://localhost:5173/settings');
    }
 
    // Update user profile data
    async updateProfile(data: { name: string, email: string, phone: string, currentPassword: string, newPassword: string }) {
        await this.nameField.fill(data.name);
        await this.emailField.fill(data.email);
        await this.phoneField.fill(data.phone);
        await this.currentPasswordField.fill(data.currentPassword);
        await this.newPasswordField.fill(data.newPassword);
    }

    async saveChanges() {
        await this.saveChangesButton.click();
    }

    async verifySuccessMessage() {
        await this.successMessage.waitFor({ state: 'visible' });
    }

    // Validation checks
    async verifyNameValidationError() {
        const error = await this.page.locator('text=Name must be at least 2 characters').isVisible();
        return error;
    }

    async verifyEmailValidationError() {
        const error = await this.page.locator('text=Invalid email address').isVisible();
        return error;
    }

    async verifyPhoneValidationError() {
        const error = await this.page.locator('text=Please enter a valid phone number').isVisible();
        return error;
    }

    async verifyUpdatedDetails(data: { name: string, email: string, phone: string }) {
        const name = await this.nameField.inputValue();
        const email = await this.emailField.inputValue();
        const phone = await this.phoneField.inputValue();

        return name === data.name && email === data.email && phone === data.phone;
    }
}
