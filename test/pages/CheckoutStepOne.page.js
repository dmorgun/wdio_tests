const { BaseSwagLabPage } = require("./BaseSwagLab.page");

class CheckOutStepOne extends BaseSwagLabPage {
    url = '/checkout-step-one.html';

    get name() { return $('#first-name'); }

    get surname() { return $('#last-name'); }

    get zip() { return $('#postal-code');}

    async fillForm(name, surname, zip) {
        await this.name.setValue(name);
        await this.surname.setValue(surname);
        await this.zip.setValue(zip);
    }
}

module.exports = { CheckOutStepOne }