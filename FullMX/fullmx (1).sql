-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-05-2026 a las 15:06:12
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fullmx`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `nombre_cliente` varchar(200) DEFAULT NULL,
  `DNI` varchar(9) DEFAULT NULL,
  `correo_electronico` varchar(200) NOT NULL,
  `numero_telefono` int(9) NOT NULL,
  `contrasena` varchar(200) DEFAULT NULL,
  `direccion` varchar(300) NOT NULL,
  `ciudad` varchar(200) NOT NULL,
  `codigo_postal` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nombre_cliente`, `DNI`, `correo_electronico`, `numero_telefono`, `contrasena`, `direccion`, `ciudad`, `codigo_postal`) VALUES
(1, 'juan pablo', '56789031z', 'g.smario0209@gmail.com', 123456789, '$2y$10$zn2BoSFAcFRVcL7HJygJCedYDbrH69N9HsJiOqkue/EEkoQLF0at.', 'encinares 6', 'zafra', 6300),
(3, 'juan pablo', '56789231z', '123@gmail.com', 123456789, '$2y$10$Rep32RtRzbe5QSKMmHvhOOFKt0hO2ivKAWM4mUkvgcJvRPS3/p2yG', 'encinares 6', 'zafra', 6300),
(4, 'cliente1', '56789931z', 'cliente1@email.com', 123456789, '$2y$10$UOJ7O430Nu9hlpH61oRw4.OWFK4gWErSJ.KiBfHCKlfMDcoBEEGVS', 'encinares 6', 'zafra', 6300);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedidos`
--

CREATE TABLE `detalle_pedidos` (
  `id_detalle` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `id_talla` int(11) DEFAULT NULL,
  `talla` varchar(3) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio_total` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `detalle_pedidos`
--

INSERT INTO `detalle_pedidos` (`id_detalle`, `id_pedido`, `id_producto`, `id_talla`, `talla`, `cantidad`, `precio_total`) VALUES
(1, 1, 1, 3, 'm', 1, 199.99),
(2, 2, 1, 1, 'xs', 1, 199.99),
(3, 3, 1, 1, 'xs', 1, 199.99),
(4, 3, 4, 19, 'xs', 1, 256.23),
(5, 3, 7, 37, 'xs', 1, 256),
(6, 4, 4, 19, 'xs', 1, 256.23);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id_empleado` int(11) NOT NULL,
  `nombre_empleado` varchar(200) NOT NULL,
  `dni` varchar(9) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `numero_telefono` int(9) DEFAULT NULL,
  `correo_electronico` varchar(100) DEFAULT NULL,
  `contrasenia` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id_empleado`, `nombre_empleado`, `dni`, `fecha_nacimiento`, `numero_telefono`, `correo_electronico`, `contrasenia`) VALUES
(1, 'Jefe FullMX', '00000000A', '1990-01-01', 600000000, 'admin@jefe.fullmx.es', '$2y$12$71o3WUBsGzY707ZWvYpdT.mq/fxaPNX3I1KiS9GNli4cOTNXaVBiK'),
(3, 'empleado1', '12345678g', '2001-06-10', 123456789, 'empleado1@fullmx.es', '$2y$10$FbxMh/IQwT8hrm6hzFsnuuR38Ppd/ypF8lru7tBein3T3Ybg.3QEe');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `fecha_pedido` date DEFAULT curdate(),
  `direccion_envio` varchar(200) NOT NULL,
  `seguimiento` enum('pagado','enviado','entregado','cancelado') DEFAULT 'pagado',
  `precio_pedido` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id_pedido`, `id_cliente`, `fecha_pedido`, `direccion_envio`, `seguimiento`, `precio_pedido`) VALUES
(1, 1, '2026-05-19', 'encinares 6, zafra 6300', 'pagado', 199.99),
(2, 3, '2026-05-20', 'encinares 6, zafra 6300', 'pagado', 199.99),
(3, 4, '2026-05-21', 'encinares 6, zafra 6300', 'pagado', 712.22),
(4, 4, '2026-05-21', 'encinares 6, zafra 6300', 'pagado', 256.23);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `id_empleado` int(11) NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  `nombre_producto` varchar(200) NOT NULL,
  `img_producto` varchar(300) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `precio_producto` float NOT NULL,
  `tipo_producto` enum('cascos','botas','ropa','protecciones','accesorios') NOT NULL,
  `descripcion_producto` varchar(700) NOT NULL,
  `stock_producto` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `id_empleado`, `id_proveedor`, `nombre_producto`, `img_producto`, `marca`, `precio_producto`, `tipo_producto`, `descripcion_producto`, `stock_producto`) VALUES
(1, 1, 1, 'casco-airoh-aviator-3-6days-italia-color-azul-dorado-blanco (1).jpg', 'producto_6a0cc2d0104182.74105764.jpg', 'airoh', 199.99, 'cascos', 'casco-airoh-aviator-3-6days-italia-color-azul-dorado-blanco (1).jpg', 1),
(4, 3, 2, 'outlet-casco-airoh-aviator-ace-2-proud-color-azul-rojo-brillo (1).jpg', 'producto_6a0f37bf2eee61.62351648.jpg', 'airoh', 256.23, 'cascos', 'outlet-casco-airoh-aviator-ace-2-proud-color-azul-rojo-brillo (1).jpg', 1),
(7, 1, 2, 'botas-sidi-crossfire-3-srs-color-blanco.jpg', 'producto_6a0f3f9106b169.31545274.jpg', 'SIDI', 256, 'botas', 'botas-sidi-crossfire-3-srs-color-blanco.jpg', 1),
(8, 3, 2, 'botas-sidi-crossfire-3-srs-color-negro-negro .jpg', 'producto_6a0f40c2a56dc1.34499654.jpg', 'SIDI', 350, 'botas', 'botas-sidi-crossfire-3-srs-color-negro-negro .jpg', 1),
(9, 3, 1, 'camiseta-fox-180-ballast-color-negro-azul-liquidacionstock.jpg', 'producto_6a0f40e12ffb55.82834384.jpg', 'FOX', 28, 'ropa', 'camiseta-fox-180-ballast-color-negro-azul-liquidacionstock.jpg', 1),
(10, 3, 2, 'pantalones-fox-180-ballast-color-negro-azul-liquidacionstock.jpg', 'producto_6a0f410704e5d6.77266527.jpg', 'FOX', 45, 'ropa', 'pantalones-fox-180-ballast-color-negro-azul-liquidacionstock.jpg', 1),
(12, 3, 2, 'peto-integral-fox-titan-sport-color-negro.jpg', 'producto_6a0f41c7c5b741.38935706.jpg', 'FOX', 157, 'protecciones', 'peto-integral-fox-titan-sport-color-negro.jpg', 1),
(13, 3, 2, 'rodilleras-fox-titan-pro-d3o-color-negro.jpg', 'producto_6a0f41e29d29d9.87902047.jpg', 'FOX', 48, 'protecciones', 'rodilleras-fox-titan-pro-d3o-color-negro.jpg', 1),
(14, 3, 2, 'guantes-alpinestars-techstar-color-negro-azul.jpg', 'producto_6a0f4202723cd0.93658161.jpg', 'ALPINESTAR', 28, 'accesorios', 'guantes-alpinestars-techstar-color-negro-azul.jpg', 1),
(15, 3, 1, 'gafas-alpinestars-supertech-corp-absolute-vision-color-azul-naranja 1.jpg', 'producto_6a0f42296fe256.07205653.jpg', 'ALPINESTAR', 40, 'accesorios', 'gafas-alpinestars-supertech-corp-absolute-vision-color-azul-naranja 1.jpg', 1),
(16, 3, 1, 'casco-airoh-strycker-color-color-blanco-brillo.jpg', 'producto_6a0f4260342a06.21206852.jpg', 'airoh', 340, 'cascos', 'casco-airoh-strycker-color-color-blanco-brillo.jpg', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id_proveedor` int(11) NOT NULL,
  `nombre_empresa` varchar(100) NOT NULL,
  `nombre_contacto` varchar(200) NOT NULL,
  `numero_telefono` int(9) DEFAULT NULL,
  `correo_electronio` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id_proveedor`, `nombre_empresa`, `nombre_contacto`, `numero_telefono`, `correo_electronio`) VALUES
(1, 'vivan_las_motos', '123456789', 123456789, 'vivanlasmotos@gmail.com'),
(2, 'motorshow', 'perico', 123456789, 'motorshow@email.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tallas`
--

CREATE TABLE `tallas` (
  `id_talla` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `talla` varchar(3) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tallas`
--

INSERT INTO `tallas` (`id_talla`, `id_producto`, `talla`, `stock`) VALUES
(1, 1, 'xs', 4),
(2, 1, 's', 10),
(3, 1, 'm', 4),
(4, 1, 'l', 5),
(5, 1, 'xl', 5),
(6, 1, '2xl', 5),
(19, 4, 'xs', 3),
(20, 4, 's', 5),
(21, 4, 'm', 5),
(22, 4, 'l', 5),
(23, 4, 'xl', 0),
(24, 4, '2xl', 0),
(37, 7, 'xs', 4),
(38, 7, 's', 7),
(39, 7, 'm', 6),
(40, 7, 'l', 4),
(41, 7, 'xl', 5),
(42, 7, '2xl', 5),
(43, 8, 'xs', 5),
(44, 8, 's', 5),
(45, 8, 'm', 5),
(46, 8, 'l', 5),
(47, 8, 'xl', 5),
(48, 8, '2xl', 5),
(49, 9, 'xs', 5),
(50, 9, 's', 5),
(51, 9, 'm', 5),
(52, 9, 'l', 5),
(53, 9, 'xl', 5),
(54, 9, '2xl', 5),
(55, 10, 'xs', 6),
(56, 10, 's', 6),
(57, 10, 'm', 6),
(58, 10, 'l', 6),
(59, 10, 'xl', 6),
(60, 10, '2xl', 6),
(67, 12, 'xs', 4),
(68, 12, 's', 5),
(69, 12, 'm', 5),
(70, 12, 'l', 5),
(71, 12, 'xl', 5),
(72, 12, '2xl', 5),
(73, 13, 'xs', 5),
(74, 13, 's', 5),
(75, 13, 'm', 5),
(76, 13, 'l', 5),
(77, 13, 'xl', 5),
(78, 13, '2xl', 5),
(79, 14, 'xs', 5),
(80, 14, 's', 5),
(81, 14, 'm', 5),
(82, 14, 'l', 5),
(83, 14, 'xl', 5),
(84, 14, '2xl', 5),
(85, 15, 'xs', 5),
(86, 15, 's', 5),
(87, 15, 'm', 5),
(88, 15, 'l', 5),
(89, 15, 'xl', 5),
(90, 15, '2xl', 5),
(91, 16, 'xs', 0),
(92, 16, 's', 0),
(93, 16, 'm', 0),
(94, 16, 'l', 0),
(95, 16, 'xl', 0),
(96, 16, '2xl', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`),
  ADD UNIQUE KEY `correo_electronico` (`correo_electronico`),
  ADD UNIQUE KEY `DNI` (`DNI`);

--
-- Indices de la tabla `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_talla` (`id_talla`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id_empleado`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `correo_electronico` (`correo_electronico`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_empleado` (`id_empleado`),
  ADD KEY `id_proveedor` (`id_proveedor`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id_proveedor`);

--
-- Indices de la tabla `tallas`
--
ALTER TABLE `tallas`
  ADD PRIMARY KEY (`id_talla`),
  ADD KEY `id_producto` (`id_producto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id_proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tallas`
--
ALTER TABLE `tallas`
  MODIFY `id_talla` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  ADD CONSTRAINT `detalle_pedidos_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON DELETE CASCADE,
  ADD CONSTRAINT `detalle_pedidos_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  ADD CONSTRAINT `detalle_pedidos_ibfk_3` FOREIGN KEY (`id_talla`) REFERENCES `tallas` (`id_talla`) ON DELETE SET NULL;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`),
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id_proveedor`);

--
-- Filtros para la tabla `tallas`
--
ALTER TABLE `tallas`
  ADD CONSTRAINT `tallas_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
