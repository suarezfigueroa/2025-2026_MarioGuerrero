<div align="center">

![Logo Centro](img/logocentro.png)

# I.E.S. Suarez de Figueroa
## Desarrollo de Aplicaciones Web (DAW)

![Logo FULL MX](img/FULLMXBLANCO.png)

# FULL MX  
## Plataforma web de venta de productos y equipación de motocross

<br>

##### Autor del proyecto :  
Mario Guerrero Salinero
##### Tutor del proyecto :
Jose Andrés Paredes Arribas
##### Fecha de presentación  
27 de mayo de 2026
##### Repositorio GitHub :  
https://github.com/suarezfigueroa/2025-2026_MarioGuerrero/tree/main/FullMX

</div>

---

<br>


# 2. Índice

## 1. [Portada](#1-portada)

## 2. [Índice](#2-índice)

## 3. [Introducción](#3-introducción)

- 3.1 [Contexto del proyecto](#31-contexto-del-proyecto)
- 3.2 [Finalidad de la aplicación](#32-finalidad-de-la-aplicación)
- 3.3 [Descripción general del sistema](#33-descripción-general-del-sistema)

---

## 4. [Objetivos del proyecto](#4-objetivos-del-proyecto)

- 4.1 [Objetivo principal](#41-objetivo-principal)
- 4.2 [Objetivos técnicos](#42-objetivos-técnicos)
- 4.3 [Objetivos funcionales](#43-objetivos-funcionales)
- 4.4 [Objetivos visuales y de experiencia de usuario](#44-objetivos-visuales-y-de-experiencia-de-usuario)
- 4.5 [Objetivos académicos](#45-objetivos-académicos)

---

## 5. [Justificación del proyecto](#5-justificación-del-proyecto)

- 5.1 [Análisis de mercado](#51-análisis-de-mercado)
- 5.2 [Necesidad detectada](#52-necesidad-detectada)
- 5.3 [Vinculación con los contenidos del ciclo formativo](#53-vinculación-con-los-contenidos-del-ciclo-formativo)
- 5.4 [Motivación personal](#54-motivación-personal)
- 5.5 [Valor aportado por la aplicación](#55-valor-aportado-por-la-aplicación)

---

## 6. [Recursos utilizados](#6-recursos-utilizados)

- 6.1 [Entornos de desarrollo](#61-entornos-de-desarrollo)
- 6.2 [Lenguajes utilizados](#62-lenguajes-utilizados)
- 6.3 [Herramientas y utilidades externas](#63-herramientas-y-utilidades-externas)
- 6.4 [Recursos gráficos](#64-recursos-gráficos)
- 6.5 [Organización de recursos del proyecto](#65-organización-de-recursos-del-proyecto)

---

## 7. [Tecnologías de desarrollo](#7-tecnologías-de-desarrollo)

- 7.1 [Tecnologías frontend](#71-tecnologías-frontend)
- 7.2 [Tecnologías backend](#72-tecnologías-backend)
- 7.3 [Base de datos MySQL](#73-base-de-datos-mysql)
- 7.4 [Comunicación cliente-servidor](#74-comunicación-cliente-servidor)
- 7.5 [Seguridad implementada](#75-seguridad-implementada)
- 7.6 [Valoración final de las tecnologías utilizadas](#76-valoración-final-de-las-tecnologías-utilizadas)

---

## 8. [Diseño del proyecto](#8-diseño-del-proyecto)

- 8.1 [Diseño de la base de datos](#81-diseño-de-la-base-de-datos)
- 8.2 [Modelo relacional](#82-modelo-relacional)
- 8.3 [Diseño de la interfaz de usuario](#83-diseño-de-la-interfaz-de-usuario)
- 8.4 [Roles de la aplicación](#84-roles-de-la-aplicación)
- 8.5 [Usuarios creados para pruebas](#85-usuarios-creados-para-pruebas)
- 8.6 [Arquitectura general del proyecto](#86-arquitectura-general-del-proyecto)

---

## 9. [Lógica y codificación del proyecto](#9-lógica-y-codificación-del-proyecto)

- 9.1 [Arquitectura general de funcionamiento](#91-arquitectura-general-de-funcionamiento)
- 9.2 [Principales procesos del sistema](#92-principales-procesos-del-sistema)
- 9.3 [Gestión de usuarios y sesiones](#93-gestión-de-usuarios-y-sesiones)
- 9.4 [Gestión de productos y stock](#94-gestión-de-productos-y-stock)
- 9.5 [Gestión del carrito y pedidos](#95-gestión-del-carrito-y-pedidos)
- 9.6 [Validación de datos](#96-validación-de-datos)
- 9.7 [Organización y documentación del código](#97-organización-y-documentación-del-código)

---

## 10. [Despliegue web del proyecto](#10-despliegue-web-del-proyecto)

- 10.1 [Entorno de despliegue utilizado](#101-entorno-de-despliegue-utilizado)
- 10.2 [Requisitos hardware y software](#102-requisitos-hardware-y-software)
- 10.3 [Proceso de despliegue](#103-proceso-de-despliegue)
- 10.4 [Configuración de seguridad](#104-configuración-de-seguridad)
- 10.5 [Posible despliegue futuro en producción](#105-posible-despliegue-futuro-en-producción)

---

## 11. [Manual de usuario](#11-manual-de-usuario)

---

## 12. [Conclusiones y aspectos a mejorar](#12-conclusiones-y-aspectos-a-mejorar)

- 12.1 [Valoración general del proyecto](#121-valoración-general-del-proyecto)
- 12.2 [Dificultades encontradas](#122-dificultades-encontradas)
- 12.3 [Aprendizajes obtenidos](#123-aprendizajes-obtenidos)
- 12.4 [Aspectos a mejorar](#124-aspectos-a-mejorar)
- 12.5 [Valoración final](#125-valoración-final)

---

## 13. [Bibliografía](#13-bibliografía)

---

## 14. [Anexos](#14-anexos)

- 14.1 [Anexo I — Estructura del proyecto](#141-anexo-i--estructura-del-proyecto)
- 14.2 [Anexo II — Capturas de la aplicación](#142-anexo-ii--capturas-de-la-aplicación)

---

# 3. Introducción

FULL MX es una aplicación web desarrollada como Proyecto Final del Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Web. El proyecto consiste en el diseño, desarrollo e implementación de una plataforma de comercio electrónico especializada en la venta de productos, accesorios y equipación relacionada con el motocross. La finalidad principal de la aplicación es simular el funcionamiento de una tienda online real, integrando tanto la parte visual que utiliza el usuario final como la lógica interna necesaria para gestionar usuarios, productos, pedidos y stock.

El proyecto nace de la necesidad de crear una aplicación completa que reúna en un mismo sistema diferentes áreas del desarrollo web. A lo largo del desarrollo se han trabajado aspectos relacionados con la programación en entorno cliente, la programación en entorno servidor, la gestión de bases de datos, el diseño responsive, la seguridad básica y el despliegue de aplicaciones web. FULL MX no se limita a mostrar una página estática, sino que incorpora funcionalidades dinámicas que permiten interactuar con la base de datos y modificar el estado de la aplicación según las acciones realizadas por cada usuario.

La temática elegida está relacionada con el motocross y los deportes offroad, un sector en el que la imagen visual, la organización del catálogo y la facilidad de compra resultan especialmente importantes. Por ello, la aplicación ha sido diseñada con una estética deportiva, utilizando colores llamativos y una estructura visual orientada a ofrecer una experiencia moderna y clara. La plataforma permite navegar por distintas categorías de productos, consultar artículos disponibles, seleccionar tallas, añadir productos al carrito y realizar pedidos.

Además, la aplicación incorpora un sistema de usuarios basado en roles. Esta característica permite diferenciar claramente las acciones disponibles para cada tipo de usuario. Un cliente puede comprar productos y consultar sus pedidos, mientras que un empleado puede gestionar productos y stock. Por otro lado, el usuario administrador o jefe dispone de herramientas adicionales para administrar empleados y controlar de forma más completa el funcionamiento interno de la tienda.

Desde el punto de vista técnico, uno de los aspectos más importantes del proyecto ha sido mantener una separación clara entre frontend y backend. La parte frontend se encarga de la interfaz visual y de la interacción con el usuario, mientras que la parte backend procesa las peticiones, consulta la base de datos y devuelve la información necesaria para actualizar la aplicación. Esta separación facilita el mantenimiento del proyecto y permite que futuras ampliaciones puedan realizarse de forma más ordenada.

---

![Logo FULL MX](img/paginaPrincipal.png)

---

## 3.1 Contexto del proyecto

El proyecto se desarrolla dentro del marco académico del Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Web. A través de FULL MX se pretende demostrar la capacidad para desarrollar una aplicación web funcional, organizada y conectada a una base de datos, aplicando conocimientos adquiridos durante los diferentes módulos del ciclo.

Durante el ciclo se trabajan tecnologías y conceptos fundamentales para el desarrollo de aplicaciones web modernas. FULL MX permite reunir estos conocimientos dentro de un proyecto práctico, donde cada parte cumple una función concreta. El frontend se ha desarrollado utilizando HTML, CSS y JavaScript, mientras que el backend se ha implementado mediante PHP y MySQL. Esta combinación permite construir una aplicación completa, capaz de mostrar información dinámica y responder a las acciones del usuario.

El contexto del proyecto también está relacionado con la evolución actual del comercio electrónico. Cada vez más usuarios realizan compras online y esperan que las plataformas sean rápidas, claras y fáciles de utilizar. Por ello, el proyecto intenta reproducir algunas de las características habituales en tiendas online reales, como el carrito dinámico, la organización por categorías, el control de stock, la gestión de pedidos y la autenticación de usuarios.

A nivel académico, este proyecto permite trabajar una visión completa del desarrollo web. No solo se desarrolla la parte visual, sino también la lógica interna, la base de datos y la organización del código. Esto hace que FULL MX sea un proyecto adecuado para demostrar competencias técnicas reales y capacidad para estructurar una aplicación de cierta complejidad.

---

## 3.2 Finalidad de la aplicación

La finalidad principal de FULL MX es ofrecer una plataforma web capaz de gestionar una tienda online especializada en productos de motocross. La aplicación permite que los usuarios naveguen por el catálogo, busquen productos, consulten información de cada artículo, seleccionen tallas disponibles y añadan productos al carrito de compra.

Además de la parte orientada al cliente, FULL MX incluye herramientas de gestión interna. Estas herramientas permiten a empleados y administradores realizar tareas relacionadas con la actualización de productos, control de stock, consulta de pedidos y administración de usuarios. De esta forma, el proyecto no solo representa una tienda online desde el punto de vista del comprador, sino también desde la perspectiva de gestión interna del negocio.

La aplicación también tiene como finalidad demostrar una correcta integración entre interfaz, lógica de negocio y persistencia de datos. Cada producto, pedido, usuario y talla se gestiona desde una base de datos relacional, lo que permite almacenar información de forma organizada y consultarla cuando sea necesario. Esta estructura aporta realismo al proyecto y permite simular procesos habituales dentro de una tienda online real.

---

## 3.3 Descripción general del sistema

El sistema se encuentra organizado mediante diferentes partes que trabajan conjuntamente. La interfaz visual permite al usuario interactuar con la plataforma. JavaScript gestiona eventos, actualiza elementos de la página y realiza peticiones al backend. PHP procesa esas peticiones, consulta la base de datos y devuelve respuestas. MySQL almacena la información persistente del sistema.

Esta estructura permite que la aplicación tenga un comportamiento dinámico. Por ejemplo, cuando un usuario busca un producto, añade un artículo al carrito o consulta sus pedidos, la aplicación puede actualizar la información mostrada sin necesidad de recargar completamente la página. Este comportamiento mejora la experiencia de usuario y acerca el proyecto al funcionamiento de aplicaciones web modernas.

La organización del sistema también se refleja en la estructura de carpetas del proyecto. Los estilos se encuentran separados en la carpeta CSS, la lógica del frontend en la carpeta JS, las APIs PHP en la carpeta API, las vistas HTML en la carpeta vistas y los recursos gráficos en carpetas específicas de imágenes y logotipos. Esta separación permite mantener el código más limpio y facilita su revisión, modificación y ampliación.

---

# 4. Objetivos del proyecto

El desarrollo de FULL MX se ha planteado con el objetivo de crear una plataforma web completa que simule el funcionamiento de una tienda online especializada en productos de motocross. Para conseguirlo, se han definido diferentes objetivos técnicos, funcionales, visuales y académicos que han guiado todo el proceso de desarrollo.

El proyecto no se limita a crear una página visual, sino que busca integrar diferentes capas de una aplicación real. Por un lado, se desarrolla una interfaz atractiva y usable para los clientes. Por otro lado, se implementa una lógica backend capaz de gestionar usuarios, productos, pedidos y stock. Además, se diseña una base de datos relacional que permite almacenar y organizar toda la información necesaria.

A nivel académico, el objetivo ha sido aplicar de forma práctica los conocimientos adquiridos durante el ciclo formativo. FULL MX reúne conceptos de programación, diseño, bases de datos, seguridad y despliegue, permitiendo demostrar una visión global del desarrollo web.

---

## 4.1 Objetivo principal

El objetivo principal del proyecto es desarrollar una aplicación web funcional, dinámica y organizada que permita gestionar una tienda online de productos de motocross. Esta aplicación debe permitir la navegación por categorías, la consulta de productos, la selección de tallas, la gestión del carrito y la realización de pedidos.

Además, la plataforma debe permitir la gestión interna por parte de empleados y administradores. Esto implica que el sistema debe incorporar herramientas para actualizar productos, modificar stock, borrar productos y administrar usuarios internos. De esta forma, la aplicación simula no solo la parte visible para el cliente, sino también la parte de administración que tendría una tienda online real.

Este objetivo principal exige una correcta integración entre frontend, backend y base de datos. La interfaz visual debe ser clara y cómoda, el backend debe procesar correctamente las acciones realizadas por el usuario y la base de datos debe almacenar la información de forma coherente y segura.

---

## 4.2 Objetivos técnicos

Desde el punto de vista técnico, uno de los objetivos más importantes ha sido mantener una arquitectura clara y organizada. Para ello, se ha separado la lógica del proyecto en diferentes carpetas y archivos, evitando mezclar responsabilidades dentro de un mismo bloque de código.

La aplicación debía utilizar tecnologías vistas durante el ciclo formativo, como HTML, CSS, JavaScript, PHP y MySQL. Cada tecnología se ha aplicado en la parte correspondiente del proyecto. HTML se ha utilizado para estructurar el contenido, CSS para diseñar la interfaz, JavaScript para aportar dinamismo, PHP para procesar la lógica de servidor y MySQL para almacenar la información.

Otro objetivo técnico importante ha sido implementar comunicación entre cliente y servidor mediante peticiones asíncronas. Esta comunicación permite que JavaScript solicite información al backend sin recargar completamente la página. Gracias a ello, se consigue una experiencia más fluida y moderna.

También se ha trabajado la validación de datos, el uso de sesiones, la protección básica de información sensible y la organización del código mediante comentarios explicativos. Todo ello contribuye a que el proyecto sea más comprensible, seguro y mantenible.

---

## 4.3 Objetivos funcionales

Los objetivos funcionales están relacionados con las acciones que la aplicación debe permitir realizar. FULL MX debía ofrecer un conjunto de funcionalidades suficiente para simular una tienda online real.

Entre las funcionalidades principales se encuentra el registro de clientes, el inicio de sesión, la visualización de productos, la búsqueda de artículos, la selección de tallas, la gestión del carrito, la realización de pedidos y la consulta posterior de dichos pedidos.

Además, los usuarios con rol de empleado o administrador debían disponer de herramientas adicionales. Estas herramientas permiten gestionar productos, actualizar stock por tallas, borrar productos y consultar información interna. En el caso del administrador, también se incluyen funciones relacionadas con la gestión de empleados.

Estas funcionalidades convierten a FULL MX en una aplicación más completa, ya que no se limita a mostrar productos, sino que gestiona procesos reales propios de una tienda online.

---

## 4.4 Objetivos visuales y de experiencia de usuario

La experiencia de usuario ha sido un elemento importante dentro del proyecto. Una tienda online debe ser funcional, pero también debe resultar clara, cómoda y atractiva para el usuario.

El diseño visual de FULL MX se ha basado en una estética relacionada con el mundo del motocross. Para ello se han utilizado colores rojos, blancos y negros, buscando transmitir una imagen deportiva y moderna. Además, se han incorporado efectos visuales como transiciones, cambios al pasar el ratón, tarjetas de producto y ventanas emergentes.

La interfaz se ha organizado para que el usuario pueda localizar fácilmente los elementos principales. El header permite acceder a las categorías, al buscador, al carrito y a la sesión de usuario. Las categorías permiten ordenar los productos y el carrito lateral facilita la visualización de los artículos seleccionados.

También se ha tenido en cuenta la adaptación a diferentes dispositivos. La aplicación debe poder utilizarse correctamente desde ordenador, tablet o móvil, por lo que se ha aplicado diseño responsive mediante CSS.

---

![Logo FULL MX](img/movil.png)
---

## 4.5 Objetivos académicos

El proyecto tiene una finalidad académica clara: demostrar los conocimientos adquiridos durante el Ciclo Formativo de Desarrollo de Aplicaciones Web. FULL MX permite aplicar de manera práctica contenidos relacionados con distintos módulos del ciclo.

En la parte de desarrollo en entorno cliente se han aplicado conocimientos de HTML, CSS, JavaScript, manipulación del DOM, eventos y peticiones asíncronas. En la parte de desarrollo en entorno servidor se ha trabajado con PHP, sesiones, formularios, validaciones y acceso a base de datos. En bases de datos se ha diseñado una estructura relacional con tablas conectadas entre sí. En diseño de interfaces se ha trabajado la estética, usabilidad y adaptación responsive.

Además, el proyecto ha permitido desarrollar capacidades importantes como la planificación, la resolución de errores, la organización de carpetas, el mantenimiento de código y la documentación técnica. Estas capacidades son fundamentales en cualquier entorno profesional de desarrollo web.

---

# 5. Justificación del proyecto

El proyecto FULL MX se justifica por la necesidad de desarrollar una aplicación completa que reúna diferentes áreas del desarrollo web dentro de un único sistema funcional. La elección de una tienda online como temática permite trabajar una gran variedad de funcionalidades habituales en proyectos reales, como usuarios, productos, pedidos, stock, sesiones y administración.

Además, el comercio electrónico es uno de los sectores más importantes dentro del desarrollo web actual. Muchas empresas necesitan plataformas digitales para vender productos, gestionar clientes y administrar pedidos. Por este motivo, desarrollar una aplicación de este tipo resulta especialmente útil desde el punto de vista formativo.

La temática del motocross permite, además, crear una identidad visual clara y diferenciada. El proyecto no se basa únicamente en funcionalidades técnicas, sino también en una experiencia visual coherente con el sector al que va dirigido.

---

## 5.1 Análisis de mercado

Durante la fase inicial del proyecto se analizaron diferentes plataformas reales dedicadas a la venta de productos relacionados con motocross, motor y equipación deportiva. Entre las referencias observadas se encuentran tiendas como 24MX, Motocard, GreenlandMX y FC-Moto.

Estas plataformas comparten características comunes, como la organización por categorías, el uso de imágenes de producto, filtros de búsqueda, carritos de compra y sistemas de usuario. Sin embargo, también se observaron aspectos mejorables, especialmente en cuanto a sobrecarga visual, navegación compleja o dificultad para localizar determinados elementos.

A partir de este análisis se decidió que FULL MX debía mantener una estructura más clara, con categorías visibles, tarjetas de producto ordenadas, carrito accesible y una estética moderna. El objetivo no fue copiar una plataforma existente, sino tomar como referencia buenas prácticas del sector y adaptarlas a un proyecto propio.

---

## 5.2 Necesidad detectada

La necesidad principal detectada fue desarrollar una plataforma capaz de integrar funcionalidades de cliente y de administración en un mismo proyecto. Muchas aplicaciones académicas se centran únicamente en la parte visual o en formularios básicos, pero FULL MX busca ir más allá incorporando procesos completos.

La aplicación permite gestionar el ciclo completo de compra: visualización de productos, selección de talla, incorporación al carrito, confirmación del pedido y consulta posterior. Al mismo tiempo, permite al personal interno gestionar stock y productos. Esta doble perspectiva aporta realismo al proyecto y lo convierte en una aplicación más completa.

También se detectó la necesidad de mantener una estructura escalable. El proyecto debía poder crecer en el futuro sin necesidad de rehacer toda la base. Por ello se organizaron carpetas, archivos y funcionalidades de manera separada, facilitando futuras mejoras.

---

## 5.3 Vinculación con los contenidos del ciclo formativo

FULL MX está directamente vinculado con los contenidos del Ciclo Formativo de Desarrollo de Aplicaciones Web. En el módulo de desarrollo web en entorno cliente se aplican conocimientos de JavaScript, eventos, manipulación del DOM y actualización dinámica de la interfaz. En el módulo de desarrollo web en entorno servidor se trabaja con PHP, sesiones, formularios y consultas a base de datos.

En el módulo de bases de datos se ha diseñado una estructura relacional que permite almacenar información de usuarios, productos, proveedores, pedidos y stock. En diseño de interfaces se han aplicado criterios de usabilidad, colores, responsive design y organización visual. En despliegue se ha utilizado XAMPP, Apache, MySQL y configuración mediante archivos `.env` y `.htaccess`.

Por tanto, el proyecto funciona como una integración práctica de los principales conocimientos adquiridos durante el ciclo formativo.

---

## 5.4 Motivación personal

La elección del motocross como temática está relacionada con el interés personal por este ámbito. Trabajar sobre un tema conocido y motivador facilita la implicación en el proyecto y permite prestar mayor atención a los detalles visuales y funcionales.

Además, el motocross es un sector con una estética muy marcada. Esto permitió diseñar una aplicación con personalidad propia, utilizando colores llamativos, imágenes relacionadas con el deporte y una interfaz orientada a transmitir dinamismo.

Esta motivación personal también ayudó durante las fases más complejas del desarrollo, especialmente al implementar funcionalidades como stock por tallas, carrito dinámico y gestión de pedidos.

---

## 5.5 Valor aportado por la aplicación

FULL MX aporta valor como proyecto académico porque demuestra una visión completa del desarrollo web. No se trata de una página estática, sino de una aplicación que conecta frontend, backend y base de datos.

El proyecto también aporta valor desde el punto de vista funcional, ya que simula procesos habituales en una tienda real. La gestión de roles, el control de stock por tallas y el detalle de pedidos hacen que la aplicación tenga un funcionamiento más realista.

Además, la estructura del proyecto permite futuras ampliaciones, como pasarela de pago, facturación, estadísticas, integración con proveedores o panel administrativo avanzado.

---

# 6. Recursos utilizados

Para el desarrollo de FULL MX se han utilizado diferentes recursos software, herramientas de desarrollo, lenguajes de programación y recursos gráficos. La elección de estos recursos se realizó teniendo en cuenta las necesidades del proyecto y los contenidos trabajados durante el ciclo formativo.

El objetivo fue utilizar herramientas accesibles, conocidas y adecuadas para construir una aplicación web completa en entorno local. Estas herramientas permitieron programar, probar, gestionar la base de datos y organizar el proyecto de forma eficiente.

---

## 6.1 Entornos de desarrollo

El entorno principal utilizado ha sido Visual Studio Code. Este editor permite trabajar cómodamente con múltiples lenguajes y ofrece funciones útiles como resaltado de sintaxis, autocompletado, terminal integrada y organización de carpetas.

Para ejecutar la aplicación se utilizó XAMPP, que proporciona un entorno local con Apache y MySQL. Apache permite servir los archivos del proyecto y ejecutar PHP, mientras que MySQL permite almacenar la base de datos. phpMyAdmin se utilizó como herramienta gráfica para gestionar tablas, consultas y registros.

GitHub también se utilizó como recurso de almacenamiento y control de versiones. Aunque el proyecto se ha desarrollado principalmente en local, disponer de un repositorio permite guardar copias del código y mantener una estructura más profesional.

---

## 6.2 Lenguajes utilizados

El proyecto utiliza HTML5 para estructurar las vistas de la aplicación. Gracias a HTML se definen formularios, botones, contenedores, secciones y elementos visuales. CSS3 se utiliza para aplicar estilos, colores, posiciones, efectos y responsive design.

JavaScript se utiliza para gestionar la parte dinámica del frontend. Gracias a JavaScript se actualiza el carrito, se generan productos, se abren popups, se realizan búsquedas y se envían peticiones al backend.

PHP se utiliza como lenguaje de servidor. Su función principal es procesar datos, consultar la base de datos, gestionar sesiones y devolver respuestas al frontend. Finalmente, SQL y MySQL se utilizan para diseñar y consultar la base de datos relacional.

---

Imagen: Fragmento de código JavaScript realizando una petición Fetch.

Imagen: Fragmento de código PHP consultando la base de datos.

---

## 6.3 Herramientas y utilidades externas

Además de las herramientas principales, se utilizaron recursos externos para mejorar el diseño y la experiencia visual. Font Awesome permitió incorporar iconos como carrito, usuario, búsqueda o cierre de ventanas emergentes. Google Fonts permitió mejorar la apariencia tipográfica de la aplicación.

También se utilizaron imágenes relacionadas con motocross y productos deportivos para dar mayor realismo al proyecto. Estas imágenes se organizaron dentro de la carpeta `img`, permitiendo que los productos pudieran mostrarse de forma visual dentro del catálogo.

---

## 6.4 Recursos gráficos

Los recursos gráficos tienen una función importante dentro de FULL MX, ya que permiten reforzar la identidad visual del proyecto. Una tienda online depende en gran medida de la presentación visual de sus productos, por lo que las imágenes ayudan a que la aplicación resulte más realista.

Se utilizaron imágenes para productos, fondos, logotipos y capturas de la propia aplicación. Además, dentro de la memoria se incorporan indicaciones de capturas para mostrar el funcionamiento del sistema, como la página principal, carrito, panel de usuario, gestión de stock y diseño responsive.

---

## 6.5 Organización de recursos del proyecto

El proyecto se organizó mediante carpetas separadas según la función de cada recurso. Esta organización permite encontrar fácilmente cada parte del sistema y facilita el mantenimiento.

La estructura principal es la siguiente:

```txt
/css
/js
/api
/vistas
/img
/logos
```

La carpeta `css` contiene los estilos visuales, la carpeta `js` contiene la lógica dinámica del frontend, la carpeta `api` contiene los archivos PHP, la carpeta `vistas` contiene las páginas HTML y las carpetas `img` y `logos` almacenan recursos gráficos.

Esta separación de recursos ayuda a mantener una arquitectura más limpia y profesional.

---

# 7. Tecnologías de desarrollo

Las tecnologías utilizadas en FULL MX se han seleccionado teniendo en cuenta su utilidad dentro del desarrollo web y su relación con los contenidos del ciclo formativo. La combinación de HTML, CSS, JavaScript, PHP y MySQL permite construir una aplicación completa, capaz de mostrar información dinámica, procesar datos y almacenarlos en una base de datos relacional.

La aplicación se basa en una arquitectura cliente-servidor. El cliente, representado por el navegador, muestra la interfaz y ejecuta JavaScript. El servidor, mediante PHP, procesa las solicitudes y accede a la base de datos. Esta estructura permite separar responsabilidades y facilita el mantenimiento del sistema.

---

## 7.1 Tecnologías frontend

El frontend de FULL MX se ha desarrollado con HTML5, CSS3 y JavaScript. Estas tecnologías son fundamentales en cualquier aplicación web, ya que permiten estructurar, diseñar y dinamizar la interfaz.

HTML define la estructura de las vistas, CSS controla el diseño visual y JavaScript gestiona la interacción. Gracias a esta combinación, la aplicación puede mostrar productos, abrir ventanas emergentes, actualizar el carrito y responder a las acciones del usuario.

Uno de los aspectos más importantes del frontend ha sido la generación dinámica de contenido. Los productos se muestran mediante templates creados con JavaScript, lo que evita tener que escribir manualmente cada producto en HTML. Esta solución mejora la mantenibilidad y permite que la información proceda directamente de la base de datos.

---

![Logo FULL MX](img/templateProducto.png)

---

## 7.2 Tecnologías backend

El backend se ha desarrollado con PHP. Este lenguaje se encarga de procesar las peticiones realizadas desde el frontend, validar datos, gestionar sesiones y comunicarse con MySQL.

PHP se utiliza en archivos situados dentro de la carpeta `api`. Estos archivos actúan como puntos de entrada para diferentes funcionalidades, como login, registro, productos, pedidos, empleados o stock. Cada archivo cumple una función concreta, lo que permite organizar mejor la lógica del servidor.

El uso de PHP también permite gestionar sesiones mediante `session_start()`. Esto resulta fundamental para mantener autenticado al usuario mientras navega por la aplicación y para controlar qué funcionalidades puede utilizar según su rol.

---

## 7.3 Base de datos MySQL

MySQL se utiliza como sistema gestor de base de datos relacional. La base de datos almacena toda la información necesaria para que la aplicación funcione correctamente.

Entre la información almacenada se encuentran clientes, empleados, productos, proveedores, tallas, pedidos y detalles de pedido. La estructura relacional permite conectar estas entidades y realizar consultas coherentes.

El control de stock por tallas es uno de los elementos más importantes de la base de datos. Cada producto puede tener varias tallas asociadas, y cada talla tiene una cantidad disponible. Cuando todas las tallas se quedan sin stock, el producto deja de estar disponible para compra.

---

## 7.4 Comunicación cliente-servidor

La comunicación entre frontend y backend se realiza mediante Fetch API. Esta tecnología permite que JavaScript envíe peticiones HTTP a archivos PHP y reciba respuestas sin recargar completamente la página.

Por ejemplo, cuando el usuario busca productos, consulta pedidos o inicia sesión, JavaScript realiza una petición al servidor. PHP procesa la solicitud, consulta la base de datos si es necesario y devuelve una respuesta normalmente en formato JSON. Después, JavaScript interpreta esa respuesta y actualiza la interfaz.

Este sistema mejora la experiencia de usuario porque hace que la aplicación sea más fluida. También permite separar mejor la lógica del cliente y la lógica del servidor.

---

![Logo FULL MX](img/fetch.png)

---

## 7.5 Seguridad implementada

Aunque FULL MX es un proyecto académico, se han aplicado medidas básicas de seguridad. Las contraseñas se almacenan cifradas mediante hash, evitando guardar contraseñas en texto plano. También se utilizan sesiones PHP para mantener la autenticación de usuarios.

Los datos de conexión a la base de datos se almacenan en un archivo `.env`, separado del código principal. Además, el archivo `.htaccess` impide el acceso directo a `.env`, protegiendo información sensible.

```apache
<Files ".env">
    Require all denied
</Files>
```

Estas medidas no convierten la aplicación en un sistema preparado para producción real, pero sí muestran una base adecuada de seguridad para un proyecto académico.

---

## 7.6 Valoración final de las tecnologías utilizadas

La combinación de tecnologías utilizadas ha permitido desarrollar una aplicación completa y funcional. HTML, CSS y JavaScript permiten crear una interfaz moderna; PHP permite procesar la lógica del servidor; MySQL permite mantener la información persistente; y Fetch API permite conectar ambas partes de forma dinámica.

Esta elección tecnológica resulta adecuada para un proyecto DAW, ya que permite aplicar conocimientos fundamentales y construir una aplicación con estructura profesional.

---

# 8. Diseño del proyecto

El diseño del proyecto FULL MX abarca tanto la parte visual como la organización interna de la aplicación. Desde el inicio se buscó desarrollar una plataforma moderna, clara y coherente con la temática del motocross.

El diseño no se limita a colores o imágenes, sino que también incluye la estructura de la base de datos, la organización de carpetas, la distribución de roles y la manera en que los usuarios interactúan con la aplicación.

---

## 8.1 Diseño de la base de datos

La base de datos sigue un modelo relacional. Esto permite organizar la información en tablas conectadas mediante claves primarias y foráneas.

Las tablas principales gestionan clientes, empleados, productos, proveedores, tallas, pedidos y detalles de pedidos. Esta estructura permite representar procesos reales de una tienda online, como la relación entre un cliente y sus pedidos o entre un producto y sus tallas disponibles.

El diseño de la base de datos fue fundamental para permitir funcionalidades como el stock por tallas, la consulta de pedidos y la visualización del detalle de cada compra.

---

## 8.2 Modelo relacional

El modelo relacional permite mantener la integridad de la información y evitar duplicidades innecesarias. Por ejemplo, los productos no se almacenan directamente dentro de cada pedido, sino que se relacionan mediante una tabla de detalle de pedido. Esto permite conservar información organizada y consultar los datos de forma más eficiente.

La relación entre productos y tallas permite controlar el stock de manera precisa. Un producto puede tener varias tallas, y cada talla puede tener una cantidad diferente. Esto resulta especialmente importante en una tienda de equipación, donde un mismo producto puede estar disponible en varias medidas.

---

![Logo FULL MX](img/modeloER.png)

---

## 8.3 Diseño de la interfaz de usuario

La interfaz de FULL MX se diseñó buscando una experiencia visual moderna y deportiva. Los colores principales son rojo, blanco y negro, ya que encajan con una estética agresiva y dinámica relacionada con el motocross.

El header permite acceder rápidamente a las categorías, al buscador, al carrito y a la sesión de usuario. Los productos se muestran mediante tarjetas visuales, con imagen, nombre, descripción, precio y tallas disponibles. El carrito lateral permite consultar los productos añadidos sin perder de vista el resto de la página.

También se incorporan popups para mostrar información adicional, como contacto o detalle de pedidos. Estos elementos permiten mostrar contenido sin cambiar completamente de página, mejorando la fluidez de la experiencia.

---

![Logo FULL MX](img/detallePedido.png)

---

## 8.4 Roles de la aplicación

La aplicación distingue entre tres roles principales: cliente, empleado y administrador. Cada rol tiene permisos diferentes, lo que permite organizar el acceso a las funcionalidades.

El cliente puede navegar por productos, gestionar el carrito, realizar pedidos y consultar sus compras. El empleado puede acceder a herramientas de gestión de productos y stock. El administrador dispone de permisos adicionales para gestionar empleados y controlar de forma más completa la plataforma.

Esta división de roles aporta realismo al proyecto, ya que en una tienda online real no todos los usuarios tienen el mismo nivel de acceso.

---

![Logo FULL MX](img/zonaCliente.png)

---

## 8.5 Usuarios creados para pruebas

Durante el desarrollo se utilizaron usuarios de prueba para comprobar el funcionamiento de la aplicación. Estos usuarios permiten validar el comportamiento de cada rol y asegurar que las funcionalidades se muestran correctamente según el tipo de sesión iniciada.

Ejemplos de usuarios de prueba:

```txt
admin@jefe.fullmx.es
empleado@fullmx.es
cliente@fullmx.com
```

Estos usuarios permiten probar el flujo completo de la aplicación desde diferentes perspectivas.

---

## 8.6 Arquitectura general del proyecto

La arquitectura general se basa en la separación de responsabilidades. Cada carpeta cumple una función concreta dentro del sistema.

```txt
/css      -> estilos visuales
/js       -> lógica frontend
/api      -> lógica backend PHP
/vistas   -> páginas HTML
/img      -> imágenes de productos y capturas
/logos    -> logotipos e iconos
```

Esta organización permite mantener el proyecto limpio, facilitar el mantenimiento y mejorar la escalabilidad.

---

# 9. Lógica y codificación del proyecto

La lógica de FULL MX se basa en la comunicación entre la interfaz visual, el backend y la base de datos. Cada acción importante del usuario desencadena un proceso interno que puede implicar validaciones, consultas SQL y actualización dinámica de la interfaz.

El objetivo principal de la codificación ha sido mantener una estructura clara, separando la lógica de cada parte para facilitar su comprensión y mantenimiento.

---

## 9.1 Arquitectura general de funcionamiento

La arquitectura del sistema se basa en tres capas principales: frontend, backend y base de datos. El frontend muestra la información y recoge las acciones del usuario. El backend procesa esas acciones, valida datos y consulta la base de datos. MySQL almacena la información persistente.

Este modelo permite que cada parte tenga una responsabilidad clara. JavaScript no accede directamente a la base de datos, sino que se comunica con PHP mediante peticiones. PHP actúa como intermediario y controla el acceso a los datos.

---

## 9.2 Principales procesos del sistema

Los procesos principales de FULL MX incluyen inicio de sesión, registro de clientes, gestión de productos, carrito, pedidos y stock.

En el inicio de sesión, el usuario introduce sus credenciales. El sistema valida los datos y comprueba el rol correspondiente. Dependiendo de si el usuario es cliente, empleado o administrador, se muestra un panel diferente.

En la gestión de productos, la aplicación obtiene datos desde la base de datos y los muestra mediante templates dinámicos. En la gestión de pedidos, el sistema almacena la compra y permite consultar posteriormente los detalles.

---

## 9.3 Gestión de usuarios y sesiones

La gestión de usuarios se realiza mediante sesiones PHP. Cuando un usuario inicia sesión correctamente, el sistema guarda información relevante en la sesión. Esto permite recordar quién está conectado mientras navega por la aplicación.

El uso de sesiones permite controlar permisos y evitar que usuarios sin autorización accedan a funciones internas. Por ejemplo, un cliente no debe poder borrar productos ni administrar empleados.

```php
session_start();
```

Este sistema resulta esencial para diferenciar los roles y proteger las partes internas de la aplicación.

---

## 9.4 Gestión de productos y stock

La gestión de productos está conectada directamente con la base de datos. Los productos se almacenan con información como nombre, descripción, precio, imagen, categoría y proveedor. Además, cada producto puede tener varias tallas con stock independiente.

El sistema de actualización de stock permite modificar la cantidad disponible de cada talla. Si todas las tallas llegan a cero, el producto se marca como no disponible. Esto evita que el cliente compre productos sin stock.

Esta funcionalidad aporta realismo al proyecto, ya que en una tienda de equipación es habitual que el stock dependa de la talla.

---

## 9.5 Gestión del carrito y pedidos

El carrito funciona de forma dinámica mediante JavaScript. Cuando el usuario añade un producto, se guarda la información necesaria, como nombre, precio, talla y cantidad. El usuario puede aumentar o disminuir la cantidad antes de confirmar la compra.

Al confirmar el pedido, la aplicación valida que el usuario haya iniciado sesión como cliente. Después, el pedido se registra en la base de datos y se almacenan los detalles de los productos comprados.

Los pedidos pueden consultarse posteriormente desde el panel del cliente. Además, cada pedido dispone de un detalle que muestra los productos incluidos, cantidades, precios e importe total.

---

## 9.6 Validación de datos

La validación de datos es necesaria para evitar errores y garantizar que la información introducida sea correcta. En FULL MX se realizan validaciones tanto en frontend como en backend.

En frontend se pueden comprobar campos vacíos o formatos básicos antes de enviar información al servidor. En backend se validan los datos antes de realizar operaciones en la base de datos. Esto es importante porque las validaciones del cliente pueden manipularse, mientras que las del servidor ofrecen mayor control.

Se validan especialmente datos como email, contraseña, ID de producto, cantidades, stock y formularios de registro.

---

## 9.7 Organización y documentación del código

Durante el desarrollo se ha intentado mantener un código ordenado y documentado. Los archivos JavaScript y PHP incluyen comentarios explicativos para facilitar su comprensión.

La documentación del código ayuda a entender qué función cumple cada bloque, cómo se comunican los archivos y qué procesos se ejecutan en cada caso. Esto resulta especialmente importante en proyectos con varias funcionalidades conectadas entre sí.

Una buena organización del código facilita futuras modificaciones y permite que otra persona pueda revisar el proyecto con mayor facilidad.

---

# 10. Despliegue web del proyecto

El despliegue de FULL MX se ha realizado en entorno local utilizando XAMPP. Este entorno permite ejecutar Apache y MySQL de forma sencilla, simulando el comportamiento de un servidor web real.

El despliegue local ha permitido probar todas las funcionalidades de la aplicación antes de una posible publicación en un hosting real.

---

## 10.1 Entorno de despliegue utilizado

El entorno utilizado se compone principalmente de Apache, MySQL y phpMyAdmin. Apache se encarga de servir los archivos y ejecutar PHP. MySQL almacena la base de datos y phpMyAdmin permite gestionarla visualmente.

Este entorno es adecuado para proyectos académicos porque permite trabajar de forma local sin necesidad de contratar hosting.

---

## 10.2 Requisitos hardware y software

Para ejecutar el proyecto no se requiere un equipo especialmente potente. Es suficiente con un ordenador capaz de ejecutar XAMPP y un navegador moderno.

Requisitos básicos:

```txt
Sistema operativo: Windows, Linux o macOS
Servidor local: XAMPP
Navegador: Chrome, Edge o Firefox
Base de datos: MySQL
Editor recomendado: Visual Studio Code
```

---

## 10.3 Proceso de despliegue

El proceso de despliegue local consiste en copiar la carpeta del proyecto dentro de `htdocs`, iniciar Apache y MySQL desde XAMPP e importar la base de datos mediante phpMyAdmin.

Después se debe configurar el archivo `.env` con los datos de conexión:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=fullmx
```

Una vez configurado, la aplicación puede ejecutarse desde el navegador accediendo a la ruta correspondiente dentro de localhost.

---

## 10.4 Configuración de seguridad

El archivo `.env` contiene información sensible relacionada con la conexión a la base de datos. Por este motivo se utiliza `.htaccess` para bloquear el acceso directo.

```apache
<Files ".env">
    Require all denied
</Files>
```

Esta medida evita que un usuario pueda consultar el contenido del archivo desde el navegador.

---

## 10.5 Posible despliegue futuro en producción

Aunque el proyecto se ha desarrollado en local, su estructura permitiría realizar un despliegue futuro en un hosting real. Para ello sería necesario contratar un servidor compatible con PHP y MySQL, subir los archivos del proyecto, importar la base de datos y configurar correctamente las variables de entorno.

En una versión de producción también sería recomendable añadir certificado SSL, mejorar validaciones, reforzar seguridad y configurar copias de seguridad automáticas.

---

# 11. Manual de usuario

El manual de usuario se encuentra desarrollado en un documento independiente para facilitar su consulta y mantener separada la documentación técnica de la guía de uso de la aplicación.

[Acceder al Manual de Usuario de FULL MX](manualUsuario.md)

---

# 12. Conclusiones y aspectos a mejorar

El desarrollo de FULL MX ha supuesto una experiencia muy completa tanto a nivel técnico como personal. El proyecto ha permitido aplicar conocimientos de diferentes áreas del desarrollo web y reunirlos dentro de una única aplicación funcional.

Durante el desarrollo se han trabajado aspectos relacionados con frontend, backend, bases de datos, seguridad, diseño responsive, despliegue local y experiencia de usuario. Todo ello ha permitido comprender mejor cómo se estructura una aplicación web real.

---

## 12.1 Valoración general del proyecto

La valoración general del proyecto es positiva, ya que se ha conseguido desarrollar una aplicación funcional con diferentes roles, gestión de productos, carrito dinámico, pedidos y control de stock.

FULL MX representa una aproximación bastante completa a una tienda online real y demuestra la capacidad para integrar diferentes tecnologías dentro de un mismo sistema.

---

## 12.2 Dificultades encontradas

Una de las principales dificultades fue organizar correctamente el proyecto a medida que aumentaba el número de funcionalidades. Al incorporar carrito, pedidos, usuarios, stock y paneles de administración, fue necesario mantener una estructura clara para evitar duplicidades.

Otra dificultad importante fue la comunicación entre JavaScript y PHP mediante Fetch API, especialmente al trabajar con respuestas JSON y actualizaciones dinámicas de la interfaz.

También resultó importante diseñar correctamente la base de datos para que el sistema de stock por tallas funcionara de forma coherente.

---

## 12.3 Aprendizajes obtenidos

El proyecto permitió reforzar conocimientos de programación web y adquirir experiencia práctica en la integración de distintas tecnologías.

Entre los principales aprendizajes destacan:

```txt
Organización de proyectos
Comunicación cliente-servidor
Gestión de sesiones
Consultas SQL
Diseño responsive
Validación de formularios
Mantenimiento de código
```

Además, el proyecto ha permitido mejorar la capacidad de resolver problemas y adaptar soluciones durante el desarrollo.

---

## 12.4 Aspectos a mejorar

Aunque FULL MX es funcional, podría ampliarse con nuevas funcionalidades en futuras versiones.

Algunas mejoras posibles son:

- Pasarela de pago real.
- Facturación automática.
- Panel avanzado de estadísticas.
- Sistema de valoraciones.
- Gestión avanzada de envíos.
- Notificaciones por correo.
- API REST completa.
- Sistema de favoritos.

Estas mejoras permitirían acercar todavía más la aplicación al funcionamiento real de una tienda online profesional.

---

## 12.5 Valoración final

FULL MX ha permitido desarrollar una aplicación web completa, organizada y visualmente atractiva. El proyecto integra diferentes tecnologías y demuestra conocimientos tanto de frontend como de backend.

Además, la temática elegida ha permitido trabajar con motivación y desarrollar una plataforma con identidad visual propia. El resultado final es una aplicación funcional, escalable y preparada para futuras ampliaciones.

---

# 13. Bibliografía

Durante el desarrollo del proyecto se han utilizado diferentes recursos técnicos, documentación oficial y plataformas de aprendizaje.

Recursos utilizados:

```txt
https://developer.mozilla.org
https://www.w3schools.com
https://www.php.net
https://dev.mysql.com/doc/
https://fontawesome.com
https://fonts.google.com
https://github.com
https://www.apachefriends.org
```

También se han consultado plataformas reales de venta online relacionadas con motocross y equipación deportiva para tomar referencias visuales y funcionales.

---

# 14. Anexos

## 14.1 Anexo I — Estructura del proyecto

```txt
FULLMX/
│
├── css/
├── js/
├── api/
├── vistas/
├── img/
├── logos/
├── index.html
├── .env
├── .htaccess
└── fullmx.sql
```

Esta estructura permite separar correctamente estilos, lógica frontend, backend, vistas y recursos gráficos.

---
