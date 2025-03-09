import { Page } from '@playwright/test';

export class AddPropertyPage {
    constructor(private page: Page) {}

    // Fill in "Add New Property" form
    async fillPropertyForm(propertyData: any) {
        await this.page.fill('input[name="title"]', propertyData.title);
        await this.page.fill('input[name="price"]', propertyData.price);
        await this.page.fill('input[name="bedrooms"]', propertyData.bedrooms);
        await this.page.fill('input[name="area"]', propertyData.area);
        await this.page.fill('input[name="bathrooms"]', propertyData.bathrooms);
        await this.page.fill('input[name="yearBuilt"]', propertyData.yearBuilt);
        await this.page.fill('input[name="address"]', propertyData.address);
        await this.page.fill('input[name="city"]', propertyData.city);
        await this.page.fill('input[name="state"]', propertyData.state);
        await this.page.fill('input[name="zipCode"]', propertyData.zipCode);
        await this.page.fill('textarea[name="description"]', propertyData.description);
    }

    // Upload an image from /assets folder
    async uploadImage(imagePath: string) {
        const fullPath = require('path').resolve(__dirname, '..', imagePath);
        await this.page.setInputFiles('input[type="file"]', fullPath);
    }

    // Click "Add Property"
    async submitForm() {
        await this.page.click('button[type="submit"]:has-text("Add Property")');
    }
}