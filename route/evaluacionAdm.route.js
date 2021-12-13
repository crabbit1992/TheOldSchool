const express=require('express');
const router=express.Router();
const EvaluacionAdm=require('../controller/EvaluacionAdm.controller');

router.get('/:libCod-:temCod',EvaluacionAdm.getEvaAdm);
router.put('/:id',EvaluacionAdm.editEvaAdm);

module.exports=router;