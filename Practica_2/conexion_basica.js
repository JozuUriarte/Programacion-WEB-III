const mysql = require('mysql2');

async function testConexionBasica() {
  const startTime = Date.now(); // Capturamos el tiempo de inicio

  // Crear una conexión a la base de datos
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_productos'
  });

  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) reject(err);
      console.log('¡Conectado a la base de datos MySQL!');

      // Consulta de ejemplo para obtener todos los productos
      connection.query('SELECT * FROM productos', (err, results, fields) => {
        if (err) reject(err);
        console.log('Resultados de productos:', results);
        const endTime = Date.now(); // Capturamos el tiempo de finalización
        resolve(endTime - startTime); // Tiempo de ejecución
      });

      // Cerrar la conexión
      connection.end();
    });
  });
}

module.exports = testConexionBasica;  // Exportamos la función

