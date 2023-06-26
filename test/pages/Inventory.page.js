const { BaseSwagLabPage } = require('./BaseSwagLab.page');

const lodash = require('lodash');

class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return $('.title'); }

    get inventoryItems() { return $$('.inventory_item'); }

    get addItemToCartBtns() { return $$('[id^="add-to-cart"]'); }

    // my selectors below
    get inventoryItemNames () { return $$('.inventory_item_name'); }

    get inventoryItemPrices () { return $$('.inventory_item_price'); }

    get inventoryItemDescs () { return $$('.inventory_item_desc') }


    // my getters below
    get sortingDropdown() { return $('.product_sort_container'); }

    get sortNameAtoZDropdownOption () { return $('option[value="az"]'); }

    get sortNameZtoADropdownOption () { return $('option[value="za"]'); }

    get sortPriceLowToHighDropdownOption () { return $('option[value="lohi"]'); }

    get sortPriceHighToLowDropdownOption () { return $('option[value="hilo"]'); }


    async addItemToCartById(id) {
        await this.addItemToCartBtns[id].click();
    }

 
    
    //my methods below

    //TODO
    //Create 1 method for choosing sort option
    
    async sortNameAtoZ() {
        await this.sortingDropdown.click();
        //await $('.product_sort_container').click();
        await this.sortNameAtoZDropdownOption.click();
        ////await $('option[value="az"]').click();
    }

    async sortNameZtoA() {
        await this.sortingDropdown.click();
        await this.sortNameZtoADropdownOption.click();
    }

    async sortPriceLowToHigh() {
        await this.sortingDropdown.click();
        await this.sortPriceLowToHighDropdownOption.click();
    }

    async sortPriceHighToLow() {
        await this.sortingDropdown.click();
        await this.sortPriceHighToLowDropdownOption.click();
    }

    async getItemNames() {
        const items = await this.inventoryItems;
        const itemNames = [];

        for (let item of items) {
            const itemText = await item.getText();
            //transform long text to just element short name
            const parts = itemText.split('\n');
            const itemShortName = parts[0]
            itemNames.push(itemShortName);
        }
        return itemNames;
    }

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

    async getItemPrices() {
        const items = await this.inventoryItems;
        const itemPrices = [];
        
        for (let item of items) {
            const itemText = await item.getText();
            //transform long text to just element short name
            const parts = itemText.split('\n');
            const itemPrice = parts[2]
            itemPrices.push(itemPrice);
        }

        // I am not sure how this code below works
        const itemPricesAsNumbers = itemPrices.map((price) => parseFloat(price.replace('$', '')));
        return itemPricesAsNumbers;

    }

    async addRandomItemsToCart() {
        const numOfInventoryItems = await this.inventoryItems.length; //6
        const numOfInventoryItemIds = numOfInventoryItems - 1; //5
        const numOfItemsToSelect = Math.floor(Math.random() * numOfInventoryItems) + 1;//e.g. 2

        //create an array or item ids from 0 to the last available item
        function createArray(numOfInventoryItemIds) {
            const result = [];
            for (let i = 0; i <= numOfInventoryItemIds; i++) {
              result.push(i);
            }
            return result;
          }

          const itemIdsArray = createArray(numOfInventoryItemIds);
          console.log(itemIdsArray);

          const randomItemIds = lodash.sampleSize(itemIdsArray, numOfItemsToSelect);

          const itemsNamePriceDescDetails = []

          for (const id of randomItemIds) {
            //add random items to cart
            await this.addItemToCartById(id);

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

            itemsNamePriceDescDetails.push(itemNamePriceDescDetails);
          }

        return itemsNamePriceDescDetails;
    }

}

module.exports = { InventoryPage };
