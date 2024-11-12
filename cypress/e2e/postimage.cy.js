describe('Upload Image', () => {
    beforeEach(() => {
        // Navegar a la vista de subida de imagen
        cy.visit('https://picbox-front.vercel.app');;
    });

    it('should log in and navigate to the gallery and after to post image', () => {
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

        // Navegar a la vista de subida de imagen
        cy.get('button').contains('Crear Imagen').click();

        cy.url().should('include', '/upload-image');

        cy.get('input#title').type('Mi imagen de prueba');

        // Cargar un archivo de imagen (asegúrate de tener un archivo en la carpeta de fixtures)
        cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.jpg', { force: true });

        // Rellena los tags
        cy.get('input#tags').type('tag1, tag2, tag3');

        // Interceptar la solicitud de subida
        cy.intercept('POST', 'http://localhost:3000/images', {
            statusCode: 201,
            body: { message: 'Imagen subida con éxito' },
        }).as('uploadImage');

        // Enviar el formulario
        cy.get('button[type="submit"]').click();

        // Espera la respuesta del servidor
        cy.wait('@uploadImage').then((interception) => {
            expect(interception.response.statusCode).to.eq(201);
        });

        // Verifica la redirección a la galería
        cy.url().should('include', '/gallery');
    });
});
