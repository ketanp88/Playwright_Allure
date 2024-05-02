import { test } from './setupFixtures';

test.describe('Login Page scenarios', () => {
    
    test('Verify login with valid credentials', async ({testBase, loginPage}, testInfo) => {
        await loginPage.doLogin();
        await loginPage.verifySuccessfulLogin();
    });

    test('Verify login with invalid credentials for hotel', async ({testBase, loginPage}, testInfo) => {
        await loginPage.doLogin("Invalid Credentials");
        await loginPage.verifySuccessfulLogin();
    });
   
});

