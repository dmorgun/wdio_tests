const { InventoryPage } = require('./Inventory.page');
const { LoginPage } = require('./Login.page');
const { ShopingCartPage } = require('./ShopingCart.page');
const { Items } = require('./ShopItems.pageFragment');
const { CheckOutStepOne } = require('./CheckoutStepOne.page');
const { CheckOutStepTwo } = require('./CheckOutStepTwo.page');

module.exports = {
    pages: {
        loginPage: new LoginPage(),
        inventoryPage: new InventoryPage(),
        shopingCartPage: new ShopingCartPage(),
        items: new Items(),
        checkoutStepOne: new CheckOutStepOne(),
        checkoutStepTwo: new CheckOutStepTwo()
    },
};
