describe('Autenticación y flujo de usuario', () => {
  let newUser;

  // Crear un usuario nuevo antes de las pruebas
  before(() => {
    newUser = {
      username: `testuser2_${Date.now()}`, // Nombre de usuario único
      email: `test2${Date.now()}@example.com`, // Email único
      password: 'password123',
    };
  });

  it('Debe registrar un nuevo usuario', () => {
    // Visitar la página de registro
    cy.visit('https://picbox-front.vercel.app/register');

    // Llenar el formulario de registro
    cy.get('#username').type(newUser.username);
    cy.get('#email').type(newUser.email);
    cy.get('#password').type(newUser.password);
    cy.get('#confirm-password').type(newUser.password);

    // Cambiar el selector a uno que apunte al componente ButtonA
    cy.contains('Regístrate').click(); // Si el botón tiene el texto "Regístrate"

    // Verificar que el registro fue exitoso
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Usuario creado exitosamente');
    });
    cy.url().should('include', '/');
  });
  it('Debe iniciar sesión con usuario creado', () => {
    cy.visit('https://picbox-front.vercel.app/');
    // Llenar el formulario de login
    cy.get('#username').type(newUser.email);
    cy.get('#password').type(newUser.password);
    //esperar 1 segundo
    cy.wait(2000);

    // Verificar la redirección
    cy.url().should('include', '/gallery');

    // Verificar que el nombre del usuario esté presente en la página
    cy.contains(newUser.username).should('exist');
  });

  it('Debe iniciar sesión con usuario existente', () => {
    cy.visit('https://picbox-front.vercel.app/');


    // Llenar el formulario de login
    cy.get('#username').type('test2@front.com');
    cy.get('#password').type('123456');

    // Verificar la redirección
    cy.url().should('include', '/gallery');

    // Verificar que el nombre del usuario esté presente en la página
    cy.contains('test2 front').should('exist');
  });

  it('Debe cerrar sesión correctamente', () => {
    cy.visit('https://picbox-front.vercel.app/');
    // Llenar el formulario de login
    cy.get('#username').type(newUser.email);
    cy.get('#password').type(newUser.password);
    //esperar 1 segundo
    cy.wait(2000);


    // Verificar la redirección
    cy.url().should('include', '/gallery');

    // Hacer clic en el botón de logout
    cy.contains('Logout').click();

    // Verificar que la página vuelve al estado de login
    cy.url().should('include', '/');
    cy.contains('Iniciar Sesión').should('exist'); // Verifica que el formulario de login está visible
  });
});