describe('Panel de Administración', () => {
    beforeEach(() => {
        // Iniciamos sesión antes de cada prueba
        cy.visit('login.html');
        cy.get('#correo').type('admin@email.com');
        cy.get('#contrasena').type('1234');
        cy.get('button[type="submit"]').click();
        
        // Esperamos a que index.html cargue y guarde los productos por defecto en localStorage
        cy.url().should('include', 'index.html');
        cy.get('.product-card').should('have.length.greaterThan', 0);
        
        // Vamos a la página de admin
        cy.visit('admin.html');
        
        // Esperamos a que la tabla se cargue (significa que el JS ya se ejecutó)
        cy.get('#cuerpoTabla tr').should('be.visible');
    });

    it('Debe mostrar la tabla de productos', () => {
        // Verificamos que la tabla exista
        cy.get('table').should('be.visible');
        // Verificamos que el cuerpo de la tabla se cargue
        cy.get('#cuerpoTabla tr').should('have.length.greaterThan', 0);
    });

    it('Debe añadir un nuevo producto correctamente', () => {
        const nombreProducto = 'Producto Test Cypress';
        const precioProducto = '19.99';

        // Hacemos clic en añadir producto
        cy.get('#btnAnadir').click();
        
        // Verificamos que se abre el modal
        cy.get('#modal').should('have.class', 'active');
        
        // Rellenamos el formulario
        cy.get('#inputNombre').type(nombreProducto);
        cy.get('#inputPrecio').type(precioProducto);
        
        // Guardamos
        cy.get('.btn-guardar').click();

        // Verificamos que se añadió a la tabla
        cy.get('#cuerpoTabla').contains('td', nombreProducto).should('be.visible');
    });

    it('Debe eliminar un producto', () => {
        // Buscamos el producto 'Laptop' (que viene por defecto) y lo eliminamos
        cy.contains('tr', 'Laptop').within(() => {
            cy.get('.btn-delete').click();
        });

        // Aceptamos la alerta de confirmación
        cy.on('window:confirm', () => true);

        // Verificamos que se haya eliminado de la tabla
        cy.get('#cuerpoTabla').should('not.contain', 'Laptop');
    });
});
