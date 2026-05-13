describe('Autenticación', () => {
    beforeEach(() => {
        // Asumiendo que tenemos un servidor local corriendo
        cy.visit('login.html');
    });

    it('Debe mostrar un error con credenciales incorrectas', () => {
        cy.get('#correo').type('usuario_falso@email.com');
        cy.get('#contrasena').type('contrasenaincorrecta');
        
        // Interceptamos la alerta del navegador
        const stub = cy.stub();
        cy.on('window:alert', stub);

        cy.get('button[type="submit"]').click().then(() => {
            // Verificamos que se llamó a la alerta con el mensaje de error
            expect(stub.getCall(0)).to.be.calledWith('Error al iniciar sesión');
        });
    });

    it('Debe iniciar sesión correctamente con credenciales válidas', () => {
        cy.get('#correo').type('admin@email.com');
        cy.get('#contrasena').type('1234');
        cy.get('button[type="submit"]').click();
        
        // Verificamos que nos redirige al index.html
        cy.url().should('include', 'index.html');
    });
});
