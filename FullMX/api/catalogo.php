<?php
/**
 * DOCUMENTACIÓN DEL ARCHIVO
 * Gestiona catálogo de productos.
 * Permite crear productos con proveedor, imagen y stock por talla.
 * Lista productos por categoría o búsqueda ocultando los que no tienen stock real.
 * Actualiza stock_producto a 0 cuando no queda ninguna talla disponible.
 */
// Línea 24: Carga otro archivo PHP necesario para que este funcione.
require_once 'conexion.php';

// Acción solicitada desde JavaScript mediante el parámetro action.
// Línea 27: Crea o modifica una variable con datos que se usarán después.
$action = $_GET['action'] ?? 'list';
// Línea 28: Crea o modifica una variable con datos que se usarán después.
$validCategories = ['cascos', 'botas', 'ropa', 'protecciones', 'accesorios'];
// Línea 29: Crea o modifica una variable con datos que se usarán después.
$validSizes = ['xs', 's', 'm', 'l', 'xl', '2xl'];

/**
 * Actualiza stock_producto mirando la suma de todas las tallas.
 * Si ninguna talla tiene unidades, el producto queda como no disponible.
 */
/* Función actualizarStockDelProducto: separa una tarea concreta para reutilizarla dentro de este PHP. */
function actualizarStockDelProducto(PDO $pdo, int $productId): void
{
    $stmt = $pdo->prepare('SELECT COALESCE(SUM(stock), 0) AS total FROM tallas WHERE id_producto = ?');
    $stmt->execute([$productId]);
    $total = (int) $stmt->fetchColumn();

    $stmt = $pdo->prepare('UPDATE productos SET stock_producto = ? WHERE id_producto = ?');
    $stmt->execute([$total > 0 ? 1 : 0, $productId]);
}

/**
 * Crea un producto nuevo desde el panel de empleado o jefe.
 * También crea sus tallas, aunque alguna talla tenga stock 0.
 */
// Línea 50: Comprueba una condición antes de seguir ejecutando.
if ($action === 'create') {
    // Línea 51: Línea necesaria para completar la operación de este archivo PHP.
    comprobarRoles(['empleado', 'jefe']);

    // Línea 53: Crea o modifica una variable con datos que se usarán después.
    $nombre = trim($_POST['nombre'] ?? '');
    // Línea 54: Crea o modifica una variable con datos que se usarán después.
    $categoria = trim($_POST['categoria'] ?? '');
    // Línea 55: Crea o modifica una variable con datos que se usarán después.
    $descripcion = trim($_POST['descripcion'] ?? '');
    // Línea 56: Crea o modifica una variable con datos que se usarán después.
    $marca = trim($_POST['marca'] ?? '');
    // Línea 57: Crea o modifica una variable con datos que se usarán después.
    $precio = (float) ($_POST['precio'] ?? 0);
    // Línea 58: Crea o modifica una variable con datos que se usarán después.
    $proveedor = (int) ($_POST['id_proveedor'] ?? 0);
    // Línea 59: Crea o modifica una variable con datos que se usarán después.
    $stocks = $_POST['tallas'] ?? [];
    // Línea 60: Crea o modifica una variable con datos que se usarán después.
    $imagenFileName = 'placeholder.svg';

    // Línea 62: Comprueba una condición antes de seguir ejecutando.
    if ($nombre === '' || $marca === '' || !in_array($categoria, $validCategories, true) || $precio <= 0 || $proveedor <= 0) {
        // Línea 63: Devuelve una respuesta JSON al JavaScript.
        responderJson(false, 'Datos de producto incorrectos.');
    // Línea 64: Cierra el bloque o estructura anterior.
    }

    // Línea 66: Comprueba una condición antes de seguir ejecutando.
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        // Línea 67: Crea o modifica una variable con datos que se usarán después.
        $extension = strtolower(pathinfo($_FILES['imagen']['name'], PATHINFO_EXTENSION));
        // Línea 68: Crea o modifica una variable con datos que se usarán después.
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

        // Línea 70: Comprueba una condición antes de seguir ejecutando.
        if (!in_array($extension, $allowedExtensions, true)) {
            // Línea 71: Devuelve una respuesta JSON al JavaScript.
            responderJson(false, 'Formato de imagen no permitido.');
        // Línea 72: Cierra el bloque o estructura anterior.
        }

        // Línea 74: Crea o modifica una variable con datos que se usarán después.
        $imagenFileName = uniqid('producto_', true) . '.' . $extension;
        // Línea 75: Crea o modifica una variable con datos que se usarán después.
        $destination = __DIR__ . '/../img/' . $imagenFileName;

        // Línea 77: Comprueba una condición antes de seguir ejecutando.
        if (!move_uploaded_file($_FILES['imagen']['tmp_name'], $destination)) {
            // Línea 78: Devuelve una respuesta JSON al JavaScript.
            responderJson(false, 'No se pudo guardar la imagen.');
        // Línea 79: Cierra el bloque o estructura anterior.
        }
    // Línea 80: Cierra el bloque o estructura anterior.
    }

    // Línea 82: Intenta ejecutar varias operaciones que pueden fallar.
    try {
        // Línea 83: Crea o modifica una variable con datos que se usarán después.
        $pdo->beginTransaction();

        // Línea 85: Crea o modifica una variable con datos que se usarán después.
        $stmt = $pdo->prepare(
            // Línea 86: Línea necesaria para completar la operación de este archivo PHP.
            'INSERT INTO productos (id_empleado, id_proveedor, nombre_producto, img_producto, marca, precio_producto, tipo_producto, descripcion_producto, stock_producto)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)'
        // Línea 88: Cierra el bloque o estructura anterior.
        );
        // Línea 89: Crea o modifica una variable con datos que se usarán después.
        $stmt->execute([
            // Línea 90: Crea o modifica una variable con datos que se usarán después.
            $_SESSION['user']['id'],
            // Línea 91: Crea o modifica una variable con datos que se usarán después.
            $proveedor,
            // Línea 92: Crea o modifica una variable con datos que se usarán después.
            $nombre,
            // Línea 93: Crea o modifica una variable con datos que se usarán después.
            $imagenFileName,
            // Línea 94: Crea o modifica una variable con datos que se usarán después.
            $marca,
            // Línea 95: Crea o modifica una variable con datos que se usarán después.
            $precio,
            // Línea 96: Crea o modifica una variable con datos que se usarán después.
            $categoria,
            // Línea 97: Crea o modifica una variable con datos que se usarán después.
            $descripcion
        // Línea 98: Línea necesaria para completar la operación de este archivo PHP.
        ]);

        // Línea 100: Crea o modifica una variable con datos que se usarán después.
        $productId = (int) $pdo->lastInsertId();
        // Línea 101: Crea o modifica una variable con datos que se usarán después.
        $stmt = $pdo->prepare('INSERT INTO tallas (id_producto, talla, stock) VALUES (?, ?, ?)');

        // Línea 103: Recorre una lista de datos para tratar cada elemento.
        foreach ($validSizes as $size) {
            // Línea 104: Crea o modifica una variable con datos que se usarán después.
            $stmt->execute([$productId, $size, max(0, (int) ($stocks[$size] ?? 0))]);
        // Línea 105: Cierra el bloque o estructura anterior.
        }

        // Línea 107: Línea necesaria para completar la operación de este archivo PHP.
        actualizarStockDelProducto($pdo, $productId);
        // Línea 108: Crea o modifica una variable con datos que se usarán después.
        $pdo->commit();
        // Línea 109: Devuelve una respuesta JSON al JavaScript.
        responderJson(true, 'Producto creado correctamente con sus tallas.');
    // Línea 110: Línea necesaria para completar la operación de este archivo PHP.
    } catch (Exception $exception) {
        // Línea 111: Crea o modifica una variable con datos que se usarán después.
        $pdo->rollBack();
        // Línea 112: Devuelve una respuesta JSON al JavaScript.
        responderJson(false, 'No se pudo crear el producto. Revisa proveedor, empleado y datos introducidos.');
    // Línea 113: Cierra el bloque o estructura anterior.
    }
// Línea 114: Cierra el bloque o estructura anterior.
}


/**
 * Devuelve un producto concreto con todas sus tallas, incluidas las que están a 0.
 * Lo usan empleado y jefe para revisar el stock antes de modificarlo.
 */
// Línea 121: Comprueba una condición antes de seguir ejecutando.
if ($action === 'stock') {
    // Línea 122: Línea necesaria para completar la operación de este archivo PHP.
    comprobarRoles(['empleado', 'jefe']);

    // Línea 124: Crea o modifica una variable con datos que se usarán después.
    $productId = (int) ($_GET['id_producto'] ?? 0);

    // Línea 126: Comprueba una condición antes de seguir ejecutando.
    if ($productId <= 0) {
        // Línea 127: Devuelve una respuesta JSON al JavaScript.
        responderJson(false, 'Introduce un ID de producto válido.');
    // Línea 128: Cierra el bloque o estructura anterior.
    }

    // Línea 130: Crea o modifica una variable con datos que se usarán después.
    $stmt = $pdo->prepare(
        // Línea 131: Línea necesaria para completar la operación de este archivo PHP.
        'SELECT p.*
         FROM productos p
         WHERE p.id_producto = ?'
    // Línea 134: Cierra el bloque o estructura anterior.
    );
    // Línea 135: Crea o modifica una variable con datos que se usarán después.
    $stmt->execute([$productId]);
    // Línea 136: Crea o modifica una variable con datos que se usarán después.
    $producto = $stmt->fetch();

    // Línea 138: Comprueba una condición antes de seguir ejecutando.
    if (!$producto) {
        // Línea 139: Devuelve una respuesta JSON al JavaScript.
        responderJson(false, 'No existe ningún producto con ese ID.');
    // Línea 140: Cierra el bloque o estructura anterior.
    }

    // Línea 142: Crea o modifica una variable con datos que se usarán después.
    $stmt = $pdo->prepare(
        // Línea 143: Línea necesaria para completar la operación de este archivo PHP.
        'SELECT id_talla, talla, stock
         FROM tallas
         WHERE id_producto = ?
         ORDER BY FIELD(talla, "xs", "s", "m", "l", "xl", "2xl")'
    // Línea 147: Cierra el bloque o estructura anterior.
    );
    // Línea 148: Crea o modifica una variable con datos que se usarán después.
    $stmt->execute([$productId]);
    // Línea 149: Crea o modifica una variable con datos que se usarán después.
    $tallas = $stmt->fetchAll();

    // Línea 151: Devuelve una respuesta JSON al JavaScript.
    responderJson(true, '', [
        // Línea 152: Línea necesaria para completar la operación de este archivo PHP.
        'producto' => [
            // Línea 153: Línea necesaria para completar la operación de este archivo PHP.
            'id' => (int) $producto['id_producto'],
            // Línea 154: Línea necesaria para completar la operación de este archivo PHP.
            'nombre' => $producto['nombre_producto'],
            // Línea 155: Línea necesaria para completar la operación de este archivo PHP.
            'categoria' => $producto['tipo_producto'],
            // Línea 156: Línea necesaria para completar la operación de este archivo PHP.
            'descripcion' => $producto['descripcion_producto'],
            // Línea 157: Línea necesaria para completar la operación de este archivo PHP.
            'precio' => (float) $producto['precio_producto'],
            // Línea 158: Línea necesaria para completar la operación de este archivo PHP.
            'imagen' => $producto['img_producto'] ? 'img/' . $producto['img_producto'] : 'img/placeholder.svg',
            // Línea 159: Línea necesaria para completar la operación de este archivo PHP.
            'marca' => $producto['marca'],
            // Línea 160: Línea necesaria para completar la operación de este archivo PHP.
            'stock_producto' => (int) $producto['stock_producto'],
            // Línea 161: Línea necesaria para completar la operación de este archivo PHP.
            'tallas' => array_map(function ($talla) {
                // Línea 162: Devuelve un valor y termina esta función.
                return [
                    // Línea 163: Línea necesaria para completar la operación de este archivo PHP.
                    'id_talla' => (int) $talla['id_talla'],
                    // Línea 164: Línea necesaria para completar la operación de este archivo PHP.
                    'talla' => $talla['talla'],
                    // Línea 165: Línea necesaria para completar la operación de este archivo PHP.
                    'stock' => (int) $talla['stock']
                // Línea 166: Cierra el bloque o estructura anterior.
                ];
            // Línea 167: Línea necesaria para completar la operación de este archivo PHP.
            }, $tallas)
        // Línea 168: Línea necesaria para completar la operación de este archivo PHP.
        ]
    // Línea 169: Línea necesaria para completar la operación de este archivo PHP.
    ]);
// Línea 170: Cierra el bloque o estructura anterior.
}

/**
 * Actualiza el stock de todas las tallas enviadas desde el formulario.
 * Después recalcula stock_producto: si todas las tallas quedan a 0, el producto deja de mostrarse para comprar.
 */
// Línea 176: Comprueba una condición antes de seguir ejecutando.
if ($action === 'updateStock') {
    // Línea 177: Línea necesaria para completar la operación de este archivo PHP.
    comprobarRoles(['empleado', 'jefe']);

    // Línea 179: Crea o modifica una variable con datos que se usarán después.
    $productId = (int) ($_POST['id_producto'] ?? 0);
    // Línea 180: Crea o modifica una variable con datos que se usarán después.
    $tallas = $_POST['tallas'] ?? [];

    // Línea 182: Comprueba una condición antes de seguir ejecutando.
    if ($productId <= 0 || !is_array($tallas)) {
        // Línea 183: Devuelve una respuesta JSON al JavaScript.
        responderJson(false, 'Datos de stock incorrectos.');
    // Línea 184: Cierra el bloque o estructura anterior.
    }

    // Línea 186: Crea o modifica una variable con datos que se usarán después.
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM productos WHERE id_producto = ?');
    // Línea 187: Crea o modifica una variable con datos que se usarán después.
    $stmt->execute([$productId]);

    // Línea 189: Comprueba una condición antes de seguir ejecutando.
    if ((int) $stmt->fetchColumn() === 0) {
        // Línea 190: Devuelve una respuesta JSON al JavaScript.
        responderJson(false, 'El producto indicado no existe.');
    // Línea 191: Cierra el bloque o estructura anterior.
    }

    // Línea 193: Intenta ejecutar varias operaciones que pueden fallar.
    try {
        // Línea 194: Crea o modifica una variable con datos que se usarán después.
        $pdo->beginTransaction();

        // Línea 196: Crea o modifica una variable con datos que se usarán después.
        $stmt = $pdo->prepare(
            // Línea 197: Línea necesaria para completar la operación de este archivo PHP.
            'UPDATE tallas
             SET stock = ?
             WHERE id_talla = ? AND id_producto = ?'
        // Línea 200: Cierra el bloque o estructura anterior.
        );

        // Línea 202: Recorre una lista de datos para tratar cada elemento.
        foreach ($tallas as $idTalla => $stock) {
            // Línea 203: Crea o modifica una variable con datos que se usarán después.
            $stmt->execute([
                // Línea 204: Línea necesaria para completar la operación de este archivo PHP.
                max(0, (int) $stock),
                // Línea 205: Línea necesaria para completar la operación de este archivo PHP.
                (int) $idTalla,
                // Línea 206: Crea o modifica una variable con datos que se usarán después.
                $productId
            // Línea 207: Línea necesaria para completar la operación de este archivo PHP.
            ]);
        // Línea 208: Cierra el bloque o estructura anterior.
        }

        // Línea 210: Línea necesaria para completar la operación de este archivo PHP.
        actualizarStockDelProducto($pdo, $productId);
        // Línea 211: Crea o modifica una variable con datos que se usarán después.
        $pdo->commit();
        // Línea 212: Devuelve una respuesta JSON al JavaScript.
        responderJson(true, 'Stock actualizado correctamente.');
    // Línea 213: Línea necesaria para completar la operación de este archivo PHP.
    } catch (Exception $exception) {
        // Línea 214: Crea o modifica una variable con datos que se usarán después.
        $pdo->rollBack();
        // Línea 215: Devuelve una respuesta JSON al JavaScript.
        responderJson(false, 'No se pudo actualizar el stock del producto.');
    // Línea 216: Cierra el bloque o estructura anterior.
    }
// Línea 217: Cierra el bloque o estructura anterior.
}


/**
 * Borra un producto por ID desde el panel de empleado o jefe.
 * Primero comprueba que el producto existe y después elimina sus tallas y el producto.
 * Si el producto está relacionado con pedidos antiguos y la base de datos no permite borrarlo,
 * se devuelve un mensaje claro para no romper el historial.
 */
if ($action === 'deleteProduct') {
    // Solo empleado y jefe pueden borrar productos.
    comprobarRoles(['empleado', 'jefe']);

    // Recoge el ID del producto enviado desde JavaScript.
    $productId = (int) ($_POST['id_producto'] ?? 0);

    // Valida que el ID sea un número correcto.
    if ($productId <= 0) {
        responderJson(false, 'Introduce un ID de producto válido.');
    }

    // Comprueba si existe el producto antes de intentar borrarlo.
    $stmt = $pdo->prepare('SELECT id_producto, nombre_producto FROM productos WHERE id_producto = ?');
    $stmt->execute([$productId]);
    $producto = $stmt->fetch();

    // Si no existe, devuelve error al JavaScript.
    if (!$producto) {
        responderJson(false, 'No existe ningún producto con ese ID.');
    }

    try {
        // Agrupa el borrado en una transacción para que no queden datos a medias.
        $pdo->beginTransaction();

        // Borra primero las tallas porque dependen del producto.
        $stmt = $pdo->prepare('DELETE FROM tallas WHERE id_producto = ?');
        $stmt->execute([$productId]);

        // Borra después el producto principal.
        $stmt = $pdo->prepare('DELETE FROM productos WHERE id_producto = ?');
        $stmt->execute([$productId]);

        // Confirma los cambios en la base de datos.
        $pdo->commit();

        // Responde correctamente al JavaScript.
        responderJson(true, 'Producto borrado correctamente.');
    } catch (Exception $exception) {
        // Si falla algo, deshace los cambios.
        $pdo->rollBack();

        // Devuelve un mensaje entendible, normalmente por restricciones con pedidos existentes.
        responderJson(false, 'No se pudo borrar el producto. Puede estar relacionado con pedidos ya realizados.');
    }
}


/**
 * Lista productos para categorías o búsquedas.
 * Solo muestra productos con stock_producto = 1 y alguna talla con stock real.
 */
// Línea 223: Crea o modifica una variable con datos que se usarán después.
$categoria = $_GET['categoria'] ?? '';
// Línea 224: Crea o modifica una variable con datos que se usarán después.
$buscar = trim($_GET['buscar'] ?? '');
// Línea 225: Crea o modifica una variable con datos que se usarán después.
$params = [];

// Línea 227: Crea o modifica una variable con datos que se usarán después.
$sql = 'SELECT p.*, pr.nombre_empresa,
               GROUP_CONCAT(CONCAT(t.id_talla, ":", t.talla, ":", t.stock) ORDER BY FIELD(t.talla, "xs", "s", "m", "l", "xl", "2xl") SEPARATOR "|") AS tallas_raw
        FROM productos p
        INNER JOIN proveedores pr ON pr.id_proveedor = p.id_proveedor
        INNER JOIN tallas t ON t.id_producto = p.id_producto
        WHERE p.stock_producto = 1
          AND EXISTS (SELECT 1 FROM tallas tx WHERE tx.id_producto = p.id_producto AND tx.stock > 0)';

// Línea 235: Comprueba una condición antes de seguir ejecutando.
if ($categoria !== '' && in_array($categoria, $validCategories, true)) {
    // Línea 236: Crea o modifica una variable con datos que se usarán después.
    $sql .= ' AND p.tipo_producto = ?';
    // Línea 237: Crea o modifica una variable con datos que se usarán después.
    $params[] = $categoria;
// Línea 238: Cierra el bloque o estructura anterior.
}

// Línea 240: Comprueba una condición antes de seguir ejecutando.
if ($buscar !== '') {
    // Línea 241: Crea o modifica una variable con datos que se usarán después.
    $sql .= ' AND (p.nombre_producto LIKE ? OR p.marca LIKE ? OR p.tipo_producto LIKE ? OR p.descripcion_producto LIKE ?)';
    // Línea 242: Crea o modifica una variable con datos que se usarán después.
    $textoBusqueda = '%' . $buscar . '%';
    // Línea 243: Crea o modifica una variable con datos que se usarán después.
    $params[] = $textoBusqueda;
    // Línea 244: Crea o modifica una variable con datos que se usarán después.
    $params[] = $textoBusqueda;
    // Línea 245: Crea o modifica una variable con datos que se usarán después.
    $params[] = $textoBusqueda;
    // Línea 246: Crea o modifica una variable con datos que se usarán después.
    $params[] = $textoBusqueda;
// Línea 247: Cierra el bloque o estructura anterior.
}

// Línea 249: Crea o modifica una variable con datos que se usarán después.
$sql .= ' GROUP BY p.id_producto ORDER BY p.id_producto DESC';
// Línea 250: Crea o modifica una variable con datos que se usarán después.
$stmt = $pdo->prepare($sql);
// Línea 251: Crea o modifica una variable con datos que se usarán después.
$stmt->execute($params);
// Línea 252: Crea o modifica una variable con datos que se usarán después.
$productos = [];

// Línea 254: Recorre una lista de datos para tratar cada elemento.
foreach ($stmt->fetchAll() as $row) {
    // Línea 255: Crea o modifica una variable con datos que se usarán después.
    $sizes = [];

    // Línea 257: Recorre una lista de datos para tratar cada elemento.
    foreach (explode('|', $row['tallas_raw'] ?? '') as $item) {
        // Línea 258: Comprueba una condición antes de seguir ejecutando.
        if ($item === '') {
            // Línea 259: Línea necesaria para completar la operación de este archivo PHP.
            continue;
        // Línea 260: Cierra el bloque o estructura anterior.
        }

        // Línea 262: Línea necesaria para completar la operación de este archivo PHP.
        [$idTalla, $talla, $stock] = explode(':', $item);

        // Línea 264: Comprueba una condición antes de seguir ejecutando.
        if ((int) $stock > 0) {
            // Línea 265: Crea o modifica una variable con datos que se usarán después.
            $sizes[] = [
                // Línea 266: Línea necesaria para completar la operación de este archivo PHP.
                'id_talla' => (int) $idTalla,
                // Línea 267: Línea necesaria para completar la operación de este archivo PHP.
                'talla' => $talla,
                // Línea 268: Línea necesaria para completar la operación de este archivo PHP.
                'stock' => (int) $stock
            // Línea 269: Cierra el bloque o estructura anterior.
            ];
        // Línea 270: Cierra el bloque o estructura anterior.
        }
    // Línea 271: Cierra el bloque o estructura anterior.
    }

    // Línea 273: Crea o modifica una variable con datos que se usarán después.
    $productos[] = [
        // Línea 274: Línea necesaria para completar la operación de este archivo PHP.
        'id' => (int) $row['id_producto'],
        // Línea 275: Línea necesaria para completar la operación de este archivo PHP.
        'nombre' => $row['nombre_producto'],
        // Línea 276: Línea necesaria para completar la operación de este archivo PHP.
        'categoria' => $row['tipo_producto'],
        // Línea 277: Línea necesaria para completar la operación de este archivo PHP.
        'descripcion' => $row['descripcion_producto'],
        // Línea 278: Línea necesaria para completar la operación de este archivo PHP.
        'precio' => (float) $row['precio_producto'],
        // Línea 279: Línea necesaria para completar la operación de este archivo PHP.
        'imagen' => $row['img_producto'] ? 'img/' . $row['img_producto'] : 'img/placeholder.svg',
        // Línea 280: Línea necesaria para completar la operación de este archivo PHP.
        'marca' => $row['marca'],
        // Línea 281: Línea necesaria para completar la operación de este archivo PHP.
        'proveedor' => $row['nombre_empresa'],
        // Línea 282: Línea necesaria para completar la operación de este archivo PHP.
        'tallas' => $sizes
    // Línea 283: Cierra el bloque o estructura anterior.
    ];
// Línea 284: Cierra el bloque o estructura anterior.
}

// Línea 286: Devuelve una respuesta JSON al JavaScript.
responderJson(true, '', ['productos' => $productos]);
