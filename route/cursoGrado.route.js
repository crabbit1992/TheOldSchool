const express=require('express');
const router=express.Router();

const cursoGrado=require('../controller/CursoGrado.controller');

router.get('/:colCod-:nivCod-:graCod',cursoGrado.getCursosGrado);
router.get('/:colCod',cursoGrado.getCursosGradoCol);
router.post('/',cursoGrado.createCursoGrado);
router.post('/GetCursoGrado',cursoGrado.getCursoGrado);
router.put('/:id',cursoGrado.editCursoGrado);
router.delete('/:id',cursoGrado.deleteCursoGrado);

module.exports=router;  