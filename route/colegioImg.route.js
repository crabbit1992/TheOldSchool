const express=require('express');
const router=express.Router();

const colegioImg=require('../controller/ColegioImg.controller');


router.post('/',colegioImg.createColegioImg);


router.get('/getImages/:colCod',colegioImg.getImagenes);


router.put('/:id',colegioImg.editarImagen);
router.delete('/:id-:colCod',colegioImg.deleteImg);



router.get('/:colCod',colegioImg.getColegioImgs);




module.exports=router;  