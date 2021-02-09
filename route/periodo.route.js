const express=require('express');
const router=express.Router();

const periodo=require('../controller/Periodo.controller');

router.get('/:prdAnio-:colCod',periodo.getPeriodoActual);
router.get('/ultimoPrd/:colCod',periodo.getUltimoPrd);
router.get('/',periodo.getPeriodos);
router.get('/:colCod',periodo.getPeriodosColegio);
router.post('/',periodo.createPeriodo);
router.put('/:id',periodo.editPeriodo);
router.delete('/:id',periodo.deletePeriodo);


module.exports=router;  