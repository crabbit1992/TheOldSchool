const express=require('express');
const router=express.Router();

const nucleoImagen=require('../controller/NucleoImagen.controller');

router.get('/',nucleoImagen.getNucleoImagenes);
router.post('/',nucleoImagen.createNucleoImagen);
router.put('/:id',nucleoImagen.editarImagen);
router.delete('/:id',nucleoImagen.deleteImg);

module.exports=router;  