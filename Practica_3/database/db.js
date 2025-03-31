const mysql = require('mysql');
// corregido el nombre de la constante

const conexion = mysql.createConnection({
    //corregido el nombre metodo
    host:'localhost',
    user:'root',
    password:'',
    database:'db_usuarios'
});

conexion.connect((error)=>{
    if(error){
        console.error('El error de conexion es: '+error);
        return;
    }
    console.log('Conectado a la bd mysql');
});
module.exports=conexion;