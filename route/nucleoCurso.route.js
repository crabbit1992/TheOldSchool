const express=require('express');
const router=express.Router();

const nucleoCurso=require('../controller/NucleoCurso.controller');

router.get('/',nucleoCurso.getNucleoCursos);
router.get('/:areCod',nucleoCurso.getNucleoCursoArea);
router.post('/',nucleoCurso.createNucleoCurso);
router.put('/:id',nucleoCurso.editNucleoCurso);
router.delete('/:id',nucleoCurso.deleteNucleoCurso);

module.exports=router;  