const express=require('express');
const router=express.Router();

const tipoNota=require('../controller/TipoNota.controller');

router.post('/',tipoNota.createTipoNota);
router.get('/',tipoNota.getTipoNota);
router.delete('/:id',tipoNota.removeTipoNota);


module.exports=router;  