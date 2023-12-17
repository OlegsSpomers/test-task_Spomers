const homePage = require('../support/step_definitions/pages/homePage')
const cartPage = require('../support/step_definitions/pages/cart')

function getUserName() {
    const timeStamp = Math.floor(Math.random() * 10000);
    return 'NewUserName' + timeStamp;
}

function getOrderName() {
    const timeStamp = Date.now()
    return 'OrderName' + timeStamp;
}

describe('template spec', () => {

    const username = getUserName()
    const ordername = getOrderName()

    it('User Sign Up and Log In', () => {
        homePage.open()
        homePage.clickOnSignUp()
        homePage.sendSignUpForm(username)
        homePage.clickOnLogin()
        homePage.sendLoginForm(username)
    })

    it('Place Order on Cart page', () => {
        homePage.open()
        cartPage.openCartPage()
        cartPage.sendnewOrderForm(ordername)
        cartPage.checkPurchasedOrderDetails()
    })

    it('Check categories', () => {
        homePage.open()
        homePage.openCategoryPhones()
        homePage.openCaterogyLaptops()
        homePage.openCaterogyMonitors()
    })

});