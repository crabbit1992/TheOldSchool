const express=require('express');
const router=express.Router();

const tipoNotaCurso=require('../controller/TipoNotaCurso.controller');

router.post('/',tipoNotaCurso.createTipoNotaCurso);
router.get('/:aulVirCod-:curCod-:colCod',tipoNotaCurso.getTipoNotaCurso);
router.delete('/:id',tipoNotaCurso.deleteTipoNotaCurso);

module.exports=router;  