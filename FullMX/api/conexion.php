<?php
/**
 * DOCUMENTACIÓN DEL ARCHIVO
 * Abre la conexión PDO con MySQL y arranca la sesión PHP.
 * Define responderJson() para enviar respuestas uniformes al JavaScript.
 * Define funciones de seguridad para comprobar login y roles.
 * Todos los PHP dependen de este archivo para no repetir conexión ni session_start().
 */
// Línea 22: Inicia la sesión para poder usar los datos del usuario conectado.
session_start();
// Línea 23: Envía una cabecera HTTP al navegador.
header('Content-Type: application/json; charset=utf-8');

// Línea 25: Crea o modifica una variable con datos que se usarán después.
$host = 'localhost';
// Línea 26: Crea o modifica una variable con datos que se usarán después.
$dbname = 'fullmx';
// Línea 27: Crea o modifica una variable con datos que se usarán después.
$user = 'root';
// Línea 28: Crea o modifica una variable con datos que se usarán después.
$password = '';

// Línea 30: Intenta ejecutar varias operaciones que pueden fallar.
try {
    // Línea 31: Crea o modifica una variable con datos que se usarán después.
    $pdo = new PDO(
        // Línea 32: Línea necesaria para completar la operación de este archivo PHP.
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        // Línea 33: Crea o modifica una variable con datos que se usarán después.
        $user,
        // Línea 34: Crea o modifica una variable con datos que se usarán después.
        $password,
        // Línea 35: Línea necesaria para completar la operación de este archivo PHP.
        [
            // Línea 36: Línea necesaria para completar la operación de este archivo PHP.
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            // Línea 37: Línea necesaria para completar la operación de este archivo PHP.
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        // Línea 38: Línea necesaria para completar la operación de este archivo PHP.
        ]
    // Línea 39: Cierra el bloque o estructura anterior.
    );
// Línea 40: Línea necesaria para completar la operación de este archivo PHP.
} catch (PDOException $exception) {
    // Línea 41: Devuelve una respuesta JSON al JavaScript.
    responderJson(false, 'Error de conexión con la base de datos.', [
        // Línea 42: Línea necesaria para completar la operación de este archivo PHP.
        'error' => $exception->getMessage()
    // Línea 43: Línea necesaria para completar la operación de este archivo PHP.
    ], 500);
// Línea 44: Cierra el bloque o estructura anterior.
}

/**
 * Lee el cuerpo JSON recibido en una petición POST.
 */
/* Función leerDatosJson: separa una tarea concreta para reutilizarla dentro de este PHP. */
function leerDatosJson(): array
{
    $input = json_decode(file_get_contents('php://input'), true);
    return is_array($input) ? $input : [];
}

/**
 * Envía una respuesta JSON estandarizada y finaliza la ejecución.
 */
/* Función responderJson: separa una tarea concreta para reutilizarla dentro de este PHP. */
function responderJson(bool $ok, string $message = '', array $extra = [], int $statusCode = 200): void
{
    http_response_code($statusCode);
    echo json_encode(array_merge([
        'ok' => $ok,
        'message' => $message
    ], $extra), JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Comprueba si existe sesión iniciada con alguno de los roles permitidos.
 */
/* Función comprobarRoles: separa una tarea concreta para reutilizarla dentro de este PHP. */
function comprobarRoles(array $roles): void
{
    if (!isset($_SESSION['user']) || !in_array($_SESSION['user']['rol'], $roles, true)) {
        responderJson(false, 'No tienes permisos para realizar esta acción.', [], 403);
    }
}

/**
 * Devuelve true si el email pertenece al dominio de empleados.
 */
/* Función esEmailEmpleado: separa una tarea concreta para reutilizarla dentro de este PHP. */
function esEmailEmpleado(string $email): bool
{
    return str_ends_with(strtolower($email), '@fullmx.es');
}

/**
 * Devuelve true si el email pertenece al dominio reservado para jefe.
 */
/* Función esEmailJefe: separa una tarea concreta para reutilizarla dentro de este PHP. */
function esEmailJefe(string $email): bool
{
    return str_ends_with(strtolower($email), '@jefe.fullmx.es');
}
