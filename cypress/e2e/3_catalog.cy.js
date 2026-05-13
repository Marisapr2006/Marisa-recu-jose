describe('Catálogo de Productos', () => {
    beforeEach(() => {
        // Iniciamos sesión antes de ir al catálogo
        cy.visit('login.html');
        cy.get('#correo').type('admin@email.com');
        cy.get('#contrasena').type('1234');
        cy.get('button[type="submit"]').click();
    });

    it('Debe mostrar la lista de productos', () => {
        // Al iniciar sesión somos redirigidos a index.html (catálogo)
        cy.url().should('include', 'index.html');
        // Esperamos a que los productos se carguen
        cy.get('.product-card').should('have.length.greaterThan', 0);
    });

    it('Debe filtrar productos usando la barra de búsqueda', () => {
        // Esperamos a que se cargue el catálogo primero
        cy.get('.product-card').should('have.length.greaterThan', 0);
        
        // El JS carga los event listeners de la barra de búsqueda de forma asíncrona
        // y toma un poco más de tiempo. Esperamos para asegurar que estén adjuntos.
        cy.wait(1500);

        // Buscamos un producto específico (suponiendo que hay un portátil)
        cy.get('.search-container input').type('Laptop');
        cy.get('.search-container button').click();

        // Verificamos que los resultados se actualicen y muestren solo 1 elemento
        cy.get('.product-card').should('have.length', 1);
        cy.get('.product-card').first().should('contain.text', 'Laptop');
    });

    it('Debe poder añadir un producto al carrito desde el catálogo', () => {
        // Esperamos a que se carguen los productos
        cy.get('.product-card').should('have.length.greaterThan', 0);
        
        // Seleccionamos el primer producto y le damos al botón de añadir
        cy.get('.product-card').first().find('.btn-add').click();
        
        // Verificamos que el badge del carrito se actualice 
        // (suponiendo que pasa de 0 a 1, o que es visible y tiene un número)
        cy.get('.cart-badge').invoke('text').then((text) => {
            const numeroProductos = parseInt(text);
            expect(numeroProductos).to.be.greaterThan(0);
        });
    });
});
