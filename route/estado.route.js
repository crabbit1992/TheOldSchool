const express=require('express');
const router=express.Router();

const estado=require('../controller/Estado.Controller');


router.get('/',estado.getEstados);
router.get('/:id',estado.getEstado);
router.post('/',estado.createEstado);
router.put('/:id',estado.editEstado);
router.delete('/:id',estado.deleteEstados);

module.exports=router;  