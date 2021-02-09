const express=require('express');
const router=express.Router();

const historialRegistro=require('../controller/HistorialRegistro.controller');


router.get('/',historialRegistro.getHistorialRegistros);
router.get('/:id',historialRegistro.getHistorialRegistro);
router.post('/',historialRegistro.createHistorialRegistro);

module.exports=router;  