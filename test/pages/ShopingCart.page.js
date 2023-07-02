const { BaseSwagLabPage } = require('./BaseSwagLab.page');
const { pages } = require('./Pages');

const { Items } = require('./ShopItems.pageFragment');

class ShopingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    items = new Items();

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    // my selectors below
    get inventoryItemNames() { return $$('.inventory_item_name'); }

    get inventoryItemPrices() { return $$('.inventory_item_price'); }

    get inventoryItemDescs() { return $$('.inventory_item_desc'); }

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

        // create an array or item ids from 0 to the last available item
        function createArray(numOfItemIds) {
            const result = [];
            for (let i = 0; i <= numOfItemIds; i += 1) {
                result.push(i);
            }
            return result;
        }

        const cartItemIds = createArray(numOfCartItemIds);
        //Test
        // const cartItemIds = [0,1,2]

        const cartItemsNamePriceDescDetails = [];

        for (let id = 0; id < cartItemsLength; id += 1) {

            // const fruit = fruitsToGet[id]
            // const numFruit = await getNumFruit(fruit)
            
            const itemName = await this.getItemNameById(id);
            const itemPrice = await this.getItemPriceById(id);
            const itemDesc = await this.getItemDescById(id);
            cartItemsNamePriceDescDetails.push(itemName, itemPrice, itemDesc);
          }

        // cartItemIds.forEach(async (id) => {
            // const itemName = await this.getItemNameById(id);
            // const itemPrice = await this.getItemPriceById(id);
            // const itemDesc = await this.getItemDescById(id);
            // cartItemsNamePriceDescDetails.push(itemName, itemPrice, itemDesc);
        //     // return Promise.all([itemName, itemPrice, itemDesc]);
        // })
      return cartItemsNamePriceDescDetails;

    }

}

module.exports = { ShopingCartPage };
