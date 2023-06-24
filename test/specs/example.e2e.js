const { pages } = require('../pages/Pages');

describe('My First Test', () => {
    it('Perform login', async () => {
        await pages.loginPage.navigate();
        await pages.loginPage.performLogin('standard_user', 'secret_sauce');

        await expect(pages.inventoryPage.headerTitle).toBeExisting();

        await expect(pages.inventoryPage.headerTitle).toBeExisting();

        await expect(pages.inventoryPage.inventoryItems).toBeElementsArrayOfSize({ gte: 1 });
    });

    it('Add and remove product from the cart', async () => {
        await pages.loginPage.navigate();
        await pages.loginPage.performLogin('standard_user', 'secret_sauce');
        await pages.inventoryPage.addItemToCartById(0);
        expect(await pages.inventoryPage.getNumberOfItemsInCart()).toBe('1');

        await pages.inventoryPage.shopingCart.click();
        await expect(pages.shopingCartPage.cartItems).toBeElementsArrayOfSize(1);

        await pages.shopingCartPage.removeCartItemById(0);
        await expect(pages.shopingCartPage.cartItems).not.toBeExisting();
    });

    it.only('Perform and verify sorting on the Inventory page', async () => {
        await pages.loginPage.navigate();
        await pages.loginPage.performLogin('standard_user', 'secret_sauce');

        await pages.inventoryPage.sortNameAtoZ();
        //retrieve all items names from the page and compare with sorted items array
        const sortedItemsAZ = (await pages.inventoryPage.getItemNames()).sort();
        expect (await pages.inventoryPage.getItemNames()).toEqual(sortedItemsAZ);
        

        await pages.inventoryPage.sortNameZtoA();
        const unsortedItems = (await pages.inventoryPage.getItemNames());
        // I don't know how this localCompare thing works
        const sortedItemsZA = unsortedItems.sort((a, b) => b.localeCompare(a));
        expect (await pages.inventoryPage.getItemNames()).toEqual(sortedItemsZA);

        await pages.inventoryPage.sortPriceLowToHigh();
        const unsortedPrices = (await pages.inventoryPage.getItemPrices());
        const sortedPricesLoHi = unsortedPrices.sort((a, b) => a - b);
        expect (await pages.inventoryPage.getItemPrices()).toEqual(sortedPricesLoHi);

        await pages.inventoryPage.sortPriceHighToLow();
        const sortedPricesHiLo = unsortedPrices.sort((a, b) => b - a);
        expect (await pages.inventoryPage.getItemPrices()).toEqual(sortedPricesHiLo);
        
    });

});
