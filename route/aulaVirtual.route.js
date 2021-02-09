const express=require('express');
const router=express.Router();

const aulaVirtual=require('../controller/AulaVirtual.controller');
const isAuth =require('../services/auth.controller');


router.get('/:colCod',isAuth,aulaVirtual.getAlulaColegio);
router.post('/RegAulVir/',aulaVirtual.createAulaVirtual);

router.put('/:id',aulaVirtual.editAulaVirtual);
router.post('/HabilitarAula/',aulaVirtual.habilitarAula);
router.post('/DeshabilitarAula/',aulaVirtual.deshabilitarAula);

router.post('/',aulaVirtual.getAulasVirtuales);
router.delete('/:id',aulaVirtual.deleteAulaVirtual);
 
module.exports=router;   