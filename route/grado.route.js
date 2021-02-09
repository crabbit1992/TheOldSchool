const express=require('express');
const router=express.Router();

const grado=require('../controller/Grado.controller');


router.get('/',grado.getGrados);
router.post('/',grado.createGrado);
router.put('/:id',grado.editGrado);
router.delete('/:id',grado.deleteGrado);

module.exports=router;  