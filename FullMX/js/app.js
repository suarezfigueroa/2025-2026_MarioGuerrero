
/**
 * Archivo principal de la web.
 * Controla la navegación por hash, carga las vistas HTML y llama a las funciones
 * de productos, sesión, pedidos, empleados y carrito cuando hacen falta.
 */
// Línea 25: Declara una variable que se usará en esta parte del script.
const app = document.getElementById('app');

/** Rutas privadas: cada pantalla indica qué roles pueden entrar. */
const protectedRoutes = {
    sesionCliente: ['cliente'],
    datosCliente: ['cliente'],
    pedidosCliente: ['cliente'],
    sesionEmpleado: ['empleado'],
    sesionJefe: ['jefe'],
    datosEmpleado: ['empleado', 'jefe'],
    buscarPedido: ['empleado', 'jefe'],
    subirProducto: ['empleado', 'jefe'],
    actualizarProducto: ['empleado', 'jefe'],
    borrarProducto: ['empleado', 'jefe'],
    crearEmpleado: ['jefe'],
    borrarEmpleado: ['jefe'],
    registroClienteJefe: ['jefe']
};

/** Cambia la clase del body para que cada zona pueda tener fondo distinto. */
// Línea 44: Declara una función para reutilizar esta acción cuando haga falta.
function aplicarFondoPagina(route, param = null) {
    // Línea 45: Línea de código necesaria para completar la acción de esta parte.
    document.body.className = document.body.className
        // Línea 46: Línea de código necesaria para completar la acción de esta parte.
        .split(' ')
        // Línea 47: Línea de código necesaria para completar la acción de esta parte.
        .filter((className) => !className.startsWith('page-'))
        // Línea 48: Línea de código necesaria para completar la acción de esta parte.
        .join(' ');

    // Línea 50: Comprueba una condición antes de continuar.
    if (route === 'categoria') {
        // Línea 51: Añade o quita clases CSS para cambiar el aspecto visual.
        document.body.classList.add(`page-categoria-${param || 'cascos'}`);
        // Línea 52: Termina la función y devuelve el resultado correspondiente.
        return;
    // Línea 53: Cierra el bloque de código anterior.
    }

    // Línea 55: Añade o quita clases CSS para cambiar el aspecto visual.
    document.body.classList.add(`page-${route}`);
// Línea 56: Cierra el bloque de código anterior.
}

/** Carga una vista HTML dentro del main principal. */
async function cargarVista(route = 'inicio', param = null) {
    aplicarFondoPagina(route, param);

    if (protectedRoutes[route] && !(await pedirRol(protectedRoutes[route]))) {
        return;
    }

    const response = await fetch(`vistas/${route}.html`);

    if (!response.ok) {
        location.hash = 'inicio';
        return;
    }

    app.innerHTML = await response.text();
    app.focus({ preventScroll: true });

    await prepararFormulariosSesion();
    await prepararFormulariosProducto();
    prepararActualizarProducto();
    prepararBorrarProducto();
    prepararFormulariosPedidos();
    prepararFormulariosEmpleados();

    if (route === 'categoria') {
        cargarCategoria(param || 'cascos');
    }

    if (route === 'buscar') {
        document.getElementById('tituloCategoria').textContent = 'Resultados de búsqueda';
        document.getElementById('subtituloCategoria').textContent = `Resultados para: ${param || ''}`;
        buscarProductos(param || '');
    }

    if (route === 'carrito') {
        prepararVistaCarrito();
    }

    if (route === 'pedidosCliente') {
        cargarPedidosCliente();
    }
}

/** Lee la ruta actual desde la URL. */
// Línea 102: Declara una función para reutilizar esta acción cuando haga falta.
function leerRuta() {
    // Línea 103: Declara una variable que se usará en esta parte del script.
    const hash = location.hash.replace('#', '') || 'inicio';
    // Línea 104: Declara una variable que se usará en esta parte del script.
    const [route, param] = hash.split('/');

    // Línea 106: Comprueba una condición antes de continuar.
    if (route === 'categoria') {
        // Línea 107: Termina la función y devuelve el resultado correspondiente.
        return ['categoria', param || 'cascos'];
    // Línea 108: Cierra el bloque de código anterior.
    }

    // Línea 110: Comprueba una condición antes de continuar.
    if (route === 'buscar') {
        // Línea 111: Termina la función y devuelve el resultado correspondiente.
        return ['buscar', decodeURIComponent(param || '')];
    // Línea 112: Cierra el bloque de código anterior.
    }

    // Línea 114: Termina la función y devuelve el resultado correspondiente.
    return [route, null];
// Línea 115: Cierra el bloque de código anterior.
}

/** Router principal: comprueba sesión y carga la vista correspondiente. */
async function moverPagina() {
    await comprobarSesion();
    const [route, param] = leerRuta();

    if (route === 'buscar') {
        await cargarVista('categoria', param);
        document.getElementById('tituloCategoria').textContent = 'Resultados de búsqueda';
        document.getElementById('subtituloCategoria').textContent = `Resultados para: ${param}`;
        buscarProductos(param);
        return;
    }

    cargarVista(route, param);
}

/** Prepara los botones de comprar y vaciar carrito. */
// Línea 134: Declara una función para reutilizar esta acción cuando haga falta.
function prepararVistaCarrito() {
    // Línea 135: Declara una variable que se usará en esta parte del script.
    const emptyButton = document.getElementById('btnVaciarCarrito');
    // Línea 136: Declara una variable que se usará en esta parte del script.
    const buyButton = document.getElementById('btnComprar');
    // Línea 137: Declara una variable que se usará en esta parte del script.
    const message = document.getElementById('msgCarrito');

    // Línea 139: Línea de código necesaria para completar la acción de esta parte.
    Carrito.render();

    // Línea 141: Asocia un evento del usuario, por ejemplo un click o el envío de un formulario.
    emptyButton?.addEventListener('click', () => {
        // Línea 142: Línea de código necesaria para completar la acción de esta parte.
        Carrito.clear();
        // Línea 143: Línea de código necesaria para completar la acción de esta parte.
        Carrito.render();
        // Línea 144: Línea de código necesaria para completar la acción de esta parte.
        mostrarMensaje(message, 'Carrito vaciado correctamente.', true);
    // Línea 145: Cierra el bloque de código anterior.
    });

    // Línea 147: Asocia un evento del usuario, por ejemplo un click o el envío de un formulario.
    buyButton?.addEventListener('click', async () => {
        // Línea 148: Espera a que termine una operación asíncrona antes de seguir.
        await comprobarSesion();

        // Línea 150: Comprueba una condición antes de continuar.
        if (!usuarioActual || usuarioActual.rol !== 'cliente') {
            // Línea 151: Línea de código necesaria para completar la acción de esta parte.
            mostrarMensaje(message, 'Para comprar tienes que iniciar sesión como cliente.', false);
            // Línea 152: Línea de código necesaria para completar la acción de esta parte.
            setTimeout(() => {
                // Línea 153: Línea de código necesaria para completar la acción de esta parte.
                location.hash = 'login';
            // Línea 154: Línea de código necesaria para completar la acción de esta parte.
            }, 900);
            // Línea 155: Termina la función y devuelve el resultado correspondiente.
            return;
        // Línea 156: Cierra el bloque de código anterior.
        }

        // Línea 158: Comprueba una condición antes de continuar.
        if (Carrito.items.length === 0) {
            // Línea 159: Línea de código necesaria para completar la acción de esta parte.
            mostrarMensaje(message, 'El carrito está vacío.', false);
            // Línea 160: Termina la función y devuelve el resultado correspondiente.
            return;
        // Línea 161: Cierra el bloque de código anterior.
        }

        // Línea 163: Declara una variable que se usará en esta parte del script.
        const data = await Peticiones.enviar('api/pedidos.php?action=create', {
            // Línea 164: Línea de código necesaria para completar la acción de esta parte.
            items: Carrito.items
        // Línea 165: Cierra el bloque de código anterior.
        });

        // Línea 167: Línea de código necesaria para completar la acción de esta parte.
        mostrarMensaje(message, data.message, data.ok);

        // Línea 169: Comprueba una condición antes de continuar.
        if (data.ok) {
            // Línea 170: Línea de código necesaria para completar la acción de esta parte.
            Carrito.clear();
            // Línea 171: Línea de código necesaria para completar la acción de esta parte.
            Carrito.render();
        // Línea 172: Cierra el bloque de código anterior.
        }
    // Línea 173: Cierra el bloque de código anterior.
    });
// Línea 174: Cierra el bloque de código anterior.
}

/** Carga los pedidos del cliente conectado. */
async function cargarPedidosCliente() {
    const container = document.getElementById('pedidosCliente');
    const data = await Peticiones.obtener('api/pedidos.php?action=misPedidos');

    if (!container) {
        return;
    }

    container.innerHTML = (data.pedidos || []).map((order) => `
        <article class="order-card">
            <h3>Pedido #${order.id_pedido}</h3>
            <p class="muted">Fecha: ${order.fecha_pedido}</p>
            <p>Total: <strong>${Number(order.precio_pedido).toFixed(2)} €</strong></p>
            <p>Estado: ${order.seguimiento}</p>
            <button class="btn btn-primary btn-detalle-pedido" type="button" data-id-pedido="${order.id_pedido}">Detalle pedido</button>
        </article>
    `).join('') || '<div class="panel"><p class="muted">Aún no tienes pedidos.</p></div>';

    // Después de pintar los pedidos, preparo los botones de detalle.
    // Cada botón abre un pop up con las líneas reales del pedido consultadas al PHP.
    container.querySelectorAll('.btn-detalle-pedido').forEach((boton) => {
        boton.addEventListener('click', () => {
            abrirDetallePedido(boton.dataset.idPedido);
        });
    });
}


/**
 * Abre el pop up con el detalle completo de un pedido del cliente.
 * Pide al PHP los productos del pedido y muestra foto, nombre, cantidad,
 * importe por línea y el total final calculado desde la base de datos.
 */
async function abrirDetallePedido(idPedido) {
    const data = await Peticiones.obtener(`api/pedidos.php?action=detalle&id=${encodeURIComponent(idPedido)}`);

    if (!data.ok) {
        alert(data.message || 'No se pudo cargar el detalle del pedido.');
        return;
    }

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay is-visible';
    overlay.setAttribute('aria-hidden', 'false');

    const filas = (data.detalle || []).map((item) => `
        <article class="detalle-pedido-row">
            <img src="${item.imagen}" alt="${item.nombre}">
            <div>
                <h3>${item.nombre}</h3>
                <p class="muted">Talla: ${String(item.talla).toUpperCase()}</p>
                <p>Cantidad: <strong>${item.cantidad}</strong></p>
            </div>
            <strong>${Number(item.precio_total).toFixed(2)} €</strong>
        </article>
    `).join('');

    overlay.innerHTML = `
        <div class="modal-card detalle-pedido-modal" role="dialog" aria-modal="true" aria-labelledby="detalle-pedido-title">
            <button class="modal-close" type="button" aria-label="Cerrar detalle del pedido">×</button>
            <h2 id="detalle-pedido-title">Detalle del pedido #${data.pedido.id_pedido}</h2>
            <p class="muted">Fecha: ${data.pedido.fecha_pedido} · Estado: ${data.pedido.seguimiento}</p>
            <div class="detalle-pedido-lista">${filas}</div>
            <div class="detalle-pedido-total">
                <span>Total del pedido</span>
                <strong>${Number(data.total).toFixed(2)} €</strong>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector('.modal-close').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            overlay.remove();
        }
    });
}

/** Activa el formulario para buscar pedidos desde empleado/jefe. */
// Línea 196: Declara una función para reutilizar esta acción cuando haga falta.
function prepararFormulariosPedidos() {
    // Línea 197: Declara una variable que se usará en esta parte del script.
    const form = document.getElementById('formBuscarPedido');

    // Línea 199: Comprueba una condición antes de continuar.
    if (!form) {
        // Línea 200: Termina la función y devuelve el resultado correspondiente.
        return;
    // Línea 201: Cierra el bloque de código anterior.
    }

    // Evento: escucha una acción del usuario y ejecuta la función correspondiente.

    // Línea 205: Asocia un evento del usuario, por ejemplo un click o el envío de un formulario.
    form.addEventListener('submit', async (event) => {
        // Línea 206: Evita que el formulario recargue la página al enviarse.
        event.preventDefault();
        // Línea 207: Declara una variable que se usará en esta parte del script.
        const query = new FormData(form).get('busqueda');
        // Línea 208: Declara una variable que se usará en esta parte del script.
        const data = await Peticiones.obtener(`api/pedidos.php?action=buscar&q=${encodeURIComponent(query)}`);
        // Línea 209: Declara una variable que se usará en esta parte del script.
        const results = document.getElementById('resultadoPedidos');

        // Línea 211: Cambia el contenido HTML que se muestra dentro de un elemento.
        results.innerHTML = (data.pedidos || []).map((order) => `
            <article class="order-card">
                <h3>Pedido #${order.id_pedido}</h3>
                <p>Cliente: ${order.cliente} · DNI: ${order.dni}</p>
                <p>Fecha: ${order.fecha_pedido}</p>
                <p>Total: <strong>${Number(order.precio_pedido).toFixed(2)} €</strong></p>
                <p>Estado: ${order.seguimiento}</p>
            </article>
        `).join('') || '<p class="muted">No se encontraron pedidos.</p>';
    // Línea 220: Cierra el bloque de código anterior.
    });
// Línea 221: Cierra el bloque de código anterior.
}

/** Activa crear empleado, buscar empleado y borrar empleado. */
function prepararFormulariosEmpleados() {
    const createForm = document.getElementById('formCrearEmpleado');
    const findForm = document.getElementById('formBuscarEmpleado');

    if (createForm) {
        // Evento: escucha una acción del usuario y ejecuta la función correspondiente.
        createForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const message = document.getElementById('msgCrearEmpleado');
            const data = await Peticiones.enviar('api/empleados.php?action=create', Object.fromEntries(new FormData(createForm)));

            mostrarMensaje(message, data.message, data.ok);

            if (data.ok) {
                createForm.reset();
            }
        });
    }

    if (findForm) {
        // Evento: escucha una acción del usuario y ejecuta la función correspondiente.
        findForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const query = new FormData(findForm).get('busqueda');
            const message = document.getElementById('msgBorrarEmpleado');
            const result = document.getElementById('resultadoEmpleado');
            const data = await Peticiones.obtener(`api/empleados.php?action=find&q=${encodeURIComponent(query)}`);

            mostrarMensaje(message, data.message || '', data.ok);

            if (!data.ok) {
                result.innerHTML = '';
                return;
            }

            const employee = data.empleado;
            result.innerHTML = `
                <article class="panel employee-result">
                    <h3>${employee.nombre_empleado}</h3>
                    <p>DNI: ${employee.dni}</p>
                    <p>Email: ${employee.correo_electronico}</p>
                    <p>Rol: ${employee.rol}</p>
                    <button class="btn btn-primary" type="button" id="btnConfirmarBorrado">Borrar empleado</button>
                </article>
            `;

            document.getElementById('btnConfirmarBorrado').addEventListener('click', async () => {
                const deleteData = await Peticiones.enviar('api/empleados.php?action=delete', {
                    id: employee.id_empleado
                });

                mostrarMensaje(message, deleteData.message, deleteData.ok);

                if (deleteData.ok) {
                    result.innerHTML = '';
                }
            });
        });
    }
}


/**
 * Prepara el pop up de contacto situado encima del footer.
 * El botón existe en el index, por eso se configura una sola vez al cargar la página.
 */
function prepararBotonContacto() {
    const botonContacto = document.getElementById('btnContacto');
    const popupContacto = document.getElementById('popupContacto');
    const cerrarContacto = document.getElementById('cerrarContacto');

    if (!botonContacto || !popupContacto || !cerrarContacto) {
        return;
    }

    botonContacto.addEventListener('click', () => {
        popupContacto.classList.add('is-visible');
        popupContacto.setAttribute('aria-hidden', 'false');
    });

    cerrarContacto.addEventListener('click', () => {
        popupContacto.classList.remove('is-visible');
        popupContacto.setAttribute('aria-hidden', 'true');
    });

    popupContacto.addEventListener('click', (event) => {
        if (event.target === popupContacto) {
            popupContacto.classList.remove('is-visible');
            popupContacto.setAttribute('aria-hidden', 'true');
        }
    });
}

/** Activa botones del header: carrito, sesión y buscador. */
// Línea 286: Declara una función para reutilizar esta acción cuando haga falta.
function prepararBotonesCabecera() {
    // Línea 287: Asocia un evento del usuario, por ejemplo un click o el envío de un formulario.
    document.getElementById('btnCarrito')?.addEventListener('click', () => {
        // Línea 288: Línea de código necesaria para completar la acción de esta parte.
        location.hash = 'carrito';
    // Línea 289: Cierra el bloque de código anterior.
    });

    // Línea 291: Asocia un evento del usuario, por ejemplo un click o el envío de un formulario.
    document.getElementById('btnSesion')?.addEventListener('click', async () => {
        // Línea 292: Espera a que termine una operación asíncrona antes de seguir.
        await comprobarSesion();
        // Línea 293: Línea de código necesaria para completar la acción de esta parte.
        location.hash = rutaSesion().substring(1);
    // Línea 294: Cierra el bloque de código anterior.
    });

    // Línea 296: Asocia un evento del usuario, por ejemplo un click o el envío de un formulario.
    document.getElementById('formBuscador')?.addEventListener('submit', (event) => {
        // Línea 297: Evita que el formulario recargue la página al enviarse.
        event.preventDefault();
        // Línea 298: Declara una variable que se usará en esta parte del script.
        const texto = document.getElementById('inputBuscador').value.trim();

        // Línea 300: Comprueba una condición antes de continuar.
        if (texto !== '') {
            // Línea 301: Línea de código necesaria para completar la acción de esta parte.
            location.hash = `buscar/${encodeURIComponent(texto)}`;
        // Línea 302: Cierra el bloque de código anterior.
        }
    // Línea 303: Cierra el bloque de código anterior.
    });
// Línea 304: Cierra el bloque de código anterior.
}

// Evento: escucha una acción del usuario y ejecuta la función correspondiente.

// Línea 308: Asocia un evento del usuario, por ejemplo un click o el envío de un formulario.
window.addEventListener('hashchange', moverPagina);
// Evento: escucha una acción del usuario y ejecuta la función correspondiente.
// Línea 310: Asocia un evento del usuario, por ejemplo un click o el envío de un formulario.
window.addEventListener('DOMContentLoaded', () => {
    // Línea 311: Línea de código necesaria para completar la acción de esta parte.
    prepararBotonesCabecera();
    // Activa el pop up de contacto del footer común.
    prepararBotonContacto();
    // Línea 312: Línea de código necesaria para completar la acción de esta parte.
    moverPagina();
// Línea 313: Cierra el bloque de código anterior.
});
