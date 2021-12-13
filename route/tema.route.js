const express=require('express');
const router=express.Router();

const tema=require('../controller/Tema.controller');


router.get('/:libCod',tema.getTemas);
router.post('/',tema.createTema);
router.put('/:id',tema.editTema);
router.delete('/:id',tema.deleteTema);

/************************************************ */
router.put('/addEvaTema/:id',tema.addEvaTema);
router.put('/deleteEvaTema/:id',tema.deleteEvaTema);


module.exports=router;  