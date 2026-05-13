import Usuario from "../modelos/Usuario.js";

const admin = new Usuario(1, "Admin", "admin@email.com", "1234");

const CLAVE_USUARIO = "usuarioActual";

function login(correo, contrasena) {
    if (correo === admin.correo && contrasena === admin.contrasena) {
        const usuarioActual = JSON.stringify(admin);

        localStorage.setItem(CLAVE_USUARIO, usuarioActual);

        return true;
    }

    return false;
}

function logout() {
    localStorage.removeItem(CLAVE_USUARIO);
}

function estaAutenticado() {
    const usuarioActual = JSON.parse(localStorage.getItem(CLAVE_USUARIO));

    if (!usuarioActual) {
        return false;
    }

    return true;
}

function obtenerUsuario() {
    return JSON.parse(localStorage.getItem(CLAVE_USUARIO));
}

export { login, logout, estaAutenticado, obtenerUsuario }