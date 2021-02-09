const express=require('express');
const router=express.Router();

const matricula=require('../controller/Matricula.controller');


router.get('/:colCod-:prdCod',matricula.getMatriculasCol);
router.get('/MatriculasAlu/:aluCod-:colCod',matricula.getMatriculasColAlum);
router.get('/MisMatriculas/:perRepCod',matricula.getMatriculasAlum);
router.get('/AluPorAula/:colCod-:graCod-:nivCod-:secCod-:turCod',matricula.getAlumnosPorAula);
router.post('/',matricula.createMatricula);
router.post('/GetMatriculas',matricula.getMatriculas);
router.put('/:id',matricula.editMatricula);
router.delete('/:id',matricula.deleteMatricula);

module.exports=router;  