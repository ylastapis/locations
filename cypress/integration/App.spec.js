describe('App.js', function () {
  it('.should() - assert that <title> is correct', function () {
    cy.visit('http://localhost:3000/')
    cy.get('#root .App h1.App-title').should('contain', 'Welcome to React')
  });
});
