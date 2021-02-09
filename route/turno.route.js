const express=require('express');
const router=express.Router();

const turno=require('../controller/Turno.controller');


router.get('/',turno.getTurno);
router.post('/',turno.createTurno);
router.put('/:id',turno.editTurno);
router.delete('/:id',turno.deleteTurno);

module.exports=router;  