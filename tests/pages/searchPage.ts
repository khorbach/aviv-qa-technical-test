import { Page } from '@playwright/test';

export class SearchPage {
  constructor(private page: Page) {}

    // Navigate to the "All Properties" page
  async navigateToSearchPage() {
    await this.page.goto('http://localhost:5173/properties');
  }
  // Fill in search input fields
  async fillSearchForm(filters: { location: string; minPrice: string; maxPrice: string; type: string; bedrooms: string }) {
    await this.page.fill('input[name="location"]', filters.location);
    await this.page.fill('input[name="minPrice"]', filters.minPrice);
    await this.page.fill('input[name="maxPrice"]', filters.maxPrice);
    await this.page.selectOption('select[name="type"]', filters.type);
    await this.page.selectOption('select[name="bedrooms"]', filters.bedrooms);
    await this.page.click('button[type="submit"]');
  }

  async searchForProperty(title: string): Promise<boolean> {
    await this.page.waitForTimeout(2000);

    // Check if the property title text exists
    return await this.page.locator(`text=${title}`).first().isVisible();
  }

  async clickResetButton() {
    // Click the Reset button
    await this.page.click('button:text("Reset")'); 
    await this.page.waitForTimeout(2000);
  }
}
