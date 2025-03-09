import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import propertiesData from '../testData/properties.json';
import searchData from '../testData/searchData.json';

test.describe('Search Functionality Tests', () => {
  for (const searchTest of searchData.searchTests) {
    test(`Search For: ${searchTest.name}`, async ({ page }) => {
      const searchPage = new SearchPage(page);

      await test.step(`Navigating to search page`, async () => {
        await searchPage.navigateToSearchPage();
      });

      await test.step(`Filling search form with filters: ${JSON.stringify(searchTest.filters)}`, async () => {
        await searchPage.fillSearchForm(searchTest.filters);
      });

      await test.step(`Verifying expected results`, async () => {
        for (const expectedTitle of searchTest.expectedResults) {
          const isTitleVisible = await searchPage.searchForProperty(expectedTitle);
          expect(isTitleVisible).toBeTruthy();
        }
      });

      if (searchTest.expectedResults.length === 0) {
        await test.step(`Checking for "No properties match your search criteria" message`, async () => {
          await expect(page.locator('p.text-gray-500')).toHaveText('No properties match your search criteria.');
        });
      }

      // Click Reset button
      await test.step('Click Reset and verify all properties are displayed', async () => {
        await searchPage.clickResetButton();

        // Verify all properties from properties.json are visible
        for (const property of propertiesData.properties) {
          const isPropertyVisible = await searchPage.searchForProperty(property.title);
          expect(isPropertyVisible).toBeTruthy();
        }
      });
    });
  }
});
