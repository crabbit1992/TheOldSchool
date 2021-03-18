const express=require('express');
const router=express.Router();

const pago=require('../controller/Pago.controller');


router.get('/:colCod',pago.getPagos);
router.get('/filterPago/:id-:colCod',pago.filterPago);
router.post('/',pago.createPago);
router.delete('/',pago.deletePago);

module.exports=router;  