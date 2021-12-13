const express=require('express');
const router=express.Router();
const subTema=require('../controller/SubTema.controller');

router.get('/:temCod-:libCod',subTema.getSubTemas);
router.post('/',subTema.createSubTema);
router.put('/:id',subTema.editSubTema);
router.delete('/:id',subTema.deleteSubTema);

module.exports=router;  