const { BaseSwagLabPage } = require('./BaseSwagLab.page');
const { pages } = require('./Pages');

class ShopingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    // my selectors below
    get inventoryItemNames () { return $$('.inventory_item_name'); }

    get inventoryItemPrices () { return $$('.inventory_item_price'); }

    get inventoryItemDescs () { return $$('.inventory_item_desc') }



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

    async getItemNameById(id) {
        const itemNameById = await this.inventoryItemNames[id].getText();
        return itemNameById;
    }

    async getItemPriceById(id) {
        const itemPriceById = await this.inventoryItemPrices[id].getText();
        return itemPriceById;
    }

    async getItemDescById(id) {
        const itemDescById = await this.inventoryItemDescs[id].getText();
        return itemDescById;
    }

    async getCartItemsNamePriceDescDetails() {
        const cartItemsLength = await this.cartItems.length; //e.g.2
        const numOfCartItemIds = cartItemsLength - 1; //1

        //Test
        const cartItemIdsArray = [0,1,2,3,4,5]
        //Prod
        //cartItemIdsArray = []

        const cartItemsNamePriceDescDetails = []

        for (const id of cartItemIdsArray) {
          //add random items to cart

          const itemNamePriceDescDetails = {};

          //save item Name
          const itemName = await this.getItemNameById(id);
          itemNamePriceDescDetails.name = itemName;
          //save item Price
          const itemPrice = await this.getItemPriceById(id);
          itemNamePriceDescDetails.price = itemPrice;
          //save item Desc
          const itemDesc = await this.getItemDescById(id);
          itemNamePriceDescDetails.desc = itemDesc;

          cartItemsNamePriceDescDetails.push(itemNamePriceDescDetails);
        }

      return cartItemsNamePriceDescDetails;

    }

}

module.exports = { ShopingCartPage };
