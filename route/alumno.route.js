const express=require('express');
const router=express.Router();

const alumno=require('../controller/Alumno.controller');


router.get('/',alumno.getAlumnos);
router.get('/getAlumnosApoderado/:colCod-:perRepCod',alumno.getAlumnosApoderado);
router.get('/:colCod',alumno.getAlumnosColegio);
router.post('/',alumno.createAlumno);
router.post('/asignarAprdo',alumno.AsignarApoderado);
router.get('/dltApo/:aluCod',alumno.DeleteApoderado);
router.put('/:id',alumno.editAlumno);
router.delete('/:id',alumno.deleteAlumno);

module.exports=router;  