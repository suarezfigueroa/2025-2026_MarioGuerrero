# Manual de Usuario - FULL MX

---

# Índice

1. [Introducción](#1-introducción)  
2. [Acceso a la aplicación](#2-acceso-a-la-aplicación)  
3. [Página principal](#3-página-principal)  
4. [Navegación por categorías](#4-navegación-por-categorías)  
5. [Buscador de productos](#5-buscador-de-productos)  
6. [Carrito de compra](#6-carrito-de-compra)  
7. [Registro de usuarios](#7-registro-de-usuarios)  
8. [Inicio de sesión](#8-inicio-de-sesión)  
9. [Manual de usuario cliente](#9-manual-de-usuario-cliente)  
10. [Manual de usuario empleado](#10-manual-de-usuario-empleado)  
11. [Manual de usuario administrador](#11-manual-de-usuario-administrador)  
12. [Gestión de productos](#12-gestión-de-productos)  
13. [Gestión de stock](#13-gestión-de-stock)  
14. [Gestión de pedidos](#14-gestión-de-pedidos)  
15. [Política de privacidad y contacto](#15-política-de-privacidad-y-contacto)  
16. [Cierre de sesión](#16-cierre-de-sesión)  
17. [Recomendaciones de uso](#17-recomendaciones-de-uso)  
18. [Posibles errores y soluciones](#18-posibles-errores-y-soluciones)  

---

# 1. Introducción

El presente manual de usuario tiene como objetivo explicar el funcionamiento general de la aplicación web FULL MX, desarrollada como plataforma de comercio electrónico especializada en productos y equipación de motocross.

A lo largo de este documento se describen las principales funcionalidades disponibles para cada tipo de usuario, así como los diferentes apartados de la plataforma y el funcionamiento de sus herramientas principales.

La aplicación ha sido diseñada con una interfaz moderna, intuitiva y dinámica, permitiendo que cualquier usuario pueda navegar y utilizar la plataforma de forma sencilla.

---

# 2. Acceso a la aplicación

Para acceder a la aplicación es necesario abrir un navegador web compatible e introducir la dirección local o dominio donde se encuentre desplegado el proyecto.

Ejemplo:

```txt
http://localhost/FullMX/index.html
```

Una vez cargada la página principal, el usuario podrá navegar libremente por las distintas categorías o acceder a las funciones de inicio de sesión y carrito de compra.

---

# 3. Página principal

La página principal actúa como punto de entrada de la aplicación.

Desde ella el usuario puede acceder a:

- Categorías de productos.
- Buscador dinámico.
- Carrito de compra.
- Inicio de sesión.
- Información de contacto.
- Política de privacidad.

La interfaz principal utiliza colores corporativos relacionados con el motocross:

- Rojo.
- Blanco.
- Negro.

Además, incorpora animaciones y efectos visuales para mejorar la experiencia de usuario.

---

![Logo FULL MX](img/pagPrincipal.png)

---

# 4. Navegación por categorías

La plataforma organiza los productos en distintas categorías para facilitar la navegación del usuario.

Las categorías disponibles son:

- Cascos.
- Botas.
- Ropa.
- Protecciones.
- Accesorios.

Al pulsar sobre cualquier categoría, la aplicación mostrará automáticamente todos los productos relacionados.

Cada producto incluye:

- Imagen.
- Nombre.
- ID producto.
- Descripción.
- Precio.
- Tallas disponibles.
- Botón de añadir al carrito.

---

![Logo FULL MX](img/cascos.png)

---

# 5. Buscador de productos

La aplicación incorpora un buscador dinámico situado en la parte superior del header.

Este buscador permite localizar productos introduciendo palabras clave relacionadas con:

- Nombre del producto.
- Descripción.
- Categoría.

El sistema actualiza automáticamente los resultados encontrados.

---

## Funcionamiento del buscador

1. Introducir texto en el buscador.
2. Pulsar Enter o esperar actualización automática.
3. La aplicación mostrará productos relacionados.

---

![Logo FULL MX](img/fox.png)


---

# 6. Carrito de compra

La aplicación incorpora un carrito lateral dinámico donde se almacenan los productos seleccionados por el usuario.

---

## Funcionalidades disponibles

El carrito permite:

- Añadir productos.
- Seleccionar talla.
- Modificar cantidades.
- Eliminar productos.
- Visualizar precio total.
- Confirmar compra.

---

## Modificación de cantidades

Cada producto dispone de:

- Botón “+”.
- Botón “-”.
- Indicador numérico de cantidad.

Esto permite modificar fácilmente la cantidad de productos deseada.

---

## Confirmar pedido

Para realizar una compra es necesario:

1. Tener sesión iniciada como cliente.
2. Añadir productos al carrito.
3. Pulsar el botón de compra.

---

![Logo FULL MX](img/carrito.png)

---

# 7. Registro de usuarios

La aplicación permite registrar nuevos clientes desde la página de registro.

---

## Información solicitada

El formulario solicita:

- Nombre.
- Apellidos.
- Correo electrónico.
- Contraseña.
- Dirección.
- Teléfono.

---

## Restricciones

Los usuarios normales no pueden registrarse utilizando correos:

```txt
@fullmx.es
```

ni:

```txt
@jefe.fullmx.es
```

ya que estos dominios están reservados para empleados y administradores.

---

## Funcionamiento

1. Rellenar formulario.
2. Pulsar botón “Registrarse”.
3. La aplicación almacenará automáticamente el usuario.

Las contraseñas se almacenan cifradas mediante hash.

---

![Logo FULL MX](img/registroCliente.png)

---

# 8. Inicio de sesión

El sistema de login permite acceder a la aplicación según el rol del usuario.

---

## Tipos de usuario

| Tipo usuario | Acceso |
|---|---|
| Cliente | Compras y pedidos |
| Empleado | Gestión productos |
| Administrador | Gestión completa |

---

## Funcionamiento

1. Introducir correo y contraseña.
2. Pulsar “Iniciar sesión”.
3. El sistema validará automáticamente el usuario.

Dependiendo del tipo de cuenta:

- Cliente → sesiónCliente.html
- Empleado → sesiónEmpleado.html
- Administrador → sesionJefe.html

---

![Logo FULL MX](img/iniciaSesion.png)

---

# 9. Manual de usuario cliente

Los clientes disponen de distintas herramientas relacionadas con compras y gestión de pedidos.

---

### Zona cliente : 

![Logo FULL MX](img/zonaCliente.png)

---

## Mi cuenta

Desde el apartado “Mi cuenta” el usuario puede consultar:

- Nombre.
- Correo.
- Dirección.
- Teléfono.

---

![Logo FULL MX](img/datosClientes.png)

---

## Mis pedidos

El apartado “Mis pedidos” permite visualizar todas las compras realizadas.

Cada pedido muestra:

- ID pedido.
- Fecha.
- Precio total.

Además, cada pedido dispone del botón:

---
![Logo FULL MX](img/pedidosCliente.png)

---

## Detalle pedido

Al pulsar el botón aparece un popup dinámico mostrando:

- Imagen producto.
- Nombre.
- Cantidad.
- Precio.
- Total pedido.

---

![Logo FULL MX](img/detallePedido.png)

---
## Hacer un pedido

 - Tendra que añadir los productos que desee al carrito
 - Entrar en el carrito, y pulsar en el botón comprar
 - El pedido se efectuará y aparecerá en el apartado "Mis pedidos"


---

# 10. Manual de usuario empleado

Los empleados disponen de herramientas relacionadas con la gestión de productos y stock.

---

## Funciones disponibles

Los empleados pueden:

- Buscar pedidos.
- Mostrar datos personales.
- Subir productos.
- Actualizar stock.
- Borrar productos.

---

![Logo FULL MX](img/zonaEmpleado.png)


---

## Buscar pedidos

Permite actualizar las cantidades disponibles de cada talla.

---

## Funcionamiento

1. Introducir ID del pedido, nombre o el dni del cliente.
2. pulsa buscar.
3. Muestra todo lo relacionado con o que hayas introducido.

---

![Logo FULL MX](img/buscarPedido.png)

---
## Mostrar Empleado

Desde el apartado “Mi cuenta” el usuario puede consultar:

- id.
- dni.
- Nombre.
- Correo.
- fecha nacimiento.
- Teléfono.

---

![Logo FULL MX](img/mostrarEmpleado.png)

---
## Subir producto

Permite subir un producto nuevo, subiendo también las cantidades disponibles de cada talla.
también permite introducir un nuevo proveedor.

---

## Funcionamiento

1. Introducir nombre producto.
2. Introducir marca producto.
3. seleccionar proveedor.
4. seleccionar categoria del producto.
5. Poner precio del producto
6. Seleccionar imagen del producto.
7. poner cantidades de cada talla disponible.

---

![Logo FULL MX](img/subirProducto.png)

---
## Actualizar producto

Permite actualizar las cantidades disponibles de cada talla.

---

## Funcionamiento

1. Introducir ID producto.
2. Buscar producto.
3. Modificar cantidades.
4. Guardar cambios.

---
![Logo FULL MX](img/actualizarProducto.png)

---

## Borrar producto

Permite eliminar productos mediante ID.

---

## Funcionamiento

1. Introducir ID producto.
2. Buscar producto.
3. Pulsar botón “Borrar”.

---

![Logo FULL MX](img/borrarProducto.png)

---

# 11. Manual de usuario administrador

El administrador dispone de control completo sobre la plataforma.

---

## Funciones disponibles

El administrador puede:

- Buscar Pedido.
- Mostrar jefe.
- subir Producto.
- Crear empleados.
- Borrar empleados.
- Registrar cliente.
- Actualizar producto.
- Borrar producto.

En resumen, a parte de implemetar todas las acciones que puede hacer un empleado, también
implementa las siguientes acciones: crear empleado, borrar empleado y registrar cliente.

---

Imagen: Panel principal del administrador.

---

## Crear empleado

Permite registrar nuevos trabajadores dentro de la plataforma.

---

## Información solicitada

- Nombre.
- dni.
- Correo electrónico corporativo.
- fecha de nacimiento.
- telefono.
- Contraseña.

---

![Logo FULL MX](img/crearEmpleado.png)

---

## Borrar empleado

Permite eliminar trabajadores mediante:

- ID o DNI empleado.
- Buscar empleado.
- borrar empleado.

---

![Logo FULL MX](img/BorrarEmpleado.png)

---
## Registrar cliente

Permite eliminar trabajadores mediante:

- Formulario similar al de crear cuenta cliente, que esta en el apartado de iniciar sesion.

---

![Logo FULL MX](img/creaClienteJefe.png)

---

# 12. Gestión de productos

Los productos se gestionan dinámicamente desde la base de datos.

---

## Información mostrada

Cada producto incluye:

- Imagen.
- Nombre.
- Descripción.
- Precio.
- Tallas.
- ID producto.

---

## Gestión de tallas

Las tallas disponibles se actualizan automáticamente según el stock almacenado.

---

# 13. Gestión de stock

La aplicación incorpora un sistema de stock por tallas.

Cuando todas las tallas llegan a 0:

```txt
stock_producto = 0
```

El producto deja de mostrarse como disponible.

---


# 14. Gestión de pedidos

El sistema registra automáticamente todos los pedidos realizados.

---

## Información almacenada

- Cliente.
- Productos.
- Cantidades.
- Fecha.
- Precio total.

---

## Visualización de pedidos

Los pedidos pueden visualizarse:

- Desde cliente.
- Desde empleado.
- Desde administrador.

---

# 15. Política de privacidad y contacto

La aplicación incorpora:

- Popup contacto.
- Página política privacidad.

---

## Contacto

El popup contacto muestra:

- Teléfono.
- Correo electrónico.

---

![Logo FULL MX](img/botonContacto.png)

---

## Política de privacidad

La política de privacidad explica:

- Uso de datos.
- Protección información.
- Derechos usuarios.

---

![Logo FULL MX](img/politicaPrivacidad.png)

---

# 16. Cierre de sesión

La aplicación permite cerrar sesión en cualquier momento.

---

## Funcionamiento

1. Pulsar icono usuario.
2. Seleccionar cerrar sesión.
3. La sesión se eliminará automáticamente.

---


# 17. Recomendaciones de uso

Para un correcto funcionamiento se recomienda:

- Utilizar navegadores actualizados.
- Mantener conexión estable.
- No cerrar Apache/MySQL mientras se utiliza la aplicación.
- Mantener la base de datos correctamente importada.

---

# 18. Posibles errores y soluciones

| Problema | Posible solución |
|---|---|
| No carga la página | Verificar Apache |
| No conecta base datos | Revisar .env |
| Productos no aparecen | Verificar stock |
| Error login | Revisar usuario y contraseña |
| No funciona carrito | Revisar JavaScript |

---