const express=require('express');
const router=express.Router();

const bioNivel=require('../controller/BioNivel.controller');

router.get('/allNiv/:colCod',bioNivel.getBioNivelAll);
router.get('/:colCod-:nivTpo',bioNivel.getBioNivel);
router.get('/getBioNivelSgnNiv/:colCod-:nivTpo-:nivTtl',bioNivel.getBioNivelSgnNiv);
router.post('/',bioNivel.createBioNivel);
router.put('/:id',bioNivel.editBioNivel);
router.delete('/:id',bioNivel.deleteBioNivel);

module.exports=router;