describe('Blog app', function() {
  beforeEach(function() {
    localStorage.removeItem('loggedBlogUser')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({ username: 'feuser', name: 'frontend user', password: 'testpassword' })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('feuser')
      cy.get('input:last').type('testpassword')
      cy.get('#login-btn').click()

      cy.contains('frontend user logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type('feuser')
      cy.get('input:last').type('wrongpassword')
      cy.get('#login-btn').click()
  
      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
  
      cy.get('html').should('not.contain', 'frontend user logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'feuser', password: 'testpassword' })
      cy.createBlog({  title: 'The title with the least likes', author: 'Challa', url: 'https://test-blog-url.com/' })
      cy.createBlog({  title: 'The title with the third most likes', author: 'Kebe', url: 'https://test-blog-url.com/' })
      cy.createBlog({  title: 'The title with the second most likes', author: 'Maria', url: 'https://test-blog-url.com/' })
      cy.createBlog({  title: 'The title with the most likes', author: 'Alan Bob', url: 'https://test-blog-url.com/' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('input#title').type('a blog created by cypress')
      cy.get('input#author').type('Frontend User')
      cy.get('input#url').type('http://test-cypress-url')
      cy.get('#create').click()
      cy.contains('a new blog a blog created by cypress by Frontend User added')

      cy.get('.blog')
        .should('contain', 'a blog created by cypress Frontend User')
        .should('contain', 'view')
        .and('have.css', 'border-style', 'solid')
    })

    it('users can like a blog', function() {
      cy.get('.blog').eq(0).contains('view').click()

      cy.get('#like-btn').click()
      cy.contains('likes 1')
    })

    it('users can delete thier own blog', function() {
      cy.get('.blog').eq(0).contains('view').click()

      cy.get('#delete-btn').click()
      cy.contains('Deleted blog The title with the least likes by Challa')
    })

    it('check blog lists are in sorting order', function() {
      cy.get('.blog').eq(1).contains('view').click()
      cy.get('.blog').eq(2).contains('view').click()
      cy.get('.blog').eq(3).contains('view').click()
      
      cy.get('.blog').eq(0)
        .should('contain', 'The title with the least likes') // Leave this with 0 likes 
      
      cy.get('.blog').eq(1)
        .should('contain', 'The title with the third most likes')
        .contains('like').click()
        .wait(700)
        
      cy.get('.blog').eq(2)
        .should('contain', 'The title with the second most likes')
        .contains('like').click()
        .wait(700)
        .contains('like').click()
        .wait(700)
      cy.get('.blog').eq(3)
        .should('contain', 'The title with the most likes')
        .contains('like').click()
        .wait(700)
        .contains('like').click()
        .wait(700)
        .contains('like').click()
        .wait(700)

      cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
      cy.get('.blog').eq(1).should('contain', 'The title with the second most likes') 
      cy.get('.blog').eq(2).should('contain', 'he title with the third most likes')
      cy.get('.blog').eq(3).should('contain', 'The title with the least likes Challa') 
    })
  })
})
