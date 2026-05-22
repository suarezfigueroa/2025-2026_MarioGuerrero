
/**
 * Archivo de catálogo.
 * Se encarga de mostrar productos por categoría, hacer búsquedas y subir productos.
 */
// Línea 23: Declara una variable que se usará en esta parte del script.
const CATEGORY_NAMES = {
    // Línea 24: Línea de código necesaria para completar la acción de esta parte.
    cascos: 'Cascos',
    // Línea 25: Línea de código necesaria para completar la acción de esta parte.
    botas: 'Botas',
    // Línea 26: Línea de código necesaria para completar la acción de esta parte.
    ropa: 'Ropa',
    // Línea 27: Línea de código necesaria para completar la acción de esta parte.
    protecciones: 'Protecciones',
    // Línea 28: Línea de código necesaria para completar la acción de esta parte.
    accesorios: 'Accesorios'
// Línea 29: Cierra el bloque de código anterior.
};

// Línea 31: Declara una variable que se usará en esta parte del script.
const PRODUCT_SIZES = ['xs', 's', 'm', 'l', 'xl', '2xl'];

/**
 * Pinta productos en pantalla usando el template del index.
 * Es el mismo diseño para cascos, botas, ropa, protecciones, accesorios y búsquedas.
 */
/**
 * Función pintarProductos: bloque de trabajo de este archivo.
 * Se llama desde la navegación principal o desde eventos del usuario.
 */
// Línea 41: Declara una función para reutilizar esta acción cuando haga falta.
function pintarProductos(listaProductos, tituloVacio = 'No hay productos disponibles.') {
    // Línea 42: Declara una variable que se usará en esta parte del script.
    const grid = document.getElementById('productosGrid');
    // Línea 43: Declara una variable que se usará en esta parte del script.
    const template = document.getElementById('templateProducto');

    // Línea 45: Comprueba una condición antes de continuar.
    if (!grid || !template) {
        // Línea 46: Termina la función y devuelve el resultado correspondiente.
        return;
    // Línea 47: Cierra el bloque de código anterior.
    }

    // Línea 49: Comprueba una condición antes de continuar.
    if (!listaProductos || listaProductos.length === 0) {
        // Línea 50: Cambia el contenido HTML que se muestra dentro de un elemento.
        grid.innerHTML = `<div class="panel"><p class="muted">${tituloVacio}</p></div>`;
        // Línea 51: Termina la función y devuelve el resultado correspondiente.
        return;
    // Línea 52: Cierra el bloque de código anterior.
    }

    // Línea 54: Cambia el contenido HTML que se muestra dentro de un elemento.
    grid.innerHTML = '';

    // Línea 56: Recorre una lista de elementos para trabajar con cada uno.
    listaProductos.forEach((product) => {
        // Línea 57: Declara una variable que se usará en esta parte del script.
        const node = template.content.cloneNode(true);
        // Línea 58: Declara una variable que se usará en esta parte del script.
        const image = node.querySelector('.product-image');
        // Línea 59: Declara una variable que se usará en esta parte del script.
        const sizeSelect = node.querySelector('.product-size');
        // Línea 60: Declara una variable que se usará en esta parte del script.
        const addButton = node.querySelector('.btn-add');

        // Línea 62: Línea de código necesaria para completar la acción de esta parte.
        image.src = product.imagen || 'img/placeholder.svg';
        // Línea 63: Línea de código necesaria para completar la acción de esta parte.
        image.alt = product.nombre;
        // Línea 64: Cambia el texto visible de un elemento de la página.
        node.querySelector('.product-category').textContent = `${CATEGORY_NAMES[product.categoria] || product.categoria} · ${product.marca}`;
        // Línea 65: Cambia el texto visible de un elemento de la página.
        node.querySelector('h3').textContent = product.nombre;
        // Muestra el ID del producto entre el nombre y la descripción para que empleado/jefe puedan localizarlo.
        node.querySelector('.product-id').textContent = `ID producto: ${product.id}`;
        // Línea 66: Cambia el texto visible de un elemento de la página.
        node.querySelector('.product-description').textContent = product.descripcion || 'Producto de motocross FullMX.';
        // Línea 67: Cambia el texto visible de un elemento de la página.
        node.querySelector('.product-price').textContent = `${Number(product.precio).toFixed(2)} €`;

        // Línea 69: Cambia el contenido HTML que se muestra dentro de un elemento.
        sizeSelect.innerHTML = product.tallas.map((size) => (
            // Línea 70: Línea de código necesaria para completar la acción de esta parte.
            `<option value="${size.id_talla}" data-talla="${size.talla}" data-stock="${size.stock}">${size.talla.toUpperCase()} · ${size.stock} uds.</option>`
        // Línea 71: Línea de código necesaria para completar la acción de esta parte.
        )).join('');

        // Evento: escucha una acción del usuario y ejecuta la función correspondiente.

        // Línea 75: Asocia un evento del usuario, por ejemplo un click o el envío de un formulario.
        addButton.addEventListener('click', () => {
            // Línea 76: Declara una variable que se usará en esta parte del script.
            const selected = sizeSelect.options[sizeSelect.selectedIndex];

            // Línea 78: Línea de código necesaria para completar la acción de esta parte.
            Carrito.add({
                // Línea 79: Línea de código necesaria para completar la acción de esta parte.
                ...product,
                // Línea 80: Lee o modifica el valor de un campo del formulario.
                id_talla: Number(selected.value),
                // Línea 81: Línea de código necesaria para completar la acción de esta parte.
                talla: selected.dataset.talla,
                // Línea 82: Línea de código necesaria para completar la acción de esta parte.
                stock_talla: Number(selected.dataset.stock)
            // Línea 83: Cierra el bloque de código anterior.
            });
        // Línea 84: Cierra el bloque de código anterior.
        });

        // Línea 86: Línea de código necesaria para completar la acción de esta parte.
        grid.appendChild(node);
    // Línea 87: Cierra el bloque de código anterior.
    });
// Línea 88: Cierra el bloque de código anterior.
}

/** Carga los productos de una categoría concreta. */
async function cargarCategoria(category) {
    const title = document.getElementById('tituloCategoria');
    const subtitle = document.getElementById('subtituloCategoria');

    if (title) {
        title.textContent = CATEGORY_NAMES[category] || 'Productos';
    }

    if (subtitle) {
        subtitle.textContent = `Productos disponibles en ${CATEGORY_NAMES[category]?.toLowerCase() || 'el catálogo'} con tallas en stock.`;
    }

    const data = await Peticiones.obtener(`api/catalogo.php?categoria=${encodeURIComponent(category)}`);

    if (!data.ok) {
        pintarProductos([], 'No se pudieron cargar los productos.');
        return;
    }

    pintarProductos(data.productos, 'Todavía no hay productos con tallas en stock en esta categoría.');
}

/** Busca productos por una palabra escrita en el buscador superior. */
// Línea 114: Declara una función asíncrona porque dentro se hacen peticiones al servidor.
async function buscarProductos(texto) {
    // Línea 115: Declara una variable que se usará en esta parte del script.
    const data = await Peticiones.obtener(`api/catalogo.php?buscar=${encodeURIComponent(texto)}`);

    // Línea 117: Comprueba una condición antes de continuar.
    if (!data.ok) {
        // Línea 118: Línea de código necesaria para completar la acción de esta parte.
        pintarProductos([], 'No se pudieron buscar productos.');
        // Línea 119: Termina la función y devuelve el resultado correspondiente.
        return;
    // Línea 120: Cierra el bloque de código anterior.
    }

    // Línea 122: Línea de código necesaria para completar la acción de esta parte.
    pintarProductos(data.productos, `No hay productos que coincidan con "${texto}".`);
// Línea 123: Cierra el bloque de código anterior.
}

/** Carga proveedores dentro del select de subir producto. */
async function cargarProveedores() {
    const select = document.getElementById('selectProveedor');

    if (!select) {
        return;
    }

    const data = await Peticiones.obtener('api/proveedores.php?action=list');
    select.innerHTML = '<option value="">Selecciona proveedor</option>';

    if (data.ok) {
        data.proveedores.forEach((provider) => {
            select.innerHTML += `<option value="${provider.id_proveedor}">${provider.nombre_empresa}</option>`;
        });
    }
}

/** Activa el formulario para crear proveedores desde la zona interna. */
// Línea 144: Declara una función para reutilizar esta acción cuando haga falta.
function prepararFormularioProveedor() {
    // Línea 145: Declara una variable que se usará en esta parte del script.
    const form = document.getElementById('formProveedor');

    // Línea 147: Comprueba una condición antes de continuar.
    if (!form) {
        // Línea 148: Termina la función y devuelve el resultado correspondiente.
        return;
    // Línea 149: Cierra el bloque de código anterior.
    }

    // Evento: escucha una acción del usuario y ejecuta la función correspondiente.

    // Línea 153: Asocia un evento del usuario, por ejemplo un click o el envío de un formulario.
    form.addEventListener('submit', async (event) => {
        // Línea 154: Evita que el formulario recargue la página al enviarse.
        event.preventDefault();
        // Línea 155: Declara una variable que se usará en esta parte del script.
        const message = document.getElementById('msgProveedor');
        // Línea 156: Declara una variable que se usará en esta parte del script.
        const data = await Peticiones.enviar('api/proveedores.php?action=create', Object.fromEntries(new FormData(form)));

        // Línea 158: Línea de código necesaria para completar la acción de esta parte.
        mostrarMensaje(message, data.message, data.ok);

        // Línea 160: Comprueba una condición antes de continuar.
        if (data.ok) {
            // Línea 161: Línea de código necesaria para completar la acción de esta parte.
            form.reset();
            // Línea 162: Espera a que termine una operación asíncrona antes de seguir.
            await cargarProveedores();
            // Línea 163: Lee o modifica el valor de un campo del formulario.
            document.getElementById('selectProveedor').value = data.id_proveedor;
        // Línea 164: Cierra el bloque de código anterior.
        }
    // Línea 165: Cierra el bloque de código anterior.
    });
// Línea 166: Cierra el bloque de código anterior.
}

/** Activa el formulario de subir producto para empleado y jefe. */
async function prepararFormulariosProducto() {
    const productForm = document.getElementById('formProducto');

    await cargarProveedores();
    prepararFormularioProveedor();

    if (!productForm) {
        return;
    }

    // Evento: escucha una acción del usuario y ejecuta la función correspondiente.

    productForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const message = document.getElementById('msgProducto');
        const data = await Peticiones.enviar('api/catalogo.php?action=create', new FormData(productForm));

        mostrarMensaje(message, data.message, data.ok);

        if (data.ok) {
            productForm.reset();
        }
    });
}

/**
 * Activa la pantalla de actualizar producto.
 * Primero busca el producto por ID y después crea un formulario con todas sus tallas.
 * Esta función se ejecuta solo si existe el formulario de la vista actualizarProducto.html.
 */
/**
 * Función prepararActualizarProducto: bloque de trabajo de este archivo.
 * Se llama desde la navegación principal o desde eventos del usuario.
 */
// Línea 203: Declara una función para reutilizar esta acción cuando haga falta.
function prepararActualizarProducto() {
    // Línea 204: Declara una variable que se usará en esta parte del script.
    const formBuscar = document.getElementById('formBuscarProductoStock');

    // Línea 206: Comprueba una condición antes de continuar.
    if (!formBuscar) {
        // Línea 207: Termina la función y devuelve el resultado correspondiente.
        return;
    // Línea 208: Cierra el bloque de código anterior.
    }

    // Evento: escucha una acción del usuario y ejecuta la función correspondiente.

    // Línea 212: Asocia un evento del usuario, por ejemplo un click o el envío de un formulario.
    formBuscar.addEventListener('submit', async (event) => {
        // Línea 213: Evita que el formulario recargue la página al enviarse.
        event.preventDefault();

        // Línea 215: Declara una variable que se usará en esta parte del script.
        const mensaje = document.getElementById('msgActualizarProducto');
        // Línea 216: Declara una variable que se usará en esta parte del script.
        const resultado = document.getElementById('resultadoActualizarProducto');
        // Línea 217: Declara una variable que se usará en esta parte del script.
        const idProducto = new FormData(formBuscar).get('id_producto');

        // Línea 219: Cambia el contenido HTML que se muestra dentro de un elemento.
        resultado.innerHTML = '';
        // Línea 220: Línea de código necesaria para completar la acción de esta parte.
        mostrarMensaje(mensaje, 'Buscando producto...', true);

        // Línea 222: Declara una variable que se usará en esta parte del script.
        const data = await Peticiones.obtener(`api/catalogo.php?action=stock&id_producto=${encodeURIComponent(idProducto)}`);

        // Línea 224: Comprueba una condición antes de continuar.
        if (!data.ok) {
            // Línea 225: Línea de código necesaria para completar la acción de esta parte.
            mostrarMensaje(mensaje, data.message || 'No se pudo cargar el producto.', false);
            // Línea 226: Termina la función y devuelve el resultado correspondiente.
            return;
        // Línea 227: Cierra el bloque de código anterior.
        }

        // Línea 229: Línea de código necesaria para completar la acción de esta parte.
        mostrarMensaje(mensaje, 'Producto encontrado. Puedes actualizar sus tallas.', true);
        // Línea 230: Línea de código necesaria para completar la acción de esta parte.
        pintarFormularioStockProducto(data.producto);
    // Línea 231: Cierra el bloque de código anterior.
    });
// Línea 232: Cierra el bloque de código anterior.
}

/**
 * Muestra en pantalla los datos principales del producto y un input por cada talla.
 * El empleado o jefe puede subir o bajar las unidades escribiendo el número que quiera.
 */
/**
 * Función pintarFormularioStockProducto: bloque de trabajo de este archivo.
 * Se llama desde la navegación principal o desde eventos del usuario.
 */
// Línea 242: Declara una función para reutilizar esta acción cuando haga falta.
function pintarFormularioStockProducto(producto) {
    // Línea 243: Declara una variable que se usará en esta parte del script.
    const resultado = document.getElementById('resultadoActualizarProducto');

    // Línea 245: Comprueba una condición antes de continuar.
    if (!resultado) {
        // Línea 246: Termina la función y devuelve el resultado correspondiente.
        return;
    // Línea 247: Cierra el bloque de código anterior.
    }

    // Línea 249: Cambia el contenido HTML que se muestra dentro de un elemento.
    resultado.innerHTML = `
        <article class="product-row stock-product-card">
            <img class="product-image" src="${producto.imagen}" alt="${producto.nombre}">

            <div class="product-info">
                <p class="product-category">${producto.categoria} · ${producto.marca}</p>
                <h3>${producto.nombre}</h3>
                <p class="product-description">${producto.descripcion || 'Producto FullMX.'}</p>
                <p class="muted">ID del producto: ${producto.id}</p>
            </div>

            <form id="formActualizarStock" class="stock-size-form">
                ${producto.tallas.map((talla) => `
                    <label>
                        <span>${talla.talla.toUpperCase()}</span>
                        <input type="number" min="0" name="tallas[${talla.id_talla}]" value="${talla.stock}">
                    </label>
                `).join('')}

                <button class="btn btn-primary" type="submit">Guardar stock</button>
            </form>
        </article>
    `;

    // Línea 273: Asocia un evento del usuario, por ejemplo un click o el envío de un formulario.
    document.getElementById('formActualizarStock').addEventListener('submit', async (event) => {
        // Línea 274: Evita que el formulario recargue la página al enviarse.
        event.preventDefault();

        // Línea 276: Declara una variable que se usará en esta parte del script.
        const mensaje = document.getElementById('msgActualizarProducto');
        // Línea 277: Declara una variable que se usará en esta parte del script.
        const formData = new FormData(event.currentTarget);
        // Línea 278: Línea de código necesaria para completar la acción de esta parte.
        formData.append('id_producto', producto.id);

        // Línea 280: Declara una variable que se usará en esta parte del script.
        const data = await Peticiones.enviar('api/catalogo.php?action=updateStock', formData);
        // Línea 281: Línea de código necesaria para completar la acción de esta parte.
        mostrarMensaje(mensaje, data.message, data.ok);

        // Línea 283: Comprueba una condición antes de continuar.
        if (data.ok) {
            // Línea 284: Declara una variable que se usará en esta parte del script.
            const actualizado = await Peticiones.obtener(`api/catalogo.php?action=stock&id_producto=${encodeURIComponent(producto.id)}`);

            // Línea 286: Comprueba una condición antes de continuar.
            if (actualizado.ok) {
                // Línea 287: Línea de código necesaria para completar la acción de esta parte.
                pintarFormularioStockProducto(actualizado.producto);
            // Línea 288: Cierra el bloque de código anterior.
            }
        // Línea 289: Cierra el bloque de código anterior.
        }
    // Línea 290: Cierra el bloque de código anterior.
    });
// Línea 291: Cierra el bloque de código anterior.
}


/**
 * Activa la pantalla de borrar producto.
 * Primero busca el producto por ID para que empleado o jefe comprueben que es el correcto.
 * Después habilita el botón de borrar y envía la petición al PHP.
 */
function prepararBorrarProducto() {
    // Busca el formulario de la vista borrarProducto.html.
    const formBuscar = document.getElementById('formBuscarProductoBorrar');

    // Si esta vista no está cargada, no hace nada.
    if (!formBuscar) {
        return;
    }

    // Zona donde se mostrará el mensaje de la operación.
    const mensaje = document.getElementById('msgBorrarProducto');

    // Zona donde se pintará la ficha del producto encontrado.
    const resultado = document.getElementById('resultadoBorrarProducto');

    // Botón que elimina el producto. Empieza desactivado hasta que se encuentre un producto válido.
    const botonBorrar = document.getElementById('btnBorrarProducto');

    // Guarda el ID del último producto encontrado para evitar borrar otro distinto por accidente.
    let idProductoEncontrado = null;

    // Evento del botón buscar.
    formBuscar.addEventListener('submit', async (event) => {
        // Evita que el formulario recargue la página.
        event.preventDefault();

        // Lee el ID introducido por el usuario.
        const idProducto = new FormData(formBuscar).get('id_producto');

        // Limpia resultados anteriores.
        resultado.innerHTML = '';
        botonBorrar.disabled = true;
        idProductoEncontrado = null;

        // Informa al usuario de que se está buscando el producto.
        mostrarMensaje(mensaje, 'Buscando producto...', true);

        // Reutiliza la acción stock porque ya devuelve el producto con todas sus tallas.
        const data = await Peticiones.obtener(`api/catalogo.php?action=stock&id_producto=${encodeURIComponent(idProducto)}`);

        // Si el PHP indica error, se muestra el mensaje y no se permite borrar.
        if (!data.ok) {
            mostrarMensaje(mensaje, data.message || 'No se pudo encontrar el producto.', false);
            return;
        }

        // Guarda el ID encontrado y activa el botón de borrado.
        idProductoEncontrado = data.producto.id;
        botonBorrar.disabled = false;

        // Muestra una ficha resumen para comprobar el producto antes de borrarlo.
        pintarProductoParaBorrar(data.producto);

        // Mensaje de confirmación visual.
        mostrarMensaje(mensaje, 'Producto encontrado. Revisa los datos y pulsa borrar si quieres eliminarlo.', true);
    });

    // Evento del botón borrar.
    botonBorrar.addEventListener('click', async () => {
        // Si no hay producto buscado, no se permite continuar.
        if (!idProductoEncontrado) {
            mostrarMensaje(mensaje, 'Primero tienes que buscar un producto válido.', false);
            return;
        }

        // Confirmación para evitar borrados accidentales.
        const confirmado = confirm(`¿Seguro que quieres borrar el producto con ID ${idProductoEncontrado}?`);

        // Si el usuario cancela, no se borra nada.
        if (!confirmado) {
            return;
        }

        // Prepara los datos que se enviarán al PHP.
        const formData = new FormData();
        formData.append('id_producto', idProductoEncontrado);

        // Envía la petición de borrado al servidor.
        const data = await Peticiones.enviar('api/catalogo.php?action=deleteProduct', formData);

        // Muestra el resultado recibido.
        mostrarMensaje(mensaje, data.message, data.ok);

        // Si se ha borrado correctamente, limpia la pantalla y desactiva el botón.
        if (data.ok) {
            resultado.innerHTML = '';
            botonBorrar.disabled = true;
            idProductoEncontrado = null;
            formBuscar.reset();
        }
    });
}

/**
 * Pinta la ficha previa del producto que se va a borrar.
 * Se muestra imagen, ID, nombre, categoría, marca, descripción y stock por talla.
 */
function pintarProductoParaBorrar(producto) {
    // Busca el contenedor de resultados de borrar producto.
    const resultado = document.getElementById('resultadoBorrarProducto');

    // Si no existe el contenedor, no se puede pintar nada.
    if (!resultado) {
        return;
    }

    // Crea un resumen legible del stock de cada talla.
    const tallasHtml = producto.tallas.map((talla) => `
        <span class="stock-pill">${talla.talla.toUpperCase()}: ${talla.stock} uds.</span>
    `).join('');

    // Inserta la ficha del producto en la vista.
    resultado.innerHTML = `
        <article class="product-row stock-product-card">
            <img class="product-image" src="${producto.imagen}" alt="${producto.nombre}">

            <div class="product-info">
                <p class="product-category">${producto.categoria} · ${producto.marca}</p>
                <h3>${producto.nombre}</h3>
                <p class="product-id">ID producto: ${producto.id}</p>
                <p class="product-description">${producto.descripcion || 'Producto FullMX.'}</p>
                <div class="stock-pill-list">${tallasHtml}</div>
            </div>
        </article>
    `;
}
