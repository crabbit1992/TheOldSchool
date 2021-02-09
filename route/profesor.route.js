const express=require('express');
const router=express.Router();

const profesor=require('../controller/Profesor.controller');


router.get('/:colCod',profesor.getProfesoresCol);
router.get('/profesor/:id',profesor.getProfesor);
router.post('/',profesor.createProfesor);
router.put('/:id',profesor.editProfesor);
router.delete('/:id',profesor.deleteProfesor);

module.exports=router;  