const express=require('express');
const router=express.Router();

const nucleoArea=require('../controller/NucleoArea.controller');

router.get('/',nucleoArea.getNucleoArea);
router.post('/',nucleoArea.createNucleoArea);
router.put('/:id',nucleoArea.editNucleoArea);
router.delete('/:id',nucleoArea.deleteNucleoArea);

module.exports=router;  