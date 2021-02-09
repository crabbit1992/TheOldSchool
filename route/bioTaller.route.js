const express=require('express');
const router=express.Router();

const bioTaller=require('../controller/BioTaller.controller');

router.get('/:colCod-:talTpo',bioTaller.getBioTaller);
router.get('/talleresAll/:colCod',bioTaller.getBioTalleres);
router.post('/',bioTaller.createBioTaller);
router.put('/:id',bioTaller.editBioTaller);
router.delete('/:id',bioTaller.deleteBioTaller);

module.exports=router;