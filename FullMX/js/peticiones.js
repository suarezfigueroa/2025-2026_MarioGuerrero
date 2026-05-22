
/**
 * Archivo de peticiones.
 * Aquí dejo juntas las funciones que hablan con los PHP para no repetir fetch
 * en todos los archivos JavaScript.
 */
// Línea 21: Declara una variable que se usará en esta parte del script.
const Peticiones = {
    /**
     * Pide datos al servidor usando GET.
     * Se usa para cargar productos, comprobar sesión, pedidos, etc.
     */
    // Línea 26: Línea de código necesaria para completar la acción de esta parte.
    async obtener(url) {
        // Línea 27: Declara una variable que se usará en esta parte del script.
        const respuesta = await fetch(url, {
            // Línea 28: Línea de código necesaria para completar la acción de esta parte.
            credentials: 'same-origin'
        // Línea 29: Cierra el bloque de código anterior.
        });

        // Línea 31: Termina la función y devuelve el resultado correspondiente.
        return respuesta.json();
    // Línea 32: Línea de código necesaria para completar la acción de esta parte.
    },

    /**
     * Envía datos al servidor usando POST.
     * Sirve tanto para formularios normales como para datos JSON.
     */
    // Línea 38: Línea de código necesaria para completar la acción de esta parte.
    async enviar(url, datos) {
        // Línea 39: Declara una variable que se usará en esta parte del script.
        const opciones = {
            // Línea 40: Línea de código necesaria para completar la acción de esta parte.
            method: 'POST',
            // Línea 41: Línea de código necesaria para completar la acción de esta parte.
            credentials: 'same-origin'
        // Línea 42: Cierra el bloque de código anterior.
        };

        // Línea 44: Comprueba una condición antes de continuar.
        if (datos instanceof FormData) {
            // Línea 45: Línea de código necesaria para completar la acción de esta parte.
            opciones.body = datos;
        // Línea 46: Línea de código necesaria para completar la acción de esta parte.
        } else {
            // Línea 47: Línea de código necesaria para completar la acción de esta parte.
            opciones.headers = {
                // Línea 48: Línea de código necesaria para completar la acción de esta parte.
                'Content-Type': 'application/json'
            // Línea 49: Cierra el bloque de código anterior.
            };
            // Línea 50: Línea de código necesaria para completar la acción de esta parte.
            opciones.body = JSON.stringify(datos);
        // Línea 51: Cierra el bloque de código anterior.
        }

        // Línea 53: Declara una variable que se usará en esta parte del script.
        const respuesta = await fetch(url, opciones);
        // Línea 54: Termina la función y devuelve el resultado correspondiente.
        return respuesta.json();
    // Línea 55: Cierra el bloque de código anterior.
    }
// Línea 56: Cierra el bloque de código anterior.
};

// Mantengo este alias para que otros archivos antiguos sigan funcionando si queda alguna llamada.
// Línea 59: Declara una variable que se usará en esta parte del script.
const API = {
    // Línea 60: Línea de código necesaria para completar la acción de esta parte.
    get: Peticiones.obtener,
    // Línea 61: Línea de código necesaria para completar la acción de esta parte.
    post: Peticiones.enviar
// Línea 62: Cierra el bloque de código anterior.
};
