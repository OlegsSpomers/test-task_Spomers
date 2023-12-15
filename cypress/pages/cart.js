class cartPage {
    elements = {
        header: {
            cartPage: () => cy.get('#cartur')
        },
        newOrderForm: {
            placeOrder: () => cy.get('.col-lg-1').contains('button', 'Place Order'),
            fillName: () => cy.get('#name'),
            fillCountry: () => cy.get('#country'),
            fillCity: () => cy.get('#city'),
            fillCreditCard: () => cy.get('#card'),
            fillMonth: () => cy.get('#month'),
            fillYear: () => cy.get('#year'),
            purchaseButton: () => cy.get('.modal-footer').contains('button', 'Purchase'),
            closeButton: () => cy.get('.modal-footer').contains('button', 'Close')
        },
        purchasedOrder: {
            succesModal: () => cy.get('.sweet-alert', { timeout: 1000 }),
            okButton: () => this.elements.purchasedOrder.succesModal().find('button')
        }
    }

    testData = {
        cardNumber: '4221 3213 3123 3121',
    }

    openCartPage() {
        this.elements.header.cartPage().click()
    }
    sendnewOrderForm(ordername) {
        this.elements.newOrderForm.placeOrder().click()
        this.elements.newOrderForm.fillName().type(ordername)
        this.elements.newOrderForm.fillCountry().type('Czechia')
        this.elements.newOrderForm.fillCity().type('Praha')
        this.elements.newOrderForm.fillCreditCard().type(this.testData.cardNumber)
        this.elements.newOrderForm.fillMonth().type('December')
        this.elements.newOrderForm.fillYear().type('2023')
        this.elements.newOrderForm.purchaseButton().click()
    }

    checkPurchasedOrderDetails() {
        this.elements.purchasedOrder.succesModal().should('contain', this.testData.cardNumber)
    }

}



module.exports = new cartPage();