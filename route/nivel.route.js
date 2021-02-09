const express=require('express');
const router=express.Router();

const nivel=require('../controller/Nivel.controller');


router.get('/',nivel.getNivel);
router.post('/',nivel.createNivel);
router.put('/:id',nivel.editNivel);
router.delete('/:id',nivel.deleteNivel);

module.exports=router;  