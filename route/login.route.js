const express=require('express');
const router=express.Router();

const login=require('../controller/Login.Controller');


router.post('/',login.loginPersona);
router.post('/recoveryPass',login.enviarCorreo);

module.exports=router;  