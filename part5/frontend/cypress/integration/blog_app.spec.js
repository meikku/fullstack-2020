describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
          name: 'mirja',
          username: 'Mirja',
          password: 'salainen'
      }
      const blog ={
          title: 'Bye bye 2020',
          author: 'Helena',
          url: 'http://come2021.com'
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
      
      cy.get('.notification')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(0, 0, 255)')
      .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'mirja is logged in')
    })
  })
  describe.only('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('Mirja')
        cy.get('#password').type('salainen')
        cy.get('#login').click()
        cy.contains('create new').click()
        cy.get('#title').type('Bye bye 2020')
        cy.get('#author').type('Helena')
        cy.get('#url').type('https://welcome2021.com')
        cy.get('#create').click()
      })

      it('A new blog can be created', function() {
          cy.contains('Bye bye 2020 by Helena was added')
          cy.contains('Bye bye 2020 Helena')
      })

      it('user can like a blog', function() {
          cy.contains('view')
            .click()
          cy.contains('like')
            .click()
          cy.contains('Bye bye 2020')
          cy.get('#like').contains('1')
          cy.get('#like').should('not.contain', '0')
      })
      it('user can delete blog', function() {
          cy.get('#view')
          .click()
          cy.get('#remove')
          .click()
          cy.get('.notification')
          .should('contain', 'Remove blog Bye bye 2020')
      })
  })
})
