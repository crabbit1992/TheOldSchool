const express=require('express');
const router=express.Router();
const evaluacionTema=require('../controller/EvaluacionTema.controller');

router.get('/:prdCod-:temCod',evaluacionTema.getEvaluacionTemas);
router.get('/evaAluNota/:prdCod-:temCod-:perRepCod',evaluacionTema.getEvaluacionTemaAlu);
router.post('/',evaluacionTema.createEvaluacionTema);
router.post('/getEvaTemAula/',evaluacionTema.getEvaTemAula);
router.delete('/:id-:idNota',evaluacionTema.deleteEvaluacionTema);

module.exports=router;