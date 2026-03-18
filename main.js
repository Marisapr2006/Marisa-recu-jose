import Producto from "./modelos/Producto.js";

const producto1 = new Producto(1, "Laptop", "Laptop gaming de alta performance", 1299.99, 15, "https://ejemplo.com/laptop.jpg");
const producto2 = new Producto(2, "Mouse Inalámbrico", "Mouse ergonómico con batería de larga duración", 45.99, 50, "https://ejemplo.com/mouse.jpg");
const producto3 = new Producto(3, "Teclado Mecánico", "Teclado RGB con switches azules", 129.99, 30, "https://ejemplo.com/teclado.jpg");

const productos = [producto1, producto2, producto3];

function mostrarProductos(contenedor) {
    
}