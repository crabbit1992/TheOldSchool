const express=require('express');
const router=express.Router();

const tipoImagen=require('../controller/TipoImagen.controller');

router.post('/',tipoImagen.createTipoImagen);
router.put('/:id',tipoImagen.editTipoImagen);
router.get('/',tipoImagen.getTipoImagenes);
router.delete('/:id',tipoImagen.removeTipoImagen);

module.exports=router;  