const express=require('express');
const router=express.Router();

const PersonaRepositorio=require('../controller/PersonaRepositorio.controller');


router.get('/',PersonaRepositorio.getPersonas);
router.get('/ById/:id',PersonaRepositorio.getPersonaById);
router.get('/:perRepDni',PersonaRepositorio.getPersonaDni);
router.post('/',PersonaRepositorio.createPersona);
router.put('/:id',PersonaRepositorio.editPersona);
router.delete('/:perRepDni',PersonaRepositorio.deletePersonaRepositorio)

module.exports=router;  