describe('Gallery View', () => {
    beforeEach(() => {
        // Navega a la página principal de la aplicación
        cy.visit('https://picbox-front.vercel.app'); // Asegúrate de que el dominio esté correcto
    });

    it('should log in and navigate to the gallery', () => {
        // Asegurarse de que el formulario de inicio de sesión esté visible
        cy.contains('Iniciar Sesión').should('be.visible');

        // Simulación del inicio de sesión
        cy.get('input#username').type('your_username');
        cy.get('input#password').type('your_password');
        cy.contains('Ingresar').click();

        cy.url().should('include', '/gallery');

        cy.contains('Galería de Imágenes').should('be.visible');

        cy.get('.gallery-container').within(() => {
            cy.get('.grid > a').should('have.length.at.least', 1); // Verifica que haya al menos una imagen
        });
    });
});
