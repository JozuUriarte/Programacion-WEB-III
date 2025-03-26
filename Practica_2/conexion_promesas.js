const mysql = require('mysql2/promise');

async function testConexionPromesas() {
  const startTime = Date.now(); // Capturamos el tiempo de inicio

  try {
    // Conectar a la base de datos usando promesas
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'bd_productos'
    });

    console.log('¡Conectado a la base de datos MySQL!');

    // Ejecutar una consulta utilizando promesas
    const [rows, fields] = await connection.execute('SELECT * FROM productos');
    console.log('Resultado de la consulta:', rows);

    const endTime = Date.now(); // Capturamos el tiempo de finalización
    await connection.end(); // Cerrar la conexión
    return endTime - startTime; // Tiempo de ejecución
  } catch (err) {
    console.error('Error:', err);
  }
}

module.exports = testConexionPromesas; // Exportamos la función
