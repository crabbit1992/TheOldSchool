const express=require('express');
const router=express.Router();

const promedio=require('../controller/Promedio.controller');

router.get('/PromCursosPorArea/:perRepCod-:nroClo-:areCod',promedio.getPromedioCursosPorArea);
router.get('/:alvCod-:nroClo-:curCod',promedio.getPromedioCiclo);
router.delete('/',promedio.deletePromedio);


module.exports=router;  