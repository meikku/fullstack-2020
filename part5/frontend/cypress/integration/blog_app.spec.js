describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
          name: 'mirja',
          username: 'Mirja',
          password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('login').click()
    })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
       cy.contains('login').click()
       cy.get('#username').type('Mirja')
       cy.get('#password').type('salainen')
       cy.get('#login').click()
       cy.contains('mirja is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('Mikko')
      cy.get('#password').type('julkinen')
      cy.get('#login').click()
      cy.contains('Wrong credentials')
    })
  })
})
