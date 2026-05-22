<?php
/**
 * DOCUMENTACIÓN DEL ARCHIVO
 * Gestiona proveedores para los productos.
 * Permite listar proveedores y crear nuevos proveedores desde subirProducto.html.
 * Se usa antes de subir producto para asociarlo a una empresa proveedora.
 */
// Línea 16: Carga otro archivo PHP necesario para que este funcione.
require_once 'conexion.php';

// Acción solicitada desde JavaScript mediante el parámetro action.
// Línea 19: Crea o modifica una variable con datos que se usarán después.
$action = $_GET['action'] ?? 'list';

// Línea 21: Comprueba una condición antes de seguir ejecutando.
if ($action === 'list') {
    // Línea 22: Línea necesaria para completar la operación de este archivo PHP.
    comprobarRoles(['empleado', 'jefe']);

    // Línea 24: Crea o modifica una variable con datos que se usarán después.
    $stmt = $pdo->query('SELECT * FROM proveedores ORDER BY nombre_empresa ASC');
    // Línea 25: Recoge el resultado devuelto por la base de datos.
    responderJson(true, '', ['proveedores' => $stmt->fetchAll()]);
// Línea 26: Cierra el bloque o estructura anterior.
}

// Línea 28: Comprueba una condición antes de seguir ejecutando.
if ($action === 'create') {
    // Línea 29: Línea necesaria para completar la operación de este archivo PHP.
    comprobarRoles(['empleado', 'jefe']);

    // Línea 31: Crea o modifica una variable con datos que se usarán después.
    $data = leerDatosJson();
    // Línea 32: Crea o modifica una variable con datos que se usarán después.
    $requiredFields = ['nombre_empresa', 'nombre_contacto'];

    // Línea 34: Recorre una lista de datos para tratar cada elemento.
    foreach ($requiredFields as $field) {
        // Línea 35: Comprueba una condición antes de seguir ejecutando.
        if (trim($data[$field] ?? '') === '') {
            // Línea 36: Devuelve una respuesta JSON al JavaScript.
            responderJson(false, 'Faltan datos obligatorios del proveedor.');
        // Línea 37: Cierra el bloque o estructura anterior.
        }
    // Línea 38: Cierra el bloque o estructura anterior.
    }

    // Línea 40: Crea o modifica una variable con datos que se usarán después.
    $stmt = $pdo->prepare(
        // Línea 41: Línea necesaria para completar la operación de este archivo PHP.
        'INSERT INTO proveedores (nombre_empresa, nombre_contacto, numero_telefono, correo_electronio)
         VALUES (?, ?, ?, ?)'
    // Línea 43: Cierra el bloque o estructura anterior.
    );
    // Línea 44: Crea o modifica una variable con datos que se usarán después.
    $stmt->execute([
        // Línea 45: Línea necesaria para completar la operación de este archivo PHP.
        trim($data['nombre_empresa']),
        // Línea 46: Línea necesaria para completar la operación de este archivo PHP.
        trim($data['nombre_contacto']),
        // Línea 47: Línea necesaria para completar la operación de este archivo PHP.
        (int) ($data['telefono'] ?? 0),
        // Línea 48: Línea necesaria para completar la operación de este archivo PHP.
        trim($data['email'] ?? '')
    // Línea 49: Línea necesaria para completar la operación de este archivo PHP.
    ]);

    // Línea 51: Devuelve una respuesta JSON al JavaScript.
    responderJson(true, 'Proveedor creado correctamente.', ['id_proveedor' => (int) $pdo->lastInsertId()]);
// Línea 52: Cierra el bloque o estructura anterior.
}

// Línea 54: Devuelve una respuesta JSON al JavaScript.
responderJson(false, 'Acción no válida.', [], 400);
