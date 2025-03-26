const mysql = require('mysql2');

async function testConexionPool() {
  const startTime = Date.now(); // Capturamos el tiempo de inicio

  // Crear un pool de conexiones
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_productos',
    waitForConnections: true,
    connectionLimit: 10,  // Límite de conexiones en el pool
    queueLimit: 0
  });

  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM productos', (err, results, fields) => {
      if (err) reject(err);
      console.log('Resultados de productos (con Pooling):', results);
      const endTime = Date.now(); // Capturamos el tiempo de finalización
      resolve(endTime - startTime); // Tiempo de ejecución
    });
  });
}

module.exports = testConexionPool; // Exportamos la función
