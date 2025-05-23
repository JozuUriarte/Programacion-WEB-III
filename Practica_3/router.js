const express = require('express');
const router = express.Router(); // "R" mayúscula
const conexion = require('./database/db');

// Ruta principal
router.get('/', (req, res) => {
    conexion.query('SELECT * FROM empleados', (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            return res.status(500).send('Error al obtener los empleados');
        }
        // Renderiza la vista "index.ejs" y pasa los resultados de la consulta
        res.render('index', { results: results });
    });
});


router.get('/edit/:id',(req,res)=>{
    const id=req.params.id;
    conexion.query('SELECT * FROM empleados WHERE id=?',[id],(error,results)=>{
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            return res.status(500).send('Error al obtener los empleados');
        }
        // Renderiza la vista "index.ejs" y pasa los resultados de la consulta
        res.render('edit', { empleados: results[0] });
    });
})
const crud=require('./controllers/crud');
router.post('/save',crud.save);
//CUANDO  ME DIRIJA A LA PESTAÑA UPDATE LLAMA AUTOMATICAMENTE A LA FUNCION UPDATE DEL CONTROLLERS
router.post('/update',crud.update);

//RUTA PARA ELIMINAR EL REGISTRO
router.post('/delete/:id', (req, res) => {
    const id = req.params.id;
  
    
    conexion.query('DELETE FROM empleados WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            return res.status(500).send('Error al eliminar el empleados');
        } else {
            res.redirect('/');  
        }
    });
});
module.exports = router;