const express=require('express');
const router=express.Router();

const coordinador=require('../controller/Coordinador.controller');


router.get('/',coordinador.getCoordinadores);
router.get('/:id',coordinador.getCoordinador);
router.post('/',coordinador.createCoordinador);
router.put('/:id',coordinador.editCoordinador);
router.delete('/:id',coordinador.deleteCoordinador);

module.exports=router;  