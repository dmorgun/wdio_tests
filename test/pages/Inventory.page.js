const { BaseSwagLabPage } = require('./BaseSwagLab.page');

class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return $('.title'); }

    get inventoryItems() { return $$('.inventory_item'); }

    get addItemToCartBtns() { return $$('[id^="add-to-cart"]'); }

    // my selectors below
    //get inventoryItemNames () {return $$('.inventory_item_name');}
    //get inventoryItemPrices () {return $$('.inventory_item_price');}

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

}

module.exports = { InventoryPage };
