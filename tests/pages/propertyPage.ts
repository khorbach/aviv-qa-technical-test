import { Page, Locator } from '@playwright/test';

export class PropertyPage {
    private page: Page;
    private sendMessageButton: Locator;
    private messageField: Locator;
    private nameField: Locator;
    private emailField: Locator;
    private phoneField: Locator;
    private submitButton: Locator;
    private descriptionField: Locator;
    private statusField: Locator;
    private availabilityField: Locator;
    private agentField: Locator;
    private agentTitleField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sendMessageButton = page.locator('button:has-text("Send Message")');
        this.messageField = page.locator('textarea[name="message"]');
        this.nameField = page.locator('input[name="name"]');
        this.emailField = page.locator('input[name="email"]');
        this.phoneField = page.locator('input[name="phone"]');
        this.submitButton = page.locator('button[type="submit"]');
        
        // Initialize the locators for property details
        this.descriptionField = page.locator('.property-description');
        this.statusField = page.locator('.property-status');
        this.availabilityField = page.locator('.property-availability');
        this.agentField = page.locator('.property-agent');
        this.agentTitleField = page.locator('.property-agent-title');
    }

    // Validate property details on the page
    async validatePropertyDetails(property: any) {
        await this.page.waitForSelector(`text=${property.title}`);
        await this.page.waitForSelector(`text=${property.address}`);
        await this.page.waitForSelector(`text=€${property.price.toLocaleString()}`); // Ensures correct price format

        // Validate additional property details
        await this.page.waitForSelector(`text=${property.description}`);
        await this.page.waitForSelector(`text=${property.status}`);
        await this.page.waitForSelector(`text=${property.availability}`);
        await this.page.waitForSelector(`text=${property.agent}`);
        await this.page.waitForSelector(`text=${property.agentTitle}`);
    }

    async clickSendMessageButton() {
        await this.sendMessageButton.click();
    }

    async fillMessageField(message: string) {
        await this.messageField.fill(message);
    }

    async fillOutMessageForm(data: { name: string; email: string; phone: string; message: string }) {
        await this.nameField.fill(data.name);
        await this.emailField.fill(data.email);
        await this.phoneField.fill(data.phone);
        await this.messageField.fill(data.message);
    }

    async submitMessageForm() {
        await this.submitButton.click();
    }
}
