const express=require('express');
const router=express.Router();

const secretaria=require('../controller/Secretaria.controller');


router.get('/:colCod',secretaria.getSecretaria);
router.post('/',secretaria.createSecretaria);
router.put('/:id',secretaria.editSecretaria);
router.delete('/:id',secretaria.deleteSecretaria);

module.exports=router;  