const { BaseSwagLabPage } = require('./BaseSwagLab.page');

class ShopingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    get headerTitle() { return $('.title'); }

    get cartItems() { return $$(this.cartItemSelector); }

    // async below added to show the function returns a promise
    async getCartItemByName(name) { return $(`${this.cartItemSelector}=${name}`); }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.$(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems[id].$(this.removeItemSelector).click();
    }

    //my methods below

}

module.exports = { ShopingCartPage };
