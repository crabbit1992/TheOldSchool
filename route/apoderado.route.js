const express=require('express');
const router=express.Router();

const apoderado=require('../controller/Apoderado.controller');


router.get('/:colCod',apoderado.getApoderadoCol);
router.post('/',apoderado.createApoderado);
router.put('/:id',apoderado.editApoderado);
router.delete('/:id',apoderado.deleteApoderado);

module.exports=router;  