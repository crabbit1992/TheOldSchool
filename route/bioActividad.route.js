const express=require('express');
const router=express.Router();

const bioActividad=require('../controller/BioActividad.controller');

router.get('/:colCod',bioActividad.getBioActividades);
router.get('/actTpo/:colCod-:actTpo',bioActividad.getBioActividad);
router.post('/',bioActividad.createBioActividad);
router.put('/:id',bioActividad.editBioActividad);
router.delete('/:id',bioActividad.deleteBioActividad);

module.exports=router;  