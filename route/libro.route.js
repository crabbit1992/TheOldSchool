const express=require('express');
const router=express.Router();

const libro=require('../controller/Libro.controller');


router.get('/:colCod',libro.getLibros);
router.post('/librosFiltro/',libro.getLibrosFiltro);
router.post('/getLibrosCur/',libro.getLibrosCur);
router.post('/',libro.createLibro);
router.put('/:id',libro.editLibro);
router.delete('/:id',libro.deleteLibro);

module.exports=router;  