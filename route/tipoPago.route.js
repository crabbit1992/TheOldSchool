const express=require('express');
const router=express.Router();

const tipoPago=require('../controller/TipoPago.controller');


router.get('/:colCod',tipoPago.getTipoPago);
router.post('/',tipoPago.createTipoPago);
router.put('/:id',tipoPago.editTipoPago);
router.delete('/:id',tipoPago.deleteTipoPago);

module.exports=router;  