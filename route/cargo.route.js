const express=require('express');
const router=express.Router();

const cargo=require('../controller/Cargo.controller');


router.get('/',cargo.getCargos);
router.get('/:id',cargo.getCargo);
router.post('/',cargo.createCargo);
router.put('/:id',cargo.editCargo);
router.delete('/:id',cargo.deleteCargo);

module.exports=router;  