const express=require('express');
const router=express.Router();

const tipoPeriodo=require('../controller/TipoPeriodo.controller');


router.get('/',tipoPeriodo.getTipoPeriodos);
router.get('/:id',tipoPeriodo.getTipoPeriodo);
router.post('/',tipoPeriodo.createTipoPeriodo);
router.put('/:id',tipoPeriodo.editTipoPeriodo);

module.exports=router;  