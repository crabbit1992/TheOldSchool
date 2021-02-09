const express=require('express');
const router=express.Router();

const colegio=require('../controller/BioQuienesSomos.controller');



router.get('/:colCod',colegio.getBioQuienesSomos);
router.post('/',colegio.createBioQuienesSomos);
router.put('/:id',colegio.editBioQuienesSomos);
router.delete('/:id',colegio.deleteBioQuienesSomos);

module.exports=router;  