const { BaseSwagLabPage } = require("./BaseSwagLab.page");

class CheckOutStepTwo extends BaseSwagLabPage {
    url = '/checkout-step-two.html';

    get itemPrices() { return $$('.inventory_item_price')};

    get cartItems() { return $$('.cart_item'); }

    get totalPrice() { return $('div.summary_info_label.summary_total_label'); }

    get tax() { return $('div.summary_tax_label'); }


    async getExpectedTotalPrice() {
        const items = await this.itemPrices;
        let expectedTotalPrice = 0;
        const taxText = await this.tax.getText();
        const taxParts = taxText.split('$');
        const tax = +taxParts[1];
        for (const item of items) {
            const itemText = await item.getText();
            // transform long text to just element short name
            const parts = itemText.split('$');
            const itemPrice = +parts[1];
            expectedTotalPrice = expectedTotalPrice + itemPrice;
        }
        expectedTotalPrice = expectedTotalPrice + tax;
        return expectedTotalPrice;
    }

    async getTotalPrice() {
        const totalPrice = await this.totalPrice.getText();
        const parts = totalPrice.split('$');
        const actualTotalPrice = +parts[1];
        return actualTotalPrice;
    }
}

module.exports = { CheckOutStepTwo }