const express=require('express');
const router=express.Router();

const tipoAccion=require('../controller/TipoAccion.controller');


router.get('/',tipoAccion.getTipoAcciones);
router.get('/:id',tipoAccion.getTipoAccion);
router.post('/',tipoAccion.createTipoAccion);
router.put('/:id',tipoAccion.editTipoAccion);

module.exports=router;  