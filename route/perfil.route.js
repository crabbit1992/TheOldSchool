const express=require('express');
const router=express.Router();

const perfil=require('../controller/Perfil.controller');

/*** Como le paso el segundo param ** */
router.get('/:perRepCod-:colCod',perfil.getPerfilColegio);
router.get('/:perRepCod',perfil.getPerfilUsuario);
router.get('/perCol/:colCod',perfil.getPerfilesColegio);
//router.get('/',perfil.getPerfiles);
router.post('/',perfil.createPerfil);
router.post('/DeshabilitarPerfil',perfil.DeshabilitarPerfil);
router.post('/HabilitarPerfil',perfil.HabilitarPerfil);
router.post('/getPlfSegunCargo',perfil.getPlfSegunCargo);
router.delete('/:id',perfil.DeletePerfil);


module.exports=router;  