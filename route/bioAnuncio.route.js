const express=require('express');
const router=express.Router();

const bioAnuncio=require('../controller/BioAnuncio.controller');

router.get('/:colCod',bioAnuncio.getBioAnuncios);
router.post('/',bioAnuncio.createBioAnuncio);
router.put('/:id',bioAnuncio.editBioAnuncio);
router.delete('/:id',bioAnuncio.deleteBioAnuncio);

module.exports=router;  