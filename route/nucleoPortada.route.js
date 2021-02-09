const express=require('express');
const router=express.Router();

const nucleoPortada=require('../controller/NucleoPortada.controller');

router.get('/',nucleoPortada.getNucleoPortadas);
router.post('/',nucleoPortada.createNucleoPortada);
router.put('/:id',nucleoPortada.editNucleoPortada);
router.delete('/:id',nucleoPortada.deleteNucleoPortada);

module.exports=router;  