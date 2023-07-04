const { BaseSwagLabPage } = require('./BaseSwagLab.page');
const { pages } = require('./Pages');

const { Items } = require('./ShopItems.pageFragment');

class ShopingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    items = new Items();

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
    async getCartItemsNamePriceDescDetails() {
        const cartItemsLength = await this.cartItems.length;

        const cartItemsNamePriceDescDetails = [];

        for (let id = 0; id < cartItemsLength; id += 1) {
            const itemName = await this.items.getItemNameById(id);
            const itemPrice = await this.items.getItemPriceById(id);
            const itemDesc = await this.items.getItemDescById(id);
            cartItemsNamePriceDescDetails.push(itemName, itemPrice, itemDesc);
          }
      return cartItemsNamePriceDescDetails;
    }

    async removeAllCartItemsById() {
        const cartItemsLength = await this.cartItems.length;
        for (let id = 0; id < cartItemsLength; id += 1) {
            // remove the item with id=0 as many times as there are cart items
            await this.removeCartItemById(0);
          }
    }
}

module.exports = { ShopingCartPage };
