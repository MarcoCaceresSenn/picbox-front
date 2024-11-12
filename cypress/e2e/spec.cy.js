describe('APP', () => {
  beforeEach(() => {
    cy.visit('picbox-front.vercel.app');
    cy.contains('Iniciar Sesión').should('be.visible');
  });

  it('should have a title', () => {
    cy.title().should('eq', 'picbox-front');
  });
});
