const express=require('express');
const router=express.Router();
const persona=require('../controller/Persona.controller');

router.get('/',persona.getPersonas);// este es
router.get('/:id',persona.getPersona); 
router.post('/',persona.createPersona);
router.put('/:id',persona.editPersona);
router.delete('/:id',persona.removePersona);


module.exports=router;  