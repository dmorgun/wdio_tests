const { BaseSwagLabPage } = require("./BaseSwagLab.page");

class CheckOutStepTwo extends BaseSwagLabPage {
    url = '/checkout-step-two.html';

    get itemPrices() { return $$('.inventory_item_price')};

    get cartItems() { return $$('.cart_item'); }

    get totalPrice() { return $('div.summary_info_label.summary_total_label')}

    async getExpectedTotalPrice() {
        const items = await this.itemPrices;
        let expectedTotalPrice = 0;

        for (const item of items) {
            const itemText = await item.getText();
            // transform long text to just element short name
            const parts = itemText.split('$');
            const itemPrice = +parts[1];
            expectedTotalPrice = expectedTotalPrice + itemPrice;
        }
        return expectedTotalPrice;
    }

    async getTotalPrice() {
        const totalPrice = await this.totalPrice.getText();
        const parts = totalPrice.split('\n');
        const actualTotalPrice = parts[2];
        return actualTotalPrice;
    }
}

module.exports = { CheckOutStepTwo }