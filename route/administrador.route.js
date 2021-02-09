const express=require('express');
const router=express.Router();

const administrador=require('../controller/Administrador.controller');


router.get('/',administrador.getAdministradores);
router.get('/:id',administrador.getAdministrador);
router.post('/',administrador.createAdministrador);
router.put('/:id',administrador.editAdministrador);
router.delete('/:id',administrador.deleteAdministrador);

module.exports=router;  