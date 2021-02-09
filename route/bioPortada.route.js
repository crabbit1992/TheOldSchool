const express=require('express');
const router=express.Router();

const bioPortada=require('../controller/BioPortada.controller');

router.get('/:colCod',bioPortada.getBioPortadas);
router.get('/getByColUrl/:colUrl',bioPortada.getBioPortadasUrl)
router.post('/',bioPortada.createBioPortada);
router.put('/:id',bioPortada.editBioPortada);
router.delete('/:id',bioPortada.deleteBioPortada);

module.exports=router;  