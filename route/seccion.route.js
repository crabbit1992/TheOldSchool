const express=require('express');
const router=express.Router();

const seccion=require('../controller/Seccion.controller');


router.get('/',seccion.getSeccion);
router.post('/',seccion.createSeccion);
router.put('/:id',seccion.createSeccion);
router.delete('/:id',seccion.deleteSeccion);

module.exports=router;  