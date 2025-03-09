import { Page } from '@playwright/test';

export class DashboardPage {
    constructor(private page: Page) {}

    // Verifies the dashboard URL and ensures the profile image is visible
    async verifyDashboardURL(profileAltText: string): Promise<boolean> {
        await this.page.waitForURL('http://localhost:5173/dashboard');
        
        // Check if the profile image is visible
        const profileImage = this.page.locator(`img[alt="${profileAltText}"]`);
        await profileImage.waitFor(); 
        return profileImage.isVisible(); 
    }

    getProfileImageLocator(altText: string) {
        return this.page.locator(`img[alt="${altText}"]`);
    }

    // Click the profile image to open the dropdown menu
    async clickProfileImage(altText: string) {
        const profileImage = this.getProfileImageLocator(altText);
        await profileImage.waitFor();
        await profileImage.click();
    }

    // Click Settings in the dropdown menu
    getSettingsButtonLocator() {
        return this.page.locator('a:has-text("Settings")');
    }

    async clickSettingsButton() {
        const settingsButton = this.getSettingsButtonLocator();
        await settingsButton.waitFor();
        await settingsButton.click();
    }

    async getCurrentURL(): Promise<string> {
        return await this.page.url();  // Return the current URL
    }

    // Logout from the dashboard
    async logout() {
        await this.page.waitForSelector('button.flex.items-center.focus\\:outline-none');
        await this.page.click('button.flex.items-center.focus\\:outline-none');
        await this.page.waitForSelector('button:has-text("Logout")');
        await this.page.click('button:has-text("Logout")');
    }

    // Click "Add Property" button
    async clickAddProperty() {
        await this.page.waitForSelector('button:has-text("Add Property")');
        await this.page.click('button:has-text("Add Property")');
    }

    // Check if a dashboard item is visible
    async isDashboardItemVisible(item: string): Promise<boolean> {
        return await this.page.locator(`h3:has-text("${item}")`).isVisible();
    }

    // Check if the "Add Property" button is visible, but only for validAgent
    async isAddPropertyButtonVisible(role: string): Promise<boolean> {
        // Only validAgent should see the "Add Property" button
        return role === 'validAgent' && await this.page.locator('button:has-text("Add Property")').isVisible();
    }
}
