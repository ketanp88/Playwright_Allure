import { test } from './setupFixtures';

test.describe('Search Hotel Page scenarios', () => {

    test('Verify search hotel functionality', async ({testBase, doLogin, searchHotelPage}, testInfo) => {
        await searchHotelPage.enterDataInSearchHotel("Sydney", "", "", "", "", "", "", "");
        await searchHotelPage.verifySearchedHotel("Sydney");
    });

});

