
/**
 * Archivo de sesión.
 * Controla login, registro, cierre de sesión y la vista de datos del usuario.
 */
// Línea 23: Declara una variable que se usará en esta parte del script.
let usuarioActual = null;

/** Pregunta al PHP si hay un usuario conectado ahora mismo. */
async function comprobarSesion() {
    const data = await Peticiones.obtener('api/sesion.php?action=session');
    usuarioActual = data.user || null;
    return usuarioActual;
}

/** Según el rol del usuario, devuelve a qué panel debe entrar. */
// Línea 33: Declara una función para reutilizar esta acción cuando haga falta.
function rutaSesion() {
    // Línea 34: Comprueba una condición antes de continuar.
    if (!usuarioActual) {
        // Línea 35: Termina la función y devuelve el resultado correspondiente.
        return '#login';
    // Línea 36: Cierra el bloque de código anterior.
    }

    // Línea 38: Comprueba una condición antes de continuar.
    if (usuarioActual.rol === 'cliente') {
        // Línea 39: Termina la función y devuelve el resultado correspondiente.
        return '#sesionCliente';
    // Línea 40: Cierra el bloque de código anterior.
    }

    // Línea 42: Comprueba una condición antes de continuar.
    if (usuarioActual.rol === 'jefe') {
        // Línea 43: Termina la función y devuelve el resultado correspondiente.
        return '#sesionJefe';
    // Línea 44: Cierra el bloque de código anterior.
    }

    // Línea 46: Termina la función y devuelve el resultado correspondiente.
    return '#sesionEmpleado';
// Línea 47: Cierra el bloque de código anterior.
}

/** Revisa si el usuario tiene permiso para entrar a una pantalla privada. */
async function pedirRol(roles) {
    await comprobarSesion();

    if (!usuarioActual || !roles.includes(usuarioActual.rol)) {
        location.hash = 'login';
        return false;
    }

    return true;
}

/** Activa los formularios de login, registro y botones de cerrar sesión. */
// Línea 62: Declara una función asíncrona porque dentro se hacen peticiones al servidor.
async function prepararFormulariosSesion() {
    // Línea 63: Declara una variable que se usará en esta parte del script.
    const loginForm = document.getElementById('formLogin');
    // Línea 64: Declara una variable que se usará en esta parte del script.
    const registerForm = document.getElementById('formRegistro');
    // Línea 65: Declara una variable que se usará en esta parte del script.
    const registerClientByBossForm = document.getElementById('formRegistroClienteJefe');
    // Línea 66: Declara una variable que se usará en esta parte del script.
    const userDataContainer = document.getElementById('datosUsuario');

    // Línea 68: Comprueba una condición antes de continuar.
    if (loginForm) {
        // Evento: escucha una acción del usuario y ejecuta la función correspondiente.
        // Línea 70: Asocia un evento del usuario, por ejemplo un click o el envío de un formulario.
        loginForm.addEventListener('submit', async (event) => {
            // Línea 71: Evita que el formulario recargue la página al enviarse.
            event.preventDefault();
            // Línea 72: Declara una variable que se usará en esta parte del script.
            const message = document.getElementById('msgLogin');
            // Línea 73: Declara una variable que se usará en esta parte del script.
            const data = await Peticiones.enviar('api/sesion.php?action=login', Object.fromEntries(new FormData(loginForm)));

            // Línea 75: Línea de código necesaria para completar la acción de esta parte.
            mostrarMensaje(message, data.message, data.ok);

            // Línea 77: Comprueba una condición antes de continuar.
            if (data.ok) {
                // Línea 78: Línea de código necesaria para completar la acción de esta parte.
                usuarioActual = data.user;
                // Línea 79: Línea de código necesaria para completar la acción de esta parte.
                location.hash = rutaSesion().substring(1);
            // Línea 80: Cierra el bloque de código anterior.
            }
        // Línea 81: Cierra el bloque de código anterior.
        });
    // Línea 82: Cierra el bloque de código anterior.
    }

    // Línea 84: Comprueba una condición antes de continuar.
    if (registerForm) {
        // Evento: escucha una acción del usuario y ejecuta la función correspondiente.
        // Línea 86: Asocia un evento del usuario, por ejemplo un click o el envío de un formulario.
        registerForm.addEventListener('submit', async (event) => {
            // Línea 87: Evita que el formulario recargue la página al enviarse.
            event.preventDefault();
            // Línea 88: Declara una variable que se usará en esta parte del script.
            const message = document.getElementById('msgRegistro');
            // Línea 89: Declara una variable que se usará en esta parte del script.
            const data = await Peticiones.enviar('api/sesion.php?action=registerCliente', Object.fromEntries(new FormData(registerForm)));

            // Línea 91: Línea de código necesaria para completar la acción de esta parte.
            mostrarMensaje(message, data.message, data.ok);

            // Línea 93: Comprueba una condición antes de continuar.
            if (data.ok) {
                // Línea 94: Línea de código necesaria para completar la acción de esta parte.
                registerForm.reset();
                // Línea 95: Línea de código necesaria para completar la acción de esta parte.
                location.hash = 'login';
            // Línea 96: Cierra el bloque de código anterior.
            }
        // Línea 97: Cierra el bloque de código anterior.
        });
    // Línea 98: Cierra el bloque de código anterior.
    }

    // Línea 100: Comprueba una condición antes de continuar.
    if (registerClientByBossForm) {
        // Evento: escucha una acción del usuario y ejecuta la función correspondiente.
        // Línea 102: Asocia un evento del usuario, por ejemplo un click o el envío de un formulario.
        registerClientByBossForm.addEventListener('submit', async (event) => {
            // Línea 103: Evita que el formulario recargue la página al enviarse.
            event.preventDefault();
            // Línea 104: Declara una variable que se usará en esta parte del script.
            const message = document.getElementById('msgRegistroClienteJefe');
            // Línea 105: Declara una variable que se usará en esta parte del script.
            const data = await Peticiones.enviar('api/sesion.php?action=registerClienteJefe', Object.fromEntries(new FormData(registerClientByBossForm)));

            // Línea 107: Línea de código necesaria para completar la acción de esta parte.
            mostrarMensaje(message, data.message, data.ok);

            // Línea 109: Comprueba una condición antes de continuar.
            if (data.ok) {
                // Línea 110: Línea de código necesaria para completar la acción de esta parte.
                registerClientByBossForm.reset();
            // Línea 111: Cierra el bloque de código anterior.
            }
        // Línea 112: Cierra el bloque de código anterior.
        });
    // Línea 113: Cierra el bloque de código anterior.
    }

    // Línea 115: Recorre una lista de elementos para trabajar con cada uno.
    document.querySelectorAll('[data-logout]').forEach((button) => {
        // Evento: escucha una acción del usuario y ejecuta la función correspondiente.
        // Línea 117: Asocia un evento del usuario, por ejemplo un click o el envío de un formulario.
        button.addEventListener('click', async () => {
            // Línea 118: Espera a que termine una operación asíncrona antes de seguir.
            await Peticiones.obtener('api/sesion.php?action=logout');
            // Línea 119: Línea de código necesaria para completar la acción de esta parte.
            usuarioActual = null;
            // Línea 120: Línea de código necesaria para completar la acción de esta parte.
            location.hash = 'inicio';
        // Línea 121: Cierra el bloque de código anterior.
        });
    // Línea 122: Cierra el bloque de código anterior.
    });

    // Línea 124: Comprueba una condición antes de continuar.
    if (userDataContainer) {
        // Línea 125: Declara una variable que se usará en esta parte del script.
        const data = await Peticiones.obtener('api/sesion.php?action=me');

        // Línea 127: Comprueba una condición antes de continuar.
        if (data.ok) {
            // Línea 128: Cambia el contenido HTML que se muestra dentro de un elemento.
            userDataContainer.innerHTML = Object.entries(data.user)
                // Línea 129: Línea de código necesaria para completar la acción de esta parte.
                .filter(([key]) => !['password'].includes(key))
                // Línea 130: Línea de código necesaria para completar la acción de esta parte.
                .map(([key, value]) => `<div class="data-row"><strong>${key}:</strong> ${value ?? ''}</div>`)
                // Línea 131: Línea de código necesaria para completar la acción de esta parte.
                .join('');
        // Línea 132: Cierra el bloque de código anterior.
        }
    // Línea 133: Cierra el bloque de código anterior.
    }
// Línea 134: Cierra el bloque de código anterior.
}

/** Escribe mensajes de error o éxito debajo de formularios. */
function mostrarMensaje(element, text, ok) {
    if (!element) {
        return;
    }

    element.textContent = text;
    element.className = `message ${ok ? 'ok' : 'error'}`;
}
