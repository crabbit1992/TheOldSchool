const express=require('express');
const router=express.Router();

//const employee= require('../controller/employee.controlles');
const persona=require('../controller/Persona.Controller');

//router.get('/',employee.getEmployees);
//router.get('/:id',employee.getEmployee);
//router.post('/',employee.createEmployees);
//router.put('/:id',employee.editEmployees);
//router.delete('/:id',employee.deleteEmployees);

router.get('/',persona.getPersonas);
router.get('/:id',persona.getPersonas);
router.post('/',persona.createPersona);
router.put('/:id',persona.editPersona);
router.put('/:id',persona.deletePersona);

module.exports=router;  