const express=require('express');
const router=express.Router();

const nucleoCurricula=require('../controller/NucleoCurricula.controller');

router.get('/',nucleoCurricula.getNucleoCurriculas);
router.get('/:prd',nucleoCurricula.getNucleoCurriculaPrd);
router.post('/getByAreCod',nucleoCurricula.getNucleoCurriculaPrdAreCod);
router.post('/',nucleoCurricula.createNucleoCurricula);
router.put('/:id',nucleoCurricula.editNucleoCurricula);
router.delete('/:id',nucleoCurricula.deleteNucleoCurricula);

module.exports=router;  