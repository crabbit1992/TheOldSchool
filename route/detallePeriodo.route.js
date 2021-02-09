const express=require('express');
const router=express.Router();

const detallePeriodo=require('../controller/DetallePeriodo.controller');


router.get('/:idPrd',detallePeriodo.getDetallePeriodo);
router.get('/GetCiclo/:idPrd',detallePeriodo.getCicloActual);
router.get('/getDetPrdSegunFch/:idPrd',detallePeriodo.getDetPrdSegunFch);
router.post('/',detallePeriodo.createDetallePeriodo);
router.put('/:id',detallePeriodo.editDetallePeriodo);
router.delete('/:id',detallePeriodo.deleteDetallePeriodo);

module.exports=router;  