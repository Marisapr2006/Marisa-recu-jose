import Producto from "../modelos/Producto.js";

const producto1 = new Producto(1, "Laptop", 1299.99, "https://ejemplo.com/laptop.jpg");
const producto2 = new Producto(2, "Mouse Inalámbrico", 45.99, "https://ejemplo.com/mouse.jpg");
const producto3 = new Producto(3, "Teclado Mecánico", 129.99, "https://ejemplo.com/teclado.jpg");

const productos = [producto1, producto2, producto3];

function simularPeticion(datos, delay = 400) {
    return new Promise((resolve) => setTimeout(() => resolve(datos), delay));
}

async function cargarProductos(productos) {
    if (productos && productos.length > 0) {
        localStorage.setItem('productos', JSON.stringify(productos));
        return await simularPeticion(true);
    }
    return await simularPeticion(false);
}

async function obtenerProductos() {
    const datos = JSON.parse(localStorage.getItem('productos'));
    return await simularPeticion(datos);
}

async function mostrarProductos(contenedor) {
    const productos = await obtenerProductos();

    contenedor.innerHTML = '';

    if (!productos) {
        return false;
    }

    let resultado = '';

    productos.forEach(producto => {
        let productoTarjeta = `
            <div class="product-card">
                <div class="product-image"></div>
                <div class="product-info">
                    <h3>${producto.nombre}</h3>
                    <p class="product-price">${producto.precio} €</p>
                    <button class="btn-add" id="${producto.id}">Añadir al Carrito</button>
                </div>
            </div>
        `;
        resultado += productoTarjeta;
    });

    contenedor.innerHTML = resultado;
}

function recargarProductos(productosBuscados, contenedor) {
    contenedor.innerHTML = '';

    if (!productosBuscados) {
        return false;
    }

    let resultado = '';

    productosBuscados.forEach(producto => {
        let productoTarjeta = `
            <div class="product-card">
                <div class="product-image"></div>
                <div class="product-info">
                    <h3>${producto.nombre}</h3>
                    <p class="product-price">${producto.precio} €</p>
                    <button type='submit' class="btn-add" id=${producto.id}>Añadir al Carrito</button>
                </div>
            </div>
        `;
        resultado += productoTarjeta;
    });

    contenedor.innerHTML = resultado;
}

export { productos, cargarProductos, mostrarProductos, recargarProductos, obtenerProductos }
