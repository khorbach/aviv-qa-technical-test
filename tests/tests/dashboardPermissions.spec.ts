import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';
import loginData from '../testData/login.json';
import userPermissions from '../testData/userPermissions.json';

test.describe('Dashboard Permissions Tests', () => {
  for (const role of Object.keys(userPermissions)) {
    const user = loginData[role];

    test(`Verify dashboard visibility and permissions for ${role}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const dashboardPage = new DashboardPage(page);

      await loginPage.navigate();
      await loginPage.fillLoginForm(user.email, user.password, false);
      await loginPage.submitLoginForm();
      
      // Verify the dashboard URL and profile image
      const isProfileImageVisible = await dashboardPage.verifyDashboardURL(user.profileAltText);
      expect(isProfileImageVisible).toBeTruthy(); 

      // Check if all expected dashboard items are visible
      for (const item of userPermissions[role].dashboardItems) {
        const isVisible = await dashboardPage.isDashboardItemVisible(item);
        expect(isVisible).toBeTruthy();
      }

      // Check if "Add Property" button is visible only for Agent user
      const addPropertyButtonVisible = await dashboardPage.isAddPropertyButtonVisible(role);
      if (role === 'validAgent') {
        expect(addPropertyButtonVisible).toBeTruthy();  
      } else {
        expect(addPropertyButtonVisible).toBeFalsy();
      }

      await dashboardPage.logout();
    });
  }
});
