const express=require('express');
const router=express.Router();

const auxiliar=require('../controller/Auxiliar.controller');


router.get('/',auxiliar.getAuxiliares);
router.get('/:id',auxiliar.getAuxiliar);
router.post('/',auxiliar.createAuxiliar);
router.put('/:id',auxiliar.editAuxiliar);
router.delete('/:id',auxiliar.deleteAuxiliar);

module.exports=router;  