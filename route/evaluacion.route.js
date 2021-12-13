const express=require('express');
const router=express.Router();
const evaluacion=require('../controller/Evaluacion.controller');

router.get('/:libCod-:temCod',evaluacion.getEvaluaciones);
router.get('/getEvaluacionesHbl/:libCod-:temCod',evaluacion.getEvaluacionesHbl);
router.post('/',evaluacion.createEvaluacion);
router.put('/:id',evaluacion.editEvaluacion);
router.delete('/:id',evaluacion.deleteEvaluacion);

module.exports=router;