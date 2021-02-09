const express=require('express');
const router=express.Router();

const subDirector=require('../controller/SubDirector.controller');


router.get('/',subDirector.getSubDirectores);
router.get('/:id',subDirector.getSubDirector);
router.post('/',subDirector.createSubDirector);
router.put('/:id',subDirector.editSubDirector);
router.delete('/:id',subDirector.deleteSubDirector);

module.exports=router;  