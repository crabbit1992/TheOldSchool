const express=require('express');
const router=express.Router();

const promedioArea=require('../controller/PromedioArea.controller');

router.delete('/',promedioArea.deletePromedioArea);
//router.get('/',promedioArea.getPromedioArea);
router.get('/PromSgnNroClo/:perRepCod-:nroClo',promedioArea.getPromedioArea);
router.get('/LibretaPrd/:perRepCod-:prdCod',promedioArea.getLibretaPrd);



module.exports=router;  