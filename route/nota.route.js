const express=require('express');
const router=express.Router();

const nota=require('../controller/Nota.controller');



router.post('/',nota.createNota);
router.get('/:perRepCod-:curCod-:nroClo',nota.getDetNotasSegunTipo);
router.get('/hst/:perRepCod-:tpoNotCurCod-:nroClo',nota.getHstSgnTpoNta);

router.delete('/:id',nota.deleteNota);


module.exports=router;  