class homePage {
  elements = {
    signUp: {
      signUpButton: () => cy.get('#signin2'),
      signUpUserNameField: (timeout) => cy.get('#sign-username', { timeout }),
      signUpPasswordField: (timeout) => cy.get('#sign-password', { timeout }),
      signUpSubmitButton: () => cy.get('.modal-footer').contains('button', 'Sign up')
    },

    logIn: {
      loginButton: () => cy.get('#login2'),
      loginUserNameField: (timeout) => cy.get('#loginusername', { timeout }),
      loginUserPasswordField: (timeout) => cy.get('#loginpassword', { timeout }),
      loginSubmitButton: () => cy.get('.modal-footer').contains('button', 'Log in'),
      loggedInUser: () => cy.get('#nameofuser')
    },

    filterPhoneCaterogy: {
      buttonPhones: () => cy.get('.list-group .list-group-item:nth-of-type(2)'),
      firstDeviceInTheList: () => cy.get('div#tbodyid > div:nth-of-type(1) .hrefch'),
      openedFirstDevice: () => cy.get('#tbodyid')
    },

    filterLaptopsCategory: {
      buttonLaptops: () => cy.get('.list-group > a:nth-of-type(3)'),
    },

    filterMonitorsCategory: {
      buttonMonitors: () => cy.get('.list-group > a:nth-of-type(4)'),
    },

    navigationBar: {
      buttonProductStore: () => cy.get('#nava')
    }
  }
  userPassword = 'PasswordVeryStrong123'
  URL = 'https://www.demoblaze.com/'

  open() {
    cy.visit(this.URL);
  }

  clickOnSignUp() {
    this.elements.signUp.signUpButton().click()
  }
  sendSignUpForm(username) {
    this.elements.signUp.signUpUserNameField(1000).type(username)
    this.elements.signUp.signUpPasswordField(500).type(this.userPassword)

    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.intercept('POST', '/signup').as('post-sign-up')
    this.elements.signUp.signUpSubmitButton().click().then(() => {
      cy.wait('@post-sign-up').its('response.statusCode').should('eq', 200).then(() => {
        cy.wait(1000).then(() => {
          expect(stub).to.have.been.calledOnceWith('Sign up successful.');
        })
      })
    })
  }

  clickOnLogin() {
    this.elements.logIn.loginButton().click()
  }
  sendLoginForm(username) {
    this.elements.logIn.loginUserNameField(1000).type(username)
    this.elements.logIn.loginUserPasswordField(500).type(this.userPassword)
    this.elements.logIn.loginSubmitButton().click()
    this.elements.logIn.loggedInUser().should('contain', `Welcome ${username}`)
  }

  openCategoryPhones() {
    this.elements.filterPhoneCaterogy.buttonPhones().click()
    this.elements.filterPhoneCaterogy.firstDeviceInTheList().click()
    this.elements.filterPhoneCaterogy.openedFirstDevice().should('contain', 'Samsung galaxy s6')
    this.elements.navigationBar.buttonProductStore().click()
  }

  openCaterogyLaptops() {
    this.elements.filterLaptopsCategory.buttonLaptops().click()
    this.elements.filterPhoneCaterogy.firstDeviceInTheList().click()
    this.elements.filterPhoneCaterogy.openedFirstDevice().should('contain', 'Sony vaio i5')
    this.elements.navigationBar.buttonProductStore().click()
  }

  openCaterogyMonitors() {
    this.elements.filterMonitorsCategory.buttonMonitors().click()
    this.elements.filterPhoneCaterogy.firstDeviceInTheList().click()
    this.elements.filterPhoneCaterogy.openedFirstDevice().should('contain', 'Apple monitor 24')
  }
}

module.exports = new homePage();
