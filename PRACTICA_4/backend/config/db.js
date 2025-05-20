import mysql from 'mysql2';
const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'bd_proyectopw3'
}).promise();
export default pool;