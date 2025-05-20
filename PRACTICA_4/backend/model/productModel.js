import pool from "../config/db.js";

export const obtenerTodosProductos=async()=>{
    const[array]=await pool.query('SELECT * FROM productos');
    return array;
}

export const crearNuevoProducto=async(nombreProducto,marca,precio,talla)=>{
    const [resultado]=await pool.query('INSERT INTO productos(nombreProducto,marca,precio,talla) VALUES(?,?,?,?)',[nombreProducto,marca,precio,talla]);
    return resultado.insertId;
}

export const ActualizarProducto=async(id,nombreProducto,marca,precio,talla)=>{
    await pool.query('UPDATE productos SET nombreProducto=?,marca=?,precio=?,talla=? WHERE id=?',[nombreProducto,marca,precio,talla,id]);
}
export const buscarProducto=async(id)=>{
    const [array]=await pool.query('SELECT * FROM productos WHERE id=?',[id]);
    return array[0];
}
export const EliminarProducto=async(id)=>{
    await pool.query('DELETE FROM productos WHERE id=?',[id]);
}

