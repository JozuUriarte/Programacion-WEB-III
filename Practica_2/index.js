const fs = require('fs');
const testConexionBasica = require('./conexion_basica');
const testConexionPromesas = require('./conexion_promesas');
const testConexionPool = require('./conexion_pool');

async function ejecutarPruebas() {
  const resultados = [];

  console.log('Ejecutando pruebas de conexión...');

  // Ejecutar prueba para conexión básica
  const tiempoBasica = await testConexionBasica();
  console.log(`Tiempo conexión básica: ${tiempoBasica} `);
  resultados.push(`Conexión básica: ${tiempoBasica} `);

  // Ejecutar prueba para conexión con promesas
  const tiempoPromesas = await testConexionPromesas();
  console.log(`Tiempo conexión promesas: ${tiempoPromesas} `);
  resultados.push(`Conexión promesas: ${tiempoPromesas} `);

  // Ejecutar prueba para conexión con pooling
  const tiempoPool = await testConexionPool();
  console.log(`Tiempo conexión pool: ${tiempoPool} `);
  resultados.push(`Conexión pool: ${tiempoPool} `);

  // Guardar resultados en un archivo de texto
  fs.writeFileSync('resultados.txt', resultados.join('\n'));
  
}

// Ejecutar las pruebas
ejecutarPruebas();
