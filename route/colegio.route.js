const express=require('express');
const router=express.Router();

const colegio=require('../controller/Colegio.controller');


router.get('/',colegio.getColegios);
router.get('/:colUrl',colegio.getColegio);
router.post('/',colegio.createColegio);
router.put('/:id',colegio.editColegio);

router.post('/Emblema',colegio.addEmblema);
router.get('/Emblema/:colCod',colegio.getEmblema);
router.put('/Emblema/:colCod',colegio.editEmblema);

router.post('/imgPfl',colegio.addImgPfl);
router.get('/imgPfl/:colCod',colegio.getImgPfl);
router.put('/imgPfl/:colCod',colegio.editImgPfl);

router.put('/deshabilitar/:id',colegio.DeshabilitarColegio);



module.exports=router;  