<?php
/**
 * DOCUMENTACIÓN DEL ARCHIVO
 * Gestiona empleados desde la zona jefe.
 * Permite crear empleados, buscar empleados y borrarlos.
 * Solo el jefe puede usar estas acciones porque se comprueba el rol en PHP.
 */
// Línea 17: Carga otro archivo PHP necesario para que este funcione.
require_once 'conexion.php';

// Línea 19: Línea necesaria para completar la operación de este archivo PHP.
comprobarRoles(['jefe']);
// Acción solicitada desde JavaScript mediante el parámetro action.
// Línea 21: Crea o modifica una variable con datos que se usarán después.
$action = $_GET['action'] ?? '';

// Línea 23: Comprueba una condición antes de seguir ejecutando.
if ($action === 'create') {
    // Línea 24: Crea o modifica una variable con datos que se usarán después.
    $data = leerDatosJson();
    // Línea 25: Crea o modifica una variable con datos que se usarán después.
    $email = trim($data['email'] ?? '');

    // Línea 27: Comprueba una condición antes de seguir ejecutando.
    if (!esEmailEmpleado($email)) {
        // Línea 28: Devuelve una respuesta JSON al JavaScript.
        responderJson(false, 'El empleado debe tener un email acabado en @fullmx.es.');
    // Línea 29: Cierra el bloque o estructura anterior.
    }

    // Línea 31: Crea o modifica una variable con datos que se usarán después.
    $requiredFields = ['nombre', 'dni', 'email', 'password'];

    // Línea 33: Recorre una lista de datos para tratar cada elemento.
    foreach ($requiredFields as $field) {
        // Línea 34: Comprueba una condición antes de seguir ejecutando.
        if (trim($data[$field] ?? '') === '') {
            // Línea 35: Devuelve una respuesta JSON al JavaScript.
            responderJson(false, 'Faltan campos obligatorios.');
        // Línea 36: Cierra el bloque o estructura anterior.
        }
    // Línea 37: Cierra el bloque o estructura anterior.
    }

    // Línea 39: Intenta ejecutar varias operaciones que pueden fallar.
    try {
        // Línea 40: Crea o modifica una variable con datos que se usarán después.
        $stmt = $pdo->prepare(
            // Línea 41: Línea necesaria para completar la operación de este archivo PHP.
            'INSERT INTO empleados (nombre_empleado, dni, fecha_nacimiento, numero_telefono, correo_electronico, contrasenia)
             VALUES (?, ?, ?, ?, ?, ?)'
        // Línea 43: Cierra el bloque o estructura anterior.
        );
        // Línea 44: Crea o modifica una variable con datos que se usarán después.
        $stmt->execute([
            // Línea 45: Línea necesaria para completar la operación de este archivo PHP.
            trim($data['nombre']),
            // Línea 46: Línea necesaria para completar la operación de este archivo PHP.
            trim($data['dni']),
            // Línea 47: Crea o modifica una variable con datos que se usarán después.
            $data['fecha_nacimiento'] ?: null,
            // Línea 48: Línea necesaria para completar la operación de este archivo PHP.
            (int) ($data['telefono'] ?? 0),
            // Línea 49: Crea o modifica una variable con datos que se usarán después.
            $email,
            // Línea 50: Encripta la contraseña antes de guardarla.
            password_hash($data['password'], PASSWORD_DEFAULT)
        // Línea 51: Línea necesaria para completar la operación de este archivo PHP.
        ]);

        // Línea 53: Devuelve una respuesta JSON al JavaScript.
        responderJson(true, 'Empleado creado correctamente.');
    // Línea 54: Línea necesaria para completar la operación de este archivo PHP.
    } catch (PDOException $exception) {
        // Línea 55: Devuelve una respuesta JSON al JavaScript.
        responderJson(false, 'No se pudo crear el empleado. Revisa DNI o email repetidos.');
    // Línea 56: Cierra el bloque o estructura anterior.
    }
// Línea 57: Cierra el bloque o estructura anterior.
}

// Línea 59: Comprueba una condición antes de seguir ejecutando.
if ($action === 'find') {
    // Línea 60: Crea o modifica una variable con datos que se usarán después.
    $query = trim($_GET['q'] ?? '');

    // Línea 62: Comprueba una condición antes de seguir ejecutando.
    if ($query === '') {
        // Línea 63: Devuelve una respuesta JSON al JavaScript.
        responderJson(false, 'Introduce ID o DNI del empleado.');
    // Línea 64: Cierra el bloque o estructura anterior.
    }

    // Línea 66: Comprueba una condición antes de seguir ejecutando.
    if (ctype_digit($query)) {
        // Línea 67: Crea o modifica una variable con datos que se usarán después.
        $stmt = $pdo->prepare('SELECT id_empleado, nombre_empleado, dni, fecha_nacimiento, numero_telefono, correo_electronico FROM empleados WHERE id_empleado = ? LIMIT 1');
        // Línea 68: Crea o modifica una variable con datos que se usarán después.
        $stmt->execute([(int) $query]);
    // Línea 69: Línea necesaria para completar la operación de este archivo PHP.
    } else {
        // Línea 70: Crea o modifica una variable con datos que se usarán después.
        $stmt = $pdo->prepare('SELECT id_empleado, nombre_empleado, dni, fecha_nacimiento, numero_telefono, correo_electronico FROM empleados WHERE dni = ? LIMIT 1');
        // Línea 71: Crea o modifica una variable con datos que se usarán después.
        $stmt->execute([$query]);
    // Línea 72: Cierra el bloque o estructura anterior.
    }

    // Línea 74: Crea o modifica una variable con datos que se usarán después.
    $employee = $stmt->fetch();

    // Línea 76: Comprueba una condición antes de seguir ejecutando.
    if (!$employee) {
        // Línea 77: Devuelve una respuesta JSON al JavaScript.
        responderJson(false, 'Empleado no encontrado.');
    // Línea 78: Cierra el bloque o estructura anterior.
    }

    // Línea 80: Crea o modifica una variable con datos que se usarán después.
    $employee['rol'] = esEmailJefe($employee['correo_electronico']) ? 'jefe' : 'empleado';
    // Línea 81: Devuelve una respuesta JSON al JavaScript.
    responderJson(true, '', ['empleado' => $employee]);
// Línea 82: Cierra el bloque o estructura anterior.
}

// Línea 84: Comprueba una condición antes de seguir ejecutando.
if ($action === 'delete') {
    // Línea 85: Crea o modifica una variable con datos que se usarán después.
    $data = leerDatosJson();
    // Línea 86: Crea o modifica una variable con datos que se usarán después.
    $id = (int) ($data['id'] ?? 0);

    // Línea 88: Comprueba una condición antes de seguir ejecutando.
    if ($id <= 0) {
        // Línea 89: Devuelve una respuesta JSON al JavaScript.
        responderJson(false, 'ID de empleado no válido.');
    // Línea 90: Cierra el bloque o estructura anterior.
    }

    // Línea 92: Comprueba una condición antes de seguir ejecutando.
    if (isset($_SESSION['user']['id']) && (int) $_SESSION['user']['id'] === $id) {
        // Línea 93: Devuelve una respuesta JSON al JavaScript.
        responderJson(false, 'No puedes borrar tu propio usuario jefe mientras estás conectado.');
    // Línea 94: Cierra el bloque o estructura anterior.
    }

    // Línea 96: Crea o modifica una variable con datos que se usarán después.
    $stmt = $pdo->prepare('DELETE FROM empleados WHERE id_empleado = ? AND correo_electronico NOT LIKE ?');
    // Línea 97: Crea o modifica una variable con datos que se usarán después.
    $stmt->execute([$id, '%@jefe.fullmx.es']);

    // Línea 99: Comprueba una condición antes de seguir ejecutando.
    if ($stmt->rowCount() === 0) {
        // Línea 100: Devuelve una respuesta JSON al JavaScript.
        responderJson(false, 'No se pudo borrar. Solo se pueden borrar empleados, no jefes.');
    // Línea 101: Cierra el bloque o estructura anterior.
    }

    // Línea 103: Devuelve una respuesta JSON al JavaScript.
    responderJson(true, 'Empleado borrado correctamente.');
// Línea 104: Cierra el bloque o estructura anterior.
}

// Línea 106: Devuelve una respuesta JSON al JavaScript.
responderJson(false, 'Acción no válida.', [], 400);
