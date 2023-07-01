class Items {
    // my selectors below
    // get inventoryItemNames() { return $$('.inventory_item_name'); }

    get inventoryItemPrices() { return $$('.inventory_item_price'); }

    get inventoryItemDescs() { return $$('.inventory_item_desc'); }


    async getItemNames() {
        const items = await this.inventoryItems;
        const itemNames = [];

        for (const item of items) {
            const itemText = await item.getText();
            // transform long text to just element short name
            const parts = itemText.split('\n');
            const itemShortName = parts[0];
            itemNames.push(itemShortName);
        }
        return itemNames;
    }

    async getItemPrices() {
        const items = await this.inventoryItems;
        const itemPrices = [];

        for (const item of items) {
            const itemText = await item.getText();
            // transform long text to just element short name
            const parts = itemText.split('\n');
            const itemPrice = parts[2];
            itemPrices.push(itemPrice);
        }

        // I am not sure how this code below works
        const itemPricesAsNumbers = itemPrices.map((price) => parseFloat(price.replace('$', '')));
        return itemPricesAsNumbers;
    }



    async getItemPriceById(id) {
        const itemPriceById = await this.inventoryItemPrices[id].getText();
        return itemPriceById;
    }

    async getItemDescById(id) {
        const itemDescById = await this.inventoryItemDescs[id].getText();
        return itemDescById;
    }

}

module.exports = { Items };