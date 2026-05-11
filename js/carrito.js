import { obtenerProductos } from "./catalogo.js";

function simularPeticion(datos, delay = 400) {
    return new Promise((resolve) => setTimeout(() => resolve(datos), delay));
}

async function obtenerCarrito() {
    const datos = JSON.parse(localStorage.getItem('carrito')) || [];
    return await simularPeticion(datos);
}

async function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    return await simularPeticion(true);
}

async function anadirProducto(producto_id) {
    const productos = await obtenerProductos();
    const productoAnadido = productos.find(p => Number(p.id) === Number(producto_id));

    if (productoAnadido) {
        const carrito = await obtenerCarrito();
        carrito.push(productoAnadido);
        await guardarCarrito(carrito);
        return true;
    }

    return false;
}

async function actualizarBadge() {
    const carrito = await obtenerCarrito();
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.textContent = carrito.length;
    }
}

async function anadirAlCarrito(e) {
    const boton = e.target.closest('.btn-add');
    if (!boton) return;

    const exito = await anadirProducto(boton.id);

    if (exito) {
        console.log('Producto añadido correctamente al carrito');
        await actualizarBadge();
    } else {
        console.error('No se encontró un producto con el ID:', boton.id);
    }
}

async function mostrarCarrito(contenedor) {
    const carrito = await obtenerCarrito();

    contenedor.innerHTML = '';

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p style="padding:1rem;color:#7f8c8d;">Tu carrito está vacío.</p>';
        return false;
    }

    let resultado = '';

    carrito.forEach((producto, index) => {
        let productoTarjeta = `
            <div class="cart-item">
                <div class="item-image"><i class="fas fa-laptop"></i></div>
                <div class="item-details">
                    <h3 class="item-title">${producto.nombre}</h3>
                    <p class="item-price">Precio unitario: ${producto.precio} €</p>
                </div>
                <div class="item-controls">
                    <div class="item-total">${producto.precio} €</div>
                    <button class="btn-remove" data-index="${index}" title="Eliminar producto"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        `;
        resultado += productoTarjeta;
    });

    contenedor.innerHTML = resultado;
}

async function eliminarProducto(index) {
    const carrito = await obtenerCarrito();
    carrito.splice(index, 1);
    await guardarCarrito(carrito);
}

async function actualizarResumen() {
    const carrito = await obtenerCarrito();
    const total = carrito.reduce((acc, p) => acc + Number(p.precio), 0);

    const contadorEl = document.getElementById('resumen-cantidad');
    const subtotalEl = document.getElementById('resumen-subtotal');
    const totalEl = document.getElementById('resumen-total');

    if (contadorEl) contadorEl.textContent = carrito.length;
    if (subtotalEl) subtotalEl.textContent = total.toFixed(2) + ' €';
    if (totalEl) totalEl.textContent = total.toFixed(2) + ' €';
}

async function vaciarCarrito() {
    await guardarCarrito([]);
}

export { anadirProducto, anadirAlCarrito, obtenerCarrito, actualizarBadge, mostrarCarrito, eliminarProducto, actualizarResumen, vaciarCarrito }
