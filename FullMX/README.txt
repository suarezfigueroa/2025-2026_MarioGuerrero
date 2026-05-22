USUARIOS
Usuario jefe:
usuario : admin@jefe.fullmx.es
Contraseña : jefe1234

usuario y contraseña cliente : cliente1@email.com

usuario y contraseña, es el mismo para los dos, empleado: empleado1@fullmx.es

PASOS PARA PROBAR EN XAMPP

1. Copia la carpeta FullMx dentro de htdocs.
2. Abre phpMyAdmin.
3. Importa el archivo fullmx.sql.
4. Abre en el archivo index.html
5. Inicia sesión.
6. Desde la zona jefe puedes crear empleados y registrar clientes.
7. Desde empleado o jefe puedes crear proveedores y subir productos, modificar stock de productos y borrar productos.
8. Al subir un producto, indica el stock de cada talla.
9. En la tienda solo se muestran productos con al menos una talla con stock.
10. Si todas las tallas llegan a 0, stock_producto se actualiza automáticamente a 0 y el producto deja de verse, 
por lo que no se podria vender.
