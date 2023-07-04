/* eslint-disable spaced-comment */
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

    //Test 1
    //TODO
    //Break down 1 test into 4 tests not copying code

    it('Perform and verify sorting on the Inventory page', async () => {
        await pages.loginPage.navigate();
        await pages.loginPage.performLogin('standard_user', 'secret_sauce');

        await pages.inventoryPage.sortNameAtoZ();
        //retrieve all items names from the page and compare with sorted items array
        const sortedItemsAZ = (await pages.items.getItemNames()).sort();
        expect(await pages.items.getItemNames()).toEqual(sortedItemsAZ);

        await pages.inventoryPage.sortNameZtoA();
        const unsortedItems = (await pages.items.getItemNames());
        // I don't know how this localCompare thing works
        const sortedItemsZA = unsortedItems.sort((a, b) => b.localeCompare(a));
        expect(await pages.items.getItemNames()).toEqual(sortedItemsZA);

        await pages.inventoryPage.sortPriceLowToHigh();
        const unsortedPrices = (await pages.items.getItemPrices());
        const sortedPricesLoHi = unsortedPrices.sort((a, b) => a - b);
        expect(await pages.items.getItemPrices()).toEqual(sortedPricesLoHi);

        await pages.inventoryPage.sortPriceHighToLow();
        const sortedPricesHiLo = unsortedPrices.sort((a, b) => b - a);
        expect(await pages.items.getItemPrices()).toEqual(sortedPricesHiLo);
    });

    //Test2
    it('Add random products to Cart, verify they`re displayed correctly', async () => {
        await pages.loginPage.navigate();
        await pages.loginPage.performLogin('standard_user', 'secret_sauce');
        // const test = await $$('.inventory_item_name')[0].getText();
        const itemsNamePriceDescDetails = await pages.inventoryPage.addRandomItemsToCart();
        //navigate to cart
        await $('.shopping_cart_link').click();
        //const cartItemsNamePriceDescDetails Prod
        const cartItemsNamePriceDescDetails = await pages.shopingCartPage.getCartItemsNamePriceDescDetails();
        //check Name, Description, and Price values in Cart]
        expect(itemsNamePriceDescDetails).toEqual(cartItemsNamePriceDescDetails);
        await pages.shopingCartPage.removeAllCartItemsById();
    });

    //Test3
    it('Add random products to Cart, checkout, fill the data, verify they`re displayed correctly, calculate total price', async () => {
        await pages.loginPage.navigate();
        await pages.loginPage.performLogin('standard_user', 'secret_sauce');
        
        const itemsNamePriceDescDetails = await pages.inventoryPage.addRandomItemsToCart();
        //navigate to cart
        await $('.shopping_cart_link').click();
        // click Checkout btn
        await $('#checkout').click();
        // fill the data
        await pages.checkoutStepOne.fillForm('Daria', 'Morgun', '03143');
        // click Continue
        await $('#continue').click();
        // verify products
        const checkoutItemsNamePriceDescDetails = await pages.shopingCartPage.getCartItemsNamePriceDescDetails();
        //check Name, Description, and Price values in Cart]
        expect(itemsNamePriceDescDetails).toEqual(checkoutItemsNamePriceDescDetails);
        // verify total price
        const expectedTotalPrice = await pages.checkoutStepTwo.getExpectedTotalPrice();
        const actualTotalPrice = await pages.checkoutStepTwo.getTotalPrice();
        expect(actualTotalPrice).toEqual(expectedTotalPrice);
    });
});
