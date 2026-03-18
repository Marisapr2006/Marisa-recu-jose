import Usuario from "./modelos/Usuario.js";

const admin = new Usuario(1, "Marisa", "marisa@email.com", "1234");

const CLAVE_AUTENT = "estaAutenticado";
const CLAVE_USUARIO = "usuarioActual";

function login(correo, contrasena) {
    if (correo === admin.correo && contrasena === admin.contrasena) {
        localStorage.setItem(CLAVE_AUTENT, "true");
        localStorage.setItem(CLAVE_USUARIO, correo);

        return true;
    }

    return false;
}

export {
    login
}