
/**
 * Archivo del carrito.
 * Guarda los productos en localStorage para que no se pierdan al cambiar de página.
 * Cada producto se guarda junto con su talla para controlar bien el stock.
 */
// Línea 25: Declara una variable que se usará en esta parte del script.
const Carrito = {
    // Línea 26: Guarda o lee información del navegador para conservar datos al cambiar de vista.
    items: JSON.parse(localStorage.getItem('fullmx_carrito') || '[]'),

    /** Guarda el carrito y actualiza el número del icono superior. */
    save() {
        localStorage.setItem('fullmx_carrito', JSON.stringify(this.items));
        this.updateCounter();
    },

    /**
     * Añade un producto al carrito.
     * Si ya está el mismo producto con la misma talla, aumenta la cantidad.
     */
    // Línea 38: Línea de código necesaria para completar la acción de esta parte.
    add(product) {
        // Línea 39: Declara una variable que se usará en esta parte del script.
        const itemEncontrado = this.items.find((item) => (
            // Línea 40: Línea de código necesaria para completar la acción de esta parte.
            Number(item.id) === Number(product.id) && Number(item.id_talla) === Number(product.id_talla)
        // Línea 41: Línea de código necesaria para completar la acción de esta parte.
        ));

        // Línea 43: Comprueba una condición antes de continuar.
        if (itemEncontrado) {
            // Línea 44: Comprueba una condición antes de continuar.
            if (itemEncontrado.cantidad >= Number(product.stock_talla)) {
                // Línea 45: Línea de código necesaria para completar la acción de esta parte.
                this.showToast('No hay más stock de esa talla');
                // Línea 46: Termina la función y devuelve el resultado correspondiente.
                return;
            // Línea 47: Cierra el bloque de código anterior.
            }

            // Línea 49: Línea de código necesaria para completar la acción de esta parte.
            itemEncontrado.cantidad += 1;
        // Línea 50: Línea de código necesaria para completar la acción de esta parte.
        } else {
            // Línea 51: Línea de código necesaria para completar la acción de esta parte.
            this.items.push({
                // Línea 52: Línea de código necesaria para completar la acción de esta parte.
                id: Number(product.id),
                // Línea 53: Línea de código necesaria para completar la acción de esta parte.
                id_talla: Number(product.id_talla),
                // Línea 54: Línea de código necesaria para completar la acción de esta parte.
                talla: product.talla,
                // Línea 55: Línea de código necesaria para completar la acción de esta parte.
                stock_talla: Number(product.stock_talla),
                // Línea 56: Línea de código necesaria para completar la acción de esta parte.
                nombre: product.nombre,
                // Línea 57: Línea de código necesaria para completar la acción de esta parte.
                precio: Number(product.precio),
                // Línea 58: Línea de código necesaria para completar la acción de esta parte.
                imagen: product.imagen,
                // Línea 59: Línea de código necesaria para completar la acción de esta parte.
                cantidad: 1
            // Línea 60: Cierra el bloque de código anterior.
            });
        // Línea 61: Cierra el bloque de código anterior.
        }

        // Línea 63: Línea de código necesaria para completar la acción de esta parte.
        this.save();
        // Línea 64: Línea de código necesaria para completar la acción de esta parte.
        this.showToast('Producto añadido al carrito');
    // Línea 65: Línea de código necesaria para completar la acción de esta parte.
    },

    /** Vacía el carrito completo. */
    clear() {
        this.items = [];
        this.save();
    },

    /** Elimina una línea completa del carrito. */
    // Línea 74: Línea de código necesaria para completar la acción de esta parte.
    remove(productId, sizeId) {
        // Línea 75: Línea de código necesaria para completar la acción de esta parte.
        this.items = this.items.filter((item) => !(
            // Línea 76: Línea de código necesaria para completar la acción de esta parte.
            Number(item.id) === Number(productId) && Number(item.id_talla) === Number(sizeId)
        // Línea 77: Línea de código necesaria para completar la acción de esta parte.
        ));
        // Línea 78: Línea de código necesaria para completar la acción de esta parte.
        this.save();
        // Línea 79: Línea de código necesaria para completar la acción de esta parte.
        this.render();
    // Línea 80: Línea de código necesaria para completar la acción de esta parte.
    },

    /** Suma una unidad a un producto si no supera el stock disponible. */
    sumar(productId, sizeId) {
        const item = this.items.find((linea) => (
            Number(linea.id) === Number(productId) && Number(linea.id_talla) === Number(sizeId)
        ));

        if (!item) {
            return;
        }

        if (Number(item.cantidad) >= Number(item.stock_talla || 99)) {
            this.showToast('No hay más unidades disponibles');
            return;
        }

        item.cantidad += 1;
        this.save();
        this.render();
    },

    /** Resta una unidad. Si llega a 0, elimina la línea del carrito. */
    // Línea 103: Línea de código necesaria para completar la acción de esta parte.
    restar(productId, sizeId) {
        // Línea 104: Declara una variable que se usará en esta parte del script.
        const item = this.items.find((linea) => (
            // Línea 105: Línea de código necesaria para completar la acción de esta parte.
            Number(linea.id) === Number(productId) && Number(linea.id_talla) === Number(sizeId)
        // Línea 106: Línea de código necesaria para completar la acción de esta parte.
        ));

        // Línea 108: Comprueba una condición antes de continuar.
        if (!item) {
            // Línea 109: Termina la función y devuelve el resultado correspondiente.
            return;
        // Línea 110: Cierra el bloque de código anterior.
        }

        // Línea 112: Línea de código necesaria para completar la acción de esta parte.
        item.cantidad -= 1;

        // Línea 114: Comprueba una condición antes de continuar.
        if (item.cantidad <= 0) {
            // Línea 115: Línea de código necesaria para completar la acción de esta parte.
            this.remove(productId, sizeId);
            // Línea 116: Termina la función y devuelve el resultado correspondiente.
            return;
        // Línea 117: Cierra el bloque de código anterior.
        }

        // Línea 119: Línea de código necesaria para completar la acción de esta parte.
        this.save();
        // Línea 120: Línea de código necesaria para completar la acción de esta parte.
        this.render();
    // Línea 121: Línea de código necesaria para completar la acción de esta parte.
    },

    /** Calcula el total del pedido. */
    total() {
        return this.items.reduce((sum, item) => sum + Number(item.precio) * Number(item.cantidad), 0);
    },

    /** Actualiza el contador pequeño del icono del carrito. */
    // Línea 129: Línea de código necesaria para completar la acción de esta parte.
    updateCounter() {
        // Línea 130: Declara una variable que se usará en esta parte del script.
        const counter = document.getElementById('contadorCarrito');
        // Línea 131: Declara una variable que se usará en esta parte del script.
        const amount = this.items.reduce((sum, item) => sum + Number(item.cantidad), 0);

        // Línea 133: Comprueba una condición antes de continuar.
        if (counter) {
            // Línea 134: Cambia el texto visible de un elemento de la página.
            counter.textContent = amount;
        // Línea 135: Cierra el bloque de código anterior.
        }
    // Línea 136: Línea de código necesaria para completar la acción de esta parte.
    },

    /**
     * Muestra los productos dentro de carrito.html.
     * Aquí aparecen los botones + y - para cambiar cantidades.
     */
    // Línea 142: Línea de código necesaria para completar la acción de esta parte.
    render() {
        // Línea 143: Declara una variable que se usará en esta parte del script.
        const list = document.getElementById('listaCarrito');
        // Línea 144: Declara una variable que se usará en esta parte del script.
        const total = document.getElementById('totalCarrito');

        // Línea 146: Comprueba una condición antes de continuar.
        if (!list || !total) {
            // Línea 147: Termina la función y devuelve el resultado correspondiente.
            return;
        // Línea 148: Cierra el bloque de código anterior.
        }

        // Línea 150: Comprueba una condición antes de continuar.
        if (this.items.length === 0) {
            // Línea 151: Cambia el contenido HTML que se muestra dentro de un elemento.
            list.innerHTML = '<div class="panel"><p class="muted">El carrito está vacío. Añade productos desde las categorías.</p></div>';
            // Línea 152: Cambia el texto visible de un elemento de la página.
            total.textContent = '0,00 €';
            // Línea 153: Termina la función y devuelve el resultado correspondiente.
            return;
        // Línea 154: Cierra el bloque de código anterior.
        }

        // Línea 156: Cambia el contenido HTML que se muestra dentro de un elemento.
        list.innerHTML = this.items.map((item) => `
            <article class="cart-item">
                <img src="${item.imagen || 'img/placeholder.svg'}" alt="${item.nombre}">
                <div class="cart-info">
                    <strong>${item.nombre}</strong>
                    <p class="muted">Talla ${String(item.talla).toUpperCase()} · ${Number(item.precio).toFixed(2)} € unidad</p>
                </div>
                <div class="quantity-box" aria-label="Cantidad del producto">
                    <button type="button" onclick="Carrito.restar(${item.id}, ${item.id_talla})">−</button>
                    <span>${item.cantidad}</span>
                    <button type="button" onclick="Carrito.sumar(${item.id}, ${item.id_talla})">+</button>
                </div>
                <button class="btn btn-secondary" type="button" onclick="Carrito.remove(${item.id}, ${item.id_talla})">Quitar</button>
            </article>
        `).join('');

        // Línea 172: Cambia el texto visible de un elemento de la página.
        total.textContent = `${this.total().toFixed(2)} €`;
    // Línea 173: Línea de código necesaria para completar la acción de esta parte.
    },

    /** Muestra un aviso flotante sencillo cuando ocurre algo en el carrito. */
    showToast(text) {
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = text;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 1700);
    }
};

// Evento: escucha una acción del usuario y ejecuta la función correspondiente.

window.addEventListener('DOMContentLoaded', () => Carrito.updateCounter());
