const express=require('express');
const router=express.Router();

const intervaloHorario=require('../controller/IntervaloHorario.controller');


router.get('/:colCod',intervaloHorario.getIntervaloHorario);
router.post('/',intervaloHorario.createIntervaloHorario);
router.put('/:id',intervaloHorario.editIntervaloHorario);
router.delete('/:id',intervaloHorario.deleteIntervaloHorario);


module.exports=router;  