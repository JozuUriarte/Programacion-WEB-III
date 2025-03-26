Diferentes formas de Conexion de Base de Datos
Descripción
Este proyecto demuestra cómo conectar Node.js con una base de datos MySQL utilizando tres métodos distintos:

1. Conexión básica (callback)
2. Conexión utilizando promesas (async/await)
3. Conexión utilizando Pooling

1. Conexión básica (callback)
- Crea una conexión cada vez que se ejecuta una consulta.
- Usa callbacks para manejar la respuesta.
- Fácil de implementar.
- Ineficiente para muchas consultas (crea y destruye conexiones constantemente).
- Ideal para pruebas o scripts pequeños.

 2. Conexión utilizando promesas (async/await)
- Usa `mysql2/promise` y `async/await`.
- Código más limpio y legible.
- Mejor manejo de errores.
-  Aunque más ordenado, aún crea conexiones por cada ejecución si no se usa pooling.
- Útil para proyectos medianos y consultas que necesiten orden y claridad.

 3. Conexión utilizando Pooling
- Crea un conjunto de conexiones reutilizables.
- Las conexiones se obtienen y devuelven al pool.
- Altamente eficiente para aplicaciones con alto tráfico.
-  Rápida y escalable.
- Requiere configuración extra (`connectionLimit`).
- Usado en proyectos grandes y aplicaciones web concurridas.
Conclusión
- La conexión básica es la más sencilla pero la menos eficiente.
- La conexión con promesas es más ordenada y un poco más rápida, ideal para código limpio.
- El pooling es claramente el método más rápido y escalable para múltiples consultas.
PARA EJECUTAR ESTE ARCHIVO PRIMERO CREA UNA BASE DE DATOS CON PHP:
CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  descripcion TEXT,
  precio DECIMAL(10, 2),
  cantidad INT
);

INSERT INTO productos (nombre, descripcion, precio, cantidad) VALUES
('Laptop', 'Laptop de 15 pulgadas, con procesador i7', 800.00, 20),
('Móvil', 'Smartphone de última generación', 500.00, 50),
('Auriculares', 'Auriculares con cancelación de ruido', 100.00, 100);

Y EJECUTA EN LA TERMINAR LOS COMANDOS
- npm init -y
- npm install mysql2
Y PARA LA EJECUCION FINAL Y TE MUESTRE EL COMANDO:
- node index.js
