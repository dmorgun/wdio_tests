const lodash = require('lodash');

const { BaseSwagLabPage } = require('./BaseSwagLab.page');
// const { pages } = require('../pages/Pages');

const { Items } = require('./ShopItems.pageFragment');

class InventoryPage extends BaseSwagLabPage {

    items = new Items();

    url = '/inventory.html';

    get headerTitle() { return $('.title'); }

    get inventoryItems() { return $$('.inventory_item'); }

    get addItemToCartBtns() { return $$('[id^="add-to-cart"]'); }

    // my getters below
    get inventoryItemNames() { return $$('.inventory_item_name'); }

    get sortingDropdown() { return $('.product_sort_container'); }

    get sortNameAtoZDropdownOption() { return $('option[value="az"]'); }

    get sortNameZtoADropdownOption() { return $('option[value="za"]'); }

    get sortPriceLowToHighDropdownOption() { return $('option[value="lohi"]'); }

    get sortPriceHighToLowDropdownOption() { return $('option[value="hilo"]'); }

    async addItemToCartById(id) {
        await this.addItemToCartBtns[id].click();

    //     const itemNamePriceDescDetails = {};

    //     // save item Name
    //     // const itemName = await Items.getItemNameById(id);
    //     // itemNamePriceDescDetails.name = itemName;
    //     // save item Price
    //     // const itemPrice = await Items.getItemPriceById(id);
    //     // itemNamePriceDescDetails.price = itemPrice;
    //     // save item Desc
    //     // const itemDesc = await Items.getItemDescById(id);
    //     // itemNamePriceDescDetails.desc = itemDesc;

    //     // return itemNamePriceDescDetails;
    }

    // my methods below
    async sortNameAtoZ() {
        await this.sortingDropdown.click();
        // await $('.product_sort_container').click();
        await this.sortNameAtoZDropdownOption.click();
        // await $('option[value="az"]').click();
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



    async addRandomItemsToCart() {
        const numOfInventoryItems = await this.inventoryItems.length; // 6
        const numOfInventoryItemIds = numOfInventoryItems - 1; // 5
        // numOfItemsToSelect Prod
        const numOfItemsToSelect = Math.floor(Math.random() * numOfInventoryItems) + 1;//e.g. 2
        // numOfItemsToSelect Test
        // const numOfItemsToSelect = 2;

        // create an array or item ids from 0 to the last available item
        function createArray(numOfItemIds) {
            const result = [];
            for (let i = 0; i <= numOfItemIds; i += 1) {
                result.push(i);
            }
            return result;
        }

        const itemIdsArray = createArray(numOfInventoryItemIds);
        // randomItemIds Prod
        const randomItemIds = lodash.sampleSize(itemIdsArray, numOfItemsToSelect);
        // randomItemIds Test
        // const randomItemIds = [1,3];

        // test adding items one by one. Below works:
        // await $$('[id^="add-to-cart"]')[0].click();
        // await $$('[id^="add-to-cart"]')[0].click();
        // await $$('[id^="add-to-cart"]')[0].click();
        // await $$('[id^="add-to-cart"]')[0].click();
        // await $$('[id^="add-to-cart"]')[0].click();
        // await $$('[id^="add-to-cart"]')[0].click();

        // const addToCartBtns = await $$('[id^="add-to-cart"]');
        // const addToCartBtnIds = [];

        // for (const el of addToCartBtns) {
        //     const idName = await el.getAttribute('id');
        //     await el.click();
        //     addToCartBtnIds.push(idName);
        // }

        const itemsNamePriceDescDetails = [];

        await this.addItemToCartBtns.forEach(async (el, id) => {
            if (randomItemIds.includes(id)) {
                // save el info
                const itemName = await this.items.getItemNameById(id);
                const itemPrice = await this.items.getItemPriceById(id);
                const itemDesc = await this.items.getItemDescById(id);
                await el.click();
                //Promise.all?
                itemsNamePriceDescDetails.push(itemName, itemPrice, itemDesc);
            }
        })
        return itemsNamePriceDescDetails;

        // await $$('.btn.btn_primary.btn_small.btn_inventory')[0].click();
        // await $$('.btn.btn_primary.btn_small.btn_inventory')[1].click();
        // await $$('.btn.btn_primary.btn_small.btn_inventory')[2].click();
        // // Element could not be found here:
        // await $$('.btn.btn_primary.btn_small.btn_inventory')[3].click();
        // await $$('.btn.btn_primary.btn_small.btn_inventory')[4].click();
        // await $$('.btn.btn_primary.btn_small.btn_inventory')[5].click();

        // await $('#add-to-cart-sauce-labs-backpack').click();
        // await $('#add-to-cart-sauce-labs-bike-light').click();
        // await $('#add-to-cart-sauce-labs-bolt-t-shirt').click();
        // await $('#add-to-cart-sauce-labs-fleece-jacket').click();
        // await $('#add-to-cart-sauce-labs-onesie').click();
        // await $('#add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)').click();
        
        // for (const id of randomItemIds) {
        //     // add random items to cart
        //     const itemNamePriceDescDetails = this.addItemToCartById(id);
        //     itemsNamePriceDescDetails.push(itemNamePriceDescDetails);
        // }

        // return Promise.all(itemsNamePriceDescDetails);
    }
}

module.exports = { InventoryPage };
