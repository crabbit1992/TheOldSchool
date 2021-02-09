const express=require('express');
const router=express.Router();

const horario=require('../controller/Horario.controller');


router.get('/:colCod-:alvCod',horario.getHorario);
router.post('/',horario.createHorario);
router.post('/putHorario/',horario.editHorario);
router.post('/deleteHorario/',horario.deleteHorario);


module.exports=router;  