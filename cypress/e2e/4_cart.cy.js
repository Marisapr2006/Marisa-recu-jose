describe('Carrito de Compras', () => {
    beforeEach(() => {
        // Iniciamos sesión antes de ir al carrito
        cy.visit('login.html');
        cy.get('#correo').type('admin@email.com');
        cy.get('#contrasena').type('1234');
        cy.get('button[type="submit"]').click();
        
        // Vamos a la página del carrito
        cy.visit('carrito.html');
    });

    it('Debe cargar la página del carrito', () => {
        cy.url().should('include', 'carrito.html');
        cy.get('h2.page-title').contains('Tu Carrito');
    });

    // Se pueden añadir más pruebas aquí si el carrito implementa lógicas como eliminar, cambiar cantidad, etc.
});
