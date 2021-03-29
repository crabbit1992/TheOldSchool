const express=require('express');
const router=express.Router();

const agenda=require('../controller/Agenda.controller');


router.get('/:id',agenda.getAgenda);
router.get('/agendaCurso/:alvCod-:curCod',agenda.getAgendas);
router.post('/',agenda.postAgenda);
router.put('/:id',agenda.editAgenda);


module.exports=router;  