describe('Checkout Process', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should submit the form with valid data', () => {
        cy.get('input[name="customer.firstName"]').type('Lucas')
        cy.get('input[name="customer.lastName"]').type('Debeterco')
        cy.get('input[value="cpf"]').check()
        cy.get('input[name="customer.document.number"]').type('091.011.649-02')
        cy.get('input[name="customer.address.city"]').type('Rio do Sul')
        cy.get('input[name="customer.address.street"]').type('Rua João Cavilha')
        cy.get('input[name="customer.address.number"]').type('110')
        cy.get('input[name="customer.address.country"]').type('Brazil')
        cy.get('input[name="customer.address.state"]').type('SC')
        cy.get('input[name="customer.address.neighborhood"]').type('Taboão')

        cy.get('input[name="paymentMethod.card.number"]').type('5162204687040007')
        cy.get('input[name="paymentMethod.card.holderName"]').type('Lucas Debeterco')
        cy.get('input[name="paymentMethod.card.cvv"]').type('123')
        cy.get('input[name="paymentMethod.card.expirationDate"]').type('12/2025')

        cy.get('button[type="submit"]').click()

        cy.get('.Toastify__toast--success').should('be.visible')
    })

    it('should display error messages for invalid data', () => {
        cy.get('button[type="submit"]').click()

        cy.get('p[data-error="customer.firstName"]').should('be.visible')
        cy.get('p[data-error="customer.lastName"]').should('be.visible')
        cy.get('p[data-error="customer.document.number"]').should('be.visible')
        cy.get('p[data-error="customer.address.city"]').should('be.visible')
        cy.get('p[data-error="customer.address.street"]').should('be.visible')
        cy.get('p[data-error="customer.address.number"]').should('be.visible')
        cy.get('p[data-error="customer.address.country"]').should('be.visible')
        cy.get('p[data-error="customer.address.state"]').should('be.visible')
        cy.get('p[data-error="customer.address.neighborhood"]').should('be.visible')
        cy.get('p[data-error="paymentMethod.card.number"]').should('be.visible')
        cy.get('p[data-error="paymentMethod.card.holderName"]').should('be.visible')
        cy.get('p[data-error="paymentMethod.card.cvv"]').should('be.visible')
        cy.get('p[data-error="paymentMethod.card.expirationDate"]').should('be.visible')

        cy.get('input[name="paymentMethod.card.number"]').type('1234567891011121')
        cy.get('button[type="submit"]').click()
        cy.get('p[data-error="paymentMethod.card.number"]').should('be.visible')
    })
})