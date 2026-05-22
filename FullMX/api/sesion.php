<?php
/**
 * DOCUMENTACIÓN DEL ARCHIVO
 * Gestiona login, logout, registro público, registro desde jefe y consulta de sesión.
 * Decide el rol por el tipo de email y consulta la tabla correspondiente.
 * Usa password_hash() y password_verify() para trabajar con contraseñas seguras.
 * Devuelve siempre JSON para que sesión.js actualice la interfaz.
 */
// Línea 17: Carga otro archivo PHP necesario para que este funcione.
require_once 'conexion.php';

// Acción solicitada desde JavaScript mediante el parámetro action.
// Línea 20: Crea o modifica una variable con datos que se usarán después.
$action = $_GET['action'] ?? '';

/**
 * Convierte una fila de cliente/empleado en un objeto uniforme para el frontend.
 */
/* Función prepararUsuarioPublico: separa una tarea concreta para reutilizarla dentro de este PHP. */
function prepararUsuarioPublico(array $user, string $role): array
{
    if ($role === 'cliente') {
        return [
            'id' => (int) $user['id_cliente'],
            'nombre' => $user['nombre_cliente'],
            'dni' => $user['DNI'],
            'email' => $user['correo_electronico'],
            'telefono' => $user['numero_telefono'],
            'direccion' => $user['direccion'],
            'ciudad' => $user['ciudad'],
            'codigo_postal' => $user['codigo_postal'],
            'rol' => 'cliente'
        ];
    }

    return [
        'id' => (int) $user['id_empleado'],
        'nombre' => $user['nombre_empleado'],
        'dni' => $user['dni'],
        'email' => $user['correo_electronico'],
        'telefono' => $user['numero_telefono'],
        'fecha_nacimiento' => $user['fecha_nacimiento'],
        'rol' => $role
    ];
}

if ($action === 'session') {
    responderJson(true, '', ['user' => $_SESSION['user'] ?? null]);
}

if ($action === 'logout') {
    session_destroy();
    responderJson(true, 'Sesión cerrada correctamente.');
}

if ($action === 'me') {
    if (!isset($_SESSION['user'])) {
        responderJson(false, 'No hay sesión iniciada.', [], 401);
    }

    responderJson(true, '', ['user' => $_SESSION['user']]);
}

if ($action === 'login') {
    $data = leerDatosJson();
    $email = trim($data['email'] ?? '');
    $plainPassword = $data['password'] ?? '';

    if ($email === '' || $plainPassword === '') {
        responderJson(false, 'Introduce email y contraseña.');
    }

    if (esEmailEmpleado($email) || esEmailJefe($email)) {
        $stmt = $pdo->prepare('SELECT * FROM empleados WHERE correo_electronico = ? LIMIT 1');
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        $hashField = 'contrasenia';
        $role = esEmailJefe($email) ? 'jefe' : 'empleado';
    } else {
        $stmt = $pdo->prepare('SELECT * FROM cliente WHERE correo_electronico = ? LIMIT 1');
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        $hashField = 'contrasena';
        $role = 'cliente';
    }

    if (!$user || !password_verify($plainPassword, $user[$hashField] ?? '')) {
        responderJson(false, 'Usuario o contraseña incorrectos.');
    }

    $_SESSION['user'] = prepararUsuarioPublico($user, $role);
    responderJson(true, 'Sesión iniciada correctamente.', ['user' => $_SESSION['user']]);
}

if ($action === 'registerCliente' || $action === 'registerClienteJefe') {
    if ($action === 'registerClienteJefe') {
        comprobarRoles(['jefe']);
    }

    $data = leerDatosJson();
    $email = trim($data['email'] ?? '');

    if ($email === '' || esEmailEmpleado($email) || esEmailJefe($email)) {
        responderJson(false, 'El email de cliente no puede ser corporativo.');
    }

    $requiredFields = ['nombre', 'dni', 'email', 'password', 'telefono', 'direccion', 'ciudad', 'codigo_postal'];

    foreach ($requiredFields as $field) {
        if (trim((string) ($data[$field] ?? '')) === '') {
            responderJson(false, 'Faltan campos obligatorios.');
        }
    }

    try {
        $stmt = $pdo->prepare(
            'INSERT INTO cliente (nombre_cliente, DNI, correo_electronico, numero_telefono, contrasena, direccion, ciudad, codigo_postal)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([
            trim($data['nombre']),
            trim($data['dni']),
            $email,
            (int) $data['telefono'],
            password_hash($data['password'], PASSWORD_DEFAULT),
            trim($data['direccion']),
            trim($data['ciudad']),
            (int) $data['codigo_postal']
        ]);

        responderJson(true, 'Cliente registrado correctamente.');
    } catch (PDOException $exception) {
        responderJson(false, 'No se pudo registrar el cliente. Revisa DNI o email repetidos.');
    }
}

responderJson(false, 'Acción no válida.', [], 400);
