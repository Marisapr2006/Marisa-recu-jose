import Producto from "../modelos/Producto.js";

const producto1 = new Producto(1, "Laptop", 1299.99, "https://ejemplo.com/laptop.jpg");
const producto2 = new Producto(2, "Mouse Inalámbrico", 45.99, "https://ejemplo.com/mouse.jpg");
const producto3 = new Producto(3, "Teclado Mecánico", 129.99, "https://ejemplo.com/teclado.jpg");

const productos = [producto1, producto2, producto3];

function cargarProductos(productos) {
    if (productos && productos.length > 0) {
        localStorage.setItem('productos', JSON.stringify(productos));
        return true;
    }

    return false;
}

function obtenerProductos() {
    return JSON.parse(localStorage.getItem('productos'));
}

function mostrarProductos(contenedor) {
    const productos = obtenerProductos();

    contenedor.innerHTML = '';

    if (!productos) {
        return false;
    } else {
        let resultado = '';

        productos.forEach(producto => {
            let productoTarjeta = `
                <div class="product-card">
                    <div class="product-image"></div>
                    <div class="product-info">
                        <h3>${producto.nombre}</h3>
                        <p class="product-price">${producto.precio} €</p>
                        <button class="btn-add">Añadir al Carrito</ button>
                    </div>
                </div>
            `;
            resultado += productoTarjeta;
        });

        contenedor.innerHTML = resultado;
    }
}

function recargarProductos(productosBuscados, contenedor) {

    contenedor.innerHTML = '';

    if (!productosBuscados) {
        return false;
    } else {
        let resultado = '';

        productosBuscados.forEach(producto => {
            let productoTarjeta = `
                <div class="product-card">
                    <div class="product-image"></div>
                    <div class="product-info">
                        <h3>${producto.nombre}</h3>
                        <p class="product-price">${producto.precio} €</p>
                        <button class="btn-add">Añadir al Carrito</ button>
                    </div>
                </div>
            `;
            resultado += productoTarjeta;
        });

        contenedor.innerHTML = resultado;
    }
}

export { productos, cargarProductos, mostrarProductos, recargarProductos }