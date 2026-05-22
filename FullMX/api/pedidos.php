<?php
/**
 * DOCUMENTACIÓN DEL ARCHIVO
 * Gestiona pedidos.
 * Crea pedidos desde el carrito del cliente, descuenta stock de tallas y recalcula stock_producto.
 * Permite al cliente ver sus pedidos y al empleado/jefe buscar pedidos.
 * Usa transacciones para que pedido y stock queden coherentes.
 */
// Línea 17: Carga otro archivo PHP necesario para que este funcione.
require_once 'conexion.php';

// Acción solicitada desde JavaScript mediante el parámetro action.
// Línea 20: Crea o modifica una variable con datos que se usarán después.
$action = $_GET['action'] ?? '';

/**
 * Sincroniza el campo stock_producto según el stock total de tallas.
 */
/* Función actualizarStockDelProductoPedido: separa una tarea concreta para reutilizarla dentro de este PHP. */
function actualizarStockDelProductoPedido(PDO $pdo, int $productId): void
{
    $stmt = $pdo->prepare('SELECT COALESCE(SUM(stock), 0) FROM tallas WHERE id_producto = ?');
    $stmt->execute([$productId]);
    $total = (int) $stmt->fetchColumn();

    $stmt = $pdo->prepare('UPDATE productos SET stock_producto = ? WHERE id_producto = ?');
    $stmt->execute([$total > 0 ? 1 : 0, $productId]);
}

if ($action === 'create') {
    comprobarRoles(['cliente']);

    $data = leerDatosJson();
    $items = $data['items'] ?? [];

    if (!is_array($items) || count($items) === 0) {
        responderJson(false, 'El carrito está vacío.');
    }

    try {
        $pdo->beginTransaction();
        $total = 0;
        $validatedItems = [];

        foreach ($items as $item) {
            $productId = (int) ($item['id'] ?? 0);
            $sizeId = (int) ($item['id_talla'] ?? 0);
            $quantity = max(1, (int) ($item['cantidad'] ?? 1));

            $stmt = $pdo->prepare(
                'SELECT p.id_producto, p.nombre_producto, p.precio_producto, t.id_talla, t.talla, t.stock
                 FROM productos p
                 INNER JOIN tallas t ON t.id_producto = p.id_producto
                 WHERE p.id_producto = ? AND t.id_talla = ? AND p.stock_producto = 1
                 LIMIT 1'
            );
            $stmt->execute([$productId, $sizeId]);
            $product = $stmt->fetch();

            if (!$product) {
                throw new Exception('Uno de los productos o tallas no existe.');
            }

            if ((int) $product['stock'] < $quantity) {
                throw new Exception('No hay stock suficiente de ' . $product['nombre_producto'] . ' en talla ' . strtoupper($product['talla']) . '.');
            }

            $lineTotal = (float) $product['precio_producto'] * $quantity;
            $total += $lineTotal;
            $validatedItems[] = ['producto' => $product, 'cantidad' => $quantity, 'lineTotal' => $lineTotal];
        }

        $address = trim($_SESSION['user']['direccion'] . ', ' . $_SESSION['user']['ciudad'] . ' ' . $_SESSION['user']['codigo_postal']);
        $stmt = $pdo->prepare('INSERT INTO pedidos (id_cliente, fecha_pedido, direccion_envio, seguimiento, precio_pedido) VALUES (?, CURRENT_DATE, ?, "pagado", ?)');
        $stmt->execute([$_SESSION['user']['id'], $address, $total]);
        $orderId = (int) $pdo->lastInsertId();

        foreach ($validatedItems as $line) {
            $product = $line['producto'];
            $quantity = $line['cantidad'];

            $stmt = $pdo->prepare(
                'INSERT INTO detalle_pedidos (id_pedido, id_producto, id_talla, talla, cantidad, precio_total)
                 VALUES (?, ?, ?, ?, ?, ?)'
            );
            $stmt->execute([
                $orderId,
                $product['id_producto'],
                $product['id_talla'],
                $product['talla'],
                $quantity,
                $line['lineTotal']
            ]);

            $stmt = $pdo->prepare('UPDATE tallas SET stock = stock - ? WHERE id_talla = ?');
            $stmt->execute([$quantity, $product['id_talla']]);
            actualizarStockDelProductoPedido($pdo, (int) $product['id_producto']);
        }

        $pdo->commit();
        responderJson(true, 'Pedido realizado correctamente.');
    } catch (Exception $exception) {
        $pdo->rollBack();
        responderJson(false, $exception->getMessage());
    }
}

if ($action === 'misPedidos') {
    comprobarRoles(['cliente']);

    $stmt = $pdo->prepare('SELECT * FROM pedidos WHERE id_cliente = ? ORDER BY id_pedido DESC');
    $stmt->execute([$_SESSION['user']['id']]);
    responderJson(true, '', ['pedidos' => $stmt->fetchAll()]);
}


if ($action === 'detalle') {
    // Solo un cliente puede ver el detalle de sus propios pedidos desde su cuenta.
    comprobarRoles(['cliente']);

    // Recibimos el ID por GET porque el botón de detalle hace una consulta sencilla.
    $idPedido = (int) ($_GET['id'] ?? 0);

    if ($idPedido <= 0) {
        responderJson(false, 'Pedido no válido.', [], 400);
    }

    // Primero comprobamos que el pedido pertenece al cliente que tiene la sesión iniciada.
    $stmt = $pdo->prepare(
        'SELECT id_pedido, fecha_pedido, seguimiento, precio_pedido
         FROM pedidos
         WHERE id_pedido = ? AND id_cliente = ?
         LIMIT 1'
    );
    $stmt->execute([$idPedido, $_SESSION['user']['id']]);
    $pedido = $stmt->fetch();

    if (!$pedido) {
        responderJson(false, 'No se encontró el pedido o no pertenece a tu cuenta.', [], 404);
    }

    // Después cargamos cada línea del pedido con los datos del producto comprado.
    $stmt = $pdo->prepare(
        'SELECT d.id_detalle,
                d.id_producto,
                d.talla,
                d.cantidad,
                d.precio_total,
                p.nombre_producto,
                p.img_producto
         FROM detalle_pedidos d
         INNER JOIN productos p ON p.id_producto = d.id_producto
         WHERE d.id_pedido = ?
         ORDER BY d.id_detalle ASC'
    );
    $stmt->execute([$idPedido]);
    $detalle = $stmt->fetchAll();

    // Formateamos las líneas para que JavaScript reciba nombres claros y rutas listas para pintar.
    $detalleFormateado = array_map(function ($linea) {
        return [
            'id_producto' => (int) $linea['id_producto'],
            'nombre' => $linea['nombre_producto'],
            'imagen' => 'img/' . $linea['img_producto'],
            'talla' => $linea['talla'],
            'cantidad' => (int) $linea['cantidad'],
            'precio_total' => (float) $linea['precio_total']
        ];
    }, $detalle);

    // Calculamos el total desde las líneas por seguridad y usamos el total del pedido como respaldo.
    $total = array_reduce($detalleFormateado, function ($suma, $linea) {
        return $suma + (float) $linea['precio_total'];
    }, 0.0);

    responderJson(true, '', [
        'pedido' => $pedido,
        'detalle' => $detalleFormateado,
        'total' => $total > 0 ? $total : (float) $pedido['precio_pedido']
    ]);
}

if ($action === 'buscar') {
    comprobarRoles(['empleado', 'jefe']);

    $query = '%' . trim($_GET['q'] ?? '') . '%';
    $stmt = $pdo->prepare(
        'SELECT p.id_pedido, p.fecha_pedido, p.precio_pedido, p.seguimiento,
                c.nombre_cliente AS cliente, c.DNI AS dni
         FROM pedidos p
         INNER JOIN cliente c ON c.id_cliente = p.id_cliente
         WHERE CAST(p.id_pedido AS CHAR) LIKE ?
            OR c.DNI LIKE ?
            OR c.nombre_cliente LIKE ?
         ORDER BY p.id_pedido DESC'
    );
    $stmt->execute([$query, $query, $query]);

    responderJson(true, '', ['pedidos' => $stmt->fetchAll()]);
}

responderJson(false, 'Acción no válida.', [], 400);
