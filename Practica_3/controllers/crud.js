const conexion = require("../database/db");

const db=require("../database/db");

/* Obtnemos los datos del formulario haciendo referencia a /save */
exports.save=(req,res)=>{
    const nombre=req.body.nombre;
    const usuario=req.body.usuario;
    const password=req.body.password;
    const cargo=req.body.cargo;

    conexion.query('INSERT INTO empleados SET ?',
        {nombre:nombre,usuario:usuario,password:password,cargo:cargo},
        (error,results)=>{
            if(error){
                console.log(error);
            }else{
                res.redirect('/');
            }
        })
}
exports.update=(req, res)=>{
    const {id,nombre,usuario,password,cargo}= req.body;

    conexion.query('UPDATE empleados SET ? WHERE id= ?',
        [{nombre,usuario,password,cargo},id],
        (error, results)=>{
            if(error){
                console.error('Error al actualizar el empleado:',error);
                return res.status(500).send('Error al actualizar empleados');
            }
            res.redirect('/');
        }
    );

};


